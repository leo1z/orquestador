import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { CANVAS_QUESTIONS, isCaseId, isModuleId, type Personalization } from "../shared/content";

type Env = { DB: D1Database };
type Vars = { userId: string };

const COOKIE = "oia_sid";
const MAX_DELIVERABLE_CHARS = 20_000;

const app = new Hono<{ Bindings: Env; Variables: Vars }>().basePath("/api");

// Sesión anónima: cada navegador recibe un id; el usuario se crea en D1 la primera vez.
app.use("*", async (c, next) => {
  let id = getCookie(c, COOKIE);
  if (!id || !/^[a-f0-9-]{36}$/.test(id)) {
    id = crypto.randomUUID();
    setCookie(c, COOKIE, id, {
      httpOnly: true,
      secure: new URL(c.req.url).protocol === "https:",
      sameSite: "Lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  await c.env.DB.prepare(
    "INSERT INTO users (id) VALUES (?1) ON CONFLICT(id) DO UPDATE SET last_seen_at = datetime('now')",
  )
    .bind(id)
    .run();
  c.set("userId", id);
  await next();
});

app.get("/me", async (c) => {
  const id = c.get("userId");
  const [user, progress, deliverables] = await Promise.all([
    c.env.DB.prepare("SELECT display_name, case_id, personalization, cohort_code FROM users WHERE id = ?1")
      .bind(id)
      .first<{ display_name: string | null; case_id: string | null; personalization: string; cohort_code: string | null }>(),
    c.env.DB.prepare("SELECT module_id, step, completed_at FROM progress WHERE user_id = ?1").bind(id).all(),
    c.env.DB.prepare("SELECT module_id, version, updated_at FROM deliverables WHERE user_id = ?1").bind(id).all(),
  ]);
  return c.json({
    displayName: user?.display_name ?? null,
    caseId: user?.case_id ?? null,
    cohortCode: user?.cohort_code ?? null,
    personalization: JSON.parse(user?.personalization ?? "{}") as Personalization,
    progress: progress.results,
    deliverables: deliverables.results,
  });
});

// Elegir caso y guardar el lienzo de personalización.
app.put("/me/case", async (c) => {
  const body = await c.req.json<{ caseId?: string; personalization?: Record<string, unknown>; displayName?: string }>();
  if (!body.caseId || !isCaseId(body.caseId)) return c.json({ error: "Caso no válido" }, 400);
  const clean: Personalization = {};
  for (const q of CANVAS_QUESTIONS) {
    const v = body.personalization?.[q.key];
    if (typeof v === "string" && v.trim()) clean[q.key] = v.trim().slice(0, 500);
  }
  const name = typeof body.displayName === "string" ? body.displayName.trim().slice(0, 60) || null : null;
  await c.env.DB.prepare("UPDATE users SET case_id = ?1, personalization = ?2, display_name = COALESCE(?3, display_name) WHERE id = ?4")
    .bind(body.caseId, JSON.stringify(clean), name, c.get("userId"))
    .run();
  return c.json({ ok: true });
});

// Avance dentro de un módulo (paso 0..4). Llegar al paso 4 y aprobar el check lo completa.
app.put("/progress/:moduleId", async (c) => {
  const moduleId = c.req.param("moduleId");
  if (!isModuleId(moduleId)) return c.json({ error: "Módulo no válido" }, 400);
  const { step, completed } = await c.req.json<{ step?: number; completed?: boolean }>();
  if (typeof step !== "number" || step < 0 || step > 4) return c.json({ error: "Paso no válido" }, 400);
  await c.env.DB.prepare(
    `INSERT INTO progress (user_id, module_id, step, completed_at) VALUES (?1, ?2, ?3, CASE WHEN ?4 THEN datetime('now') END)
     ON CONFLICT(user_id, module_id) DO UPDATE SET step = MAX(step, ?3),
       completed_at = COALESCE(completed_at, CASE WHEN ?4 THEN datetime('now') END), updated_at = datetime('now')`,
  )
    .bind(c.get("userId"), moduleId, step, completed ? 1 : 0)
    .run();
  return c.json({ ok: true });
});

// Expediente: un entregable en Markdown por módulo.
app.get("/deliverables/:moduleId", async (c) => {
  const row = await c.env.DB.prepare("SELECT content, version, updated_at FROM deliverables WHERE user_id = ?1 AND module_id = ?2")
    .bind(c.get("userId"), c.req.param("moduleId"))
    .first();
  return row ? c.json(row) : c.json({ error: "Sin entregable todavía" }, 404);
});

app.put("/deliverables/:moduleId", async (c) => {
  const moduleId = c.req.param("moduleId");
  if (!isModuleId(moduleId)) return c.json({ error: "Módulo no válido" }, 400);
  const { content } = await c.req.json<{ content?: string }>();
  if (typeof content !== "string" || !content.trim()) return c.json({ error: "El entregable está vacío" }, 400);
  if (content.length > MAX_DELIVERABLE_CHARS) return c.json({ error: "El entregable es demasiado largo" }, 413);
  await c.env.DB.prepare(
    `INSERT INTO deliverables (user_id, module_id, content) VALUES (?1, ?2, ?3)
     ON CONFLICT(user_id, module_id) DO UPDATE SET content = ?3, version = version + 1, updated_at = datetime('now')`,
  )
    .bind(c.get("userId"), moduleId, content)
    .run();
  return c.json({ ok: true });
});

app.notFound((c) => c.json({ error: "No existe" }, 404));

export default app;
