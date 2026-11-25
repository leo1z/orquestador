import { useState } from "react";
import { MODULES, MODULE_STEPS, PHASES } from "../../shared/content";
import { api, type Me } from "../lib/api";
import { Guide, Link, btnPrimary, btnSecondary } from "../components/ui";

// Etapa 0: estructura del módulo con sus 5 pasos. El contenido y el lab de cada módulo
// se construyen en las etapas siguientes siguiendo docs/labs.md.
export function Modulo({ me, id, onChange }: { me: Me; id: string; onChange: () => void }) {
  const mod = MODULES.find((m) => m.id === id);
  const saved = me.progress.find((p) => p.module_id === id)?.step ?? 0;
  const [step, setStep] = useState(saved);
  const [error, setError] = useState<string | null>(null);

  if (!mod) {
    return (
      <div className="mx-auto max-w-3xl">
        <Guide character="estrellado" alt="Astronauta de Antimateria estrellándose">
          Ese módulo no existe. <Link href="/" className="text-violet-text">Vuelve al mapa</Link>.
        </Guide>
      </div>
    );
  }

  async function goTo(next: number, completed = false) {
    setError(null);
    try {
      await api.saveProgress(id, next, completed);
      setStep(next);
      onChange();
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar el avance.");
    }
  }

  const phase = PHASES.find((p) => p.id === mod.phase);

  return (
    <div className="mx-auto grid max-w-6xl gap-6">
      <div>
        <p className="eyebrow text-violet-text">{phase?.id} · {phase?.name} · módulo {mod.id} / {MODULES.length - 1}</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">{mod.title}</h1>
      </div>

      <ol aria-label="Pasos del módulo" className="flex flex-wrap gap-2 text-sm">
        {MODULE_STEPS.map((label, i) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => setStep(i)}
              aria-current={i === step ? "step" : undefined}
              className={`min-h-11 rounded-full px-4 ${i === step ? "bg-violet font-bold text-on-violet" : "border border-line text-ink-muted"}`}
            >
              {i < saved ? "✓ " : ""}{label}
            </button>
          </li>
        ))}
      </ol>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <section className="flex min-h-80 flex-col gap-4 rounded-[22px] bg-panel p-6 text-panel-ink">
          <p className="eyebrow text-panel-muted">{MODULE_STEPS[step]}</p>
          {step === 2 ? (
            <p>Lab: {mod.lab}.</p>
          ) : step === 3 ? (
            <p>Entregable para tu expediente: {mod.deliverable}.</p>
          ) : (
            <p>El contenido de este paso se construye en la etapa del módulo {mod.id}.</p>
          )}
          {error && <p role="alert" className="font-bold text-coral-ink">{error}</p>}
          <div className="mt-auto flex flex-wrap gap-3">
            {step < MODULE_STEPS.length - 1 ? (
              <button type="button" className={btnPrimary} onClick={() => goTo(step + 1)}>
                Siguiente: {MODULE_STEPS[step + 1]}
              </button>
            ) : (
              <button type="button" className={btnPrimary} onClick={() => goTo(4, true)}>
                Completar módulo
              </button>
            )}
            <Link href="/" className={`${btnSecondary} !text-panel-ink !border-[#b9b2a3]`}>Volver al mapa</Link>
          </div>
        </section>
        <Guide character="lupa" alt="Astronauta de Antimateria con una lupa">
          Cada paso guarda tu avance. Puedes salir y volver cuando quieras.
        </Guide>
      </div>
    </div>
  );
}
