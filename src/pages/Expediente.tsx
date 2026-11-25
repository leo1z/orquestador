import { CANVAS_QUESTIONS, CASES, MODULES } from "../../shared/content";
import type { Me } from "../lib/api";
import { Guide, Link, btnPrimary } from "../components/ui";

export function Expediente({ me }: { me: Me }) {
  const caso = CASES.find((c) => c.id === me.caseId);
  const saved = new Map(me.deliverables.map((d) => [d.module_id, d]));
  const inProgress = new Set(me.progress.filter((p) => !p.completed_at).map((p) => p.module_id));
  const missing = CANVAS_QUESTIONS.filter((q) => !me.personalization[q.key]);

  if (!caso) {
    return (
      <div className="mx-auto grid max-w-3xl gap-4">
        <Guide character="frontal" alt="Astronauta de Antimateria esperando">
          Tu expediente se crea cuando eliges un caso.
        </Guide>
        <div><Link href="/caso" className={btnPrimary}>Elegir mi caso</Link></div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6">
      <div>
        <p className="eyebrow text-violet-text">Expediente · caso {caso.id}</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">{caso.name}</h1>
      </div>

      <section className="rounded-[22px] border border-line bg-space-900 p-5">
        <div className="flex justify-between gap-4">
          <h2 className="eyebrow text-ink-muted">Lienzo de personalización</h2>
          <span className={`eyebrow ${missing.length ? "text-coral" : "text-success"}`}>
            {CANVAS_QUESTIONS.length - missing.length} de {CANVAS_QUESTIONS.length}
          </span>
        </div>
        <dl className="mt-3 grid gap-3 md:grid-cols-2">
          {CANVAS_QUESTIONS.map((q) => (
            <div key={q.key}>
              <dt className="text-sm text-ink-muted">{q.label}</dt>
              <dd className={`m-0 ${me.personalization[q.key] ? "" : "text-coral"}`}>{me.personalization[q.key] ?? "Falta responder"}</dd>
            </div>
          ))}
        </dl>
        <Link href="/caso" className="mt-4 inline-block text-sm text-violet-text">Editar lienzo</Link>
      </section>

      <section className="rounded-[22px] bg-panel px-5 py-2 text-panel-ink">
        <h2 className="sr-only">Entregables</h2>
        <ul className="m-0 list-none p-0">
          {MODULES.map((m) => {
            const d = saved.get(m.id);
            const state = d ? "Listo" : inProgress.has(m.id) ? "En curso" : "Pendiente";
            return (
              <li key={m.id} className="grid grid-cols-[48px_1fr_auto] items-center gap-3 border-b border-[#d6cfc0] py-3 last:border-0">
                <span className="font-mono text-xs text-panel-muted">{m.id}</span>
                <Link href={`/modulo/${m.id}`} className="text-panel-ink no-underline hover:underline">{m.deliverable}</Link>
                <span className={`text-sm font-bold ${d ? "text-violet-deep" : state === "En curso" ? "text-coral-ink" : "text-panel-muted"}`}>
                  {d ? `✓ ${state} · v${d.version}` : state}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
