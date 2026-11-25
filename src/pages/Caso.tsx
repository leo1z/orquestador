import { useState } from "react";
import { CANVAS_QUESTIONS, CASES, type CaseId, type Personalization } from "../../shared/content";
import { api, type Me } from "../lib/api";
import { navigate } from "../lib/router";
import { Guide, btnPrimary } from "../components/ui";

export function Caso({ me, onSaved }: { me: Me; onSaved: () => void }) {
  const [caseId, setCaseId] = useState<CaseId | null>(me.caseId ?? "A");
  const [answers, setAnswers] = useState<Personalization>(me.personalization);
  const [name, setName] = useState(me.displayName ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!caseId) return setError("Elige un caso primero.");
    setSaving(true);
    setError(null);
    try {
      await api.saveCase(caseId, answers, name);
      onSaved();
      navigate("/");
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8">
      <div>
        <p className="eyebrow text-violet-text">Módulo 00 · elegir caso</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">Elige tu caso y hazlo tuyo</h1>
      </div>

      <fieldset className="grid gap-3 md:grid-cols-2">
        <legend className="sr-only">Casos</legend>
        {CASES.map((c) => {
          const selected = caseId === c.id;
          return (
            <label
              key={c.id}
              className={`grid gap-1 rounded-[22px] border p-5 ${c.open ? "cursor-pointer" : "cursor-not-allowed opacity-60"} ${selected ? "border-violet bg-violet-soft" : "border-line bg-space-900"}`}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="font-display text-lg font-bold">{c.id} · {c.name}</span>
                <input
                  type="radio"
                  name="caso"
                  value={c.id}
                  checked={selected}
                  disabled={!c.open}
                  onChange={() => setCaseId(c.id)}
                  className="size-5 accent-violet"
                />
              </span>
              <span className="text-sm">{c.template}</span>
              <span className="text-sm text-ink-muted">Ejemplo: {c.example}</span>
              {!c.open && <span className="eyebrow mt-1 text-coral">Se abre después del piloto</span>}
            </label>
          );
        })}
      </fieldset>

      <section className="grid gap-4 rounded-[22px] bg-panel p-6 text-panel-ink">
        <h2 className="font-display text-xl font-bold">Lienzo de personalización</h2>
        <label className="grid gap-1">
          <span className="text-sm font-bold">¿Cómo te llamas?</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="min-h-11 rounded-[8px] border border-[#cfc9bc] bg-panel-sunk px-3"
            autoComplete="given-name"
          />
        </label>
        {CANVAS_QUESTIONS.map((q) => (
          <label key={q.key} className="grid gap-1">
            <span className="text-sm font-bold">{q.label}</span>
            <span className="text-xs text-panel-muted">{q.hint}</span>
            <textarea
              value={answers[q.key] ?? ""}
              onChange={(e) => setAnswers({ ...answers, [q.key]: e.target.value })}
              rows={2}
              className="rounded-[8px] border border-[#cfc9bc] bg-panel-sunk px-3 py-2"
            />
          </label>
        ))}
        {error && <p role="alert" className="text-sm font-bold text-coral-ink">{error}</p>}
        <div>
          <button type="button" onClick={save} disabled={saving} className={btnPrimary}>
            {saving ? "Guardando…" : "Guardar y ver mi mapa"}
          </button>
        </div>
      </section>

      <Guide character="pensativo" alt="Astronauta de Antimateria pensando">
        Puedes dejar preguntas en blanco y volver después. Antes del demo day las 5 deben estar respondidas.
      </Guide>
    </div>
  );
}
