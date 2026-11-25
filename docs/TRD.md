# TRD · Orquestador IA 101

Estado: borrador v0.1 · Acompaña a `docs/PRD.md`

## Arquitectura

Un solo Cloudflare Worker sirve la SPA (assets estáticos) y la API (`/api/*`, Hono). `wrangler.jsonc` usa `run_worker_first: ["/api/*"]` y `not_found_handling: "single-page-application"`.

```
Navegador (React)
  ├─ /api/* ──► Worker (Hono) ──► D1 (usuarios, progreso, expediente)
  │                         └──► R2 (Etapa 4: imágenes y exportaciones)
  │                         └──► Resend (Etapa 1: código por correo)
  └─ Gemini API directo, con la clave de la persona (nunca pasa por el Worker)
GitHub (push a main) ──► Cloudflare Workers Builds (deploy automático)
```

## Estructura del repo

```
shared/content.ts     Catálogo: fases, módulos, casos, lienzo (lo usan app y API)
worker/index.ts       API Hono
migrations/*.sql      Esquema D1
src/                  App React (pages/, components/, lib/)
public/characters/    Personajes de Antimateria (webp)
docs/                 Plan, PRD, TRD, diseño, labs
```

## Datos (D1)

| Tabla | Campos clave | Notas |
| --- | --- | --- |
| `users` | `id` (uuid de la cookie), `display_name`, `email` (único, Etapa 1), `cohort_code`, `case_id`, `personalization` (JSON) | Un usuario por navegador hasta que vincula correo |
| `progress` | `user_id`, `module_id`, `step` 0–4, `completed_at` | `step` solo sube (`MAX`) |
| `deliverables` | `user_id`, `module_id`, `content` (Markdown), `version` | Cada guardado sube la versión |

Etapa 1 agrega `cohorts`, `login_codes` (código de 6 dígitos con vencimiento) y `comments` (instructor → entregable).

## API

| Método | Ruta | Cuerpo | Respuesta |
| --- | --- | --- | --- |
| GET | `/api/me` | — | Perfil, caso, lienzo, progreso y entregables |
| PUT | `/api/me/case` | `{caseId, personalization, displayName?}` | `{ok}` |
| PUT | `/api/progress/:moduleId` | `{step, completed?}` | `{ok}` |
| GET | `/api/deliverables/:moduleId` | — | `{content, version, updated_at}` o 404 |
| PUT | `/api/deliverables/:moduleId` | `{content}` (máx. 20,000 caracteres) | `{ok}` |

Errores: JSON `{error}` con mensaje en español que dice qué pasó y cómo arreglarlo.

## Sesión y autenticación

- **Etapa 0:** cookie `oia_sid` (uuid, `HttpOnly`, `SameSite=Lax`, `Secure` en https, 1 año). El usuario se crea en D1 en la primera petición.
- **Etapa 1:** vincular correo con código de 6 dígitos enviado por Resend; el código vence en 10 minutos y se guarda con hash. Evaluar Better Auth (plugins anonymous + email OTP sobre D1) frente a la implementación propia antes de construir.
- **Instructor:** rol en `users` o lista de correos en una variable de entorno; las rutas `/api/instructor/*` lo exigen.

## IA en la academia

- La clave de Gemini se guarda en `localStorage` de la persona y se usa desde el navegador. El Worker nunca la recibe.
- Sin clave: botón para copiar la consulta y pegarla en Claude, ChatGPT o Gemini.
- Aviso visible: en el nivel gratis de Gemini, Google puede usar las solicitudes para mejorar sus productos; no pegar datos confidenciales.
- Workers AI solo para embeddings del lab de RAG (módulo 18), por su cuota diaria limitada.

## Deploy

1. `npx wrangler d1 create orquestador` y copiar el `database_id` en `wrangler.jsonc`.
2. `npm run db:migrate:remote`.
3. Conectar el repo en Cloudflare (Workers & Pages → importar repositorio) con build `npm run build` y deploy `npx wrangler deploy`.
4. Cada push a `main` despliega.

## Límites del plan gratis (verificar antes de cada cohorte)

- Workers: 100,000 solicitudes al día.
- D1: 5 GB, 5 millones de filas leídas y 100,000 escritas al día; desde el 1 sep 2026 las consultas fallan al pasar el límite hasta medianoche UTC.
- Workers AI: 10,000 Neurons al día.

## Seguridad

- Validar todo lo que entra en la API (ids de módulo y caso contra `shared/content.ts`, largos máximos).
- Nada de secretos en el repo: `.dev.vars` y secretos de Cloudflare; `.gitignore` los excluye.
- Consultas D1 siempre con `bind`, nunca concatenando texto.

## Pendiente de decidir

- Better Auth o implementación propia para el correo con código (Etapa 1).
- Router: el mínimo actual (`src/lib/router.ts`) alcanza para 4 rutas; si crecen, pasar a React Router.
