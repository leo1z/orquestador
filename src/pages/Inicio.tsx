import { CASES, MODULES, PHASES } from "../../shared/content";
import type { Me } from "../lib/api";
import { Guide, Link, btnPrimary, btnSecondary } from "../components/ui";

export function Inicio({ me }: { me: Me }) {
  const done = new Set(me.progress.filter((p) => p.completed_at).map((p) => p.module_id));
  const next = MODULES.find((m) => !done.has(m.id)) ?? MODULES[MODULES.length - 1];
  const currentPhase = next.phase;
  const caso = CASES.find((c) => c.id === me.caseId);
  const name = me.displayName ? `, ${me.displayName}` : "";

  return (
    <div className="mx-auto grid max-w-6xl gap-10">
      <section className="grid gap-8 md:grid-cols-[1fr_340px]">
        <div>
          <p className="eyebrow text-violet-text">Hola{name} · {PHASES.find((p) => p.id === currentPhase)?.name}</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-[1.04] tracking-tight md:text-5xl">
            {caso ? `Tu misión: ${caso.name.toLowerCase()}` : "Elige el caso que vas a construir"}
          </h1>
          <p className="mt-4 max-w-xl text-ink-muted">
            {caso
              ? `Llevas ${me.deliverables.length} de ${MODULES.length} entregables. Sigue con el módulo ${next.id}: ${next.title}.`
              : "Cada caso es una plantilla que personalizas con algo real de tu vida. Lo llevarás por los 22 módulos hasta desplegarlo y lanzarlo."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {caso ? (
              <>
                <Link href={`/modulo/${next.id}`} className={btnPrimary}>Continuar · {next.id} {next.title}</Link>
                <Link href="/expediente" className={btnSecondary}>Ver mi expediente</Link>
              </>
            ) : (
              <Link href="/caso" className={btnPrimary}>Elegir mi caso</Link>
            )}
          </div>
        </div>
        <Guide character="senala-arriba" alt="Astronauta de Antimateria señalando la fase actual">
          {caso ? "Tu fase actual está marcada en la órbita." : "Empieza por elegir tu caso: todo lo demás se arma sobre él."}
        </Guide>
      </section>

      <section aria-labelledby="orbita-titulo">
        <h2 id="orbita-titulo" className="eyebrow text-ink-muted">La órbita · {MODULES.length} módulos en {PHASES.length} fases</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
          {PHASES.map((phase) => {
            const mods = MODULES.filter((m) => m.phase === phase.id);
            const complete = mods.every((m) => done.has(m.id));
            const current = phase.id === currentPhase;
            return (
              <li
                key={phase.id}
                className={`rounded-[22px] border p-4 ${current ? "border-violet bg-violet-soft" : "border-line bg-space-900"}`}
              >
                <p className="eyebrow text-ink-muted">{phase.id} {complete ? "· ✓" : current ? "· aquí" : ""}</p>
                <p className="mt-1 font-display font-bold">{phase.name}</p>
                <p className="mt-1 text-sm text-ink-muted">
                  Módulos {mods[0].id}–{mods[mods.length - 1].id}
                </p>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
