import { useState } from "react";
import { CANVAS_QUESTIONS, CASES, type CaseId, type Personalization } from "../../shared/content";
import { api, type Me } from "../lib/api";
import { navigate } from "../lib/router";
import { Guide, btnPrimary, btnSecondary } from "../components/ui";

export function Caso({ me, onSaved }: { me: Me; onSaved: () => void }) {
  const [caseId, setCaseId] = useState<CaseId | null>(me.caseId ?? "A");
  const [answers, setAnswers] = useState<Personalization>(me.personalization);
  const [name, setName] = useState(me.displayName ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const guide = CASES.find((c) => c.id === caseId)?.canvas;
  const answered = CANVAS_QUESTIONS.filter((q) => answers[q.key]?.trim()).length;

  // Llena solo las preguntas vacías con el ejemplo de referencia; lo que ya escribió se respeta.
  function fillWithDemo() {
    if (!guide) return;
    const next = { ...answers };
    for (const q of CANVAS_QUESTIONS) if (!next[q.key]?.trim()) next[q.key] = guide[q.key].demo;
    setAnswers(next);
  }

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
        {guide && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] bg-panel-sunk p-4">
            <p className="m-0 max-w-xl text-sm">
              Elige una sugerencia en cada pregunta y ajústala a tu evento, o empieza con el ejemplo completo y cámbialo.
            </p>
            <button type="button" onClick={fillWithDemo} className={`${btnSecondary} !border-[#b9b2a3] !text-panel-ink`}>
              Usar el ejemplo de referencia
            </button>
          </div>
        )}
        <p className="eyebrow m-0 text-panel-muted" aria-live="polite">
          {answered} de {CANVAS_QUESTIONS.length} respondidas
        </p>
        {CANVAS_QUESTIONS.map((q, i) => {
          const value = answers[q.key] ?? "";
          const g = guide?.[q.key];
          const suggestions = g ? [{ text: g.demo, demo: true }, ...g.options.map((o) => ({ text: o, demo: false }))] : [];
          return (
            <div key={q.key} className="grid gap-2 border-t border-[#d6cfc0] pt-4">
              <label htmlFor={`q-${q.key}`} className="grid gap-1">
                <span className="text-sm font-bold">
                  <span className="font-mono text-xs text-panel-muted">{i + 1} · </span>
                  {q.label}
                </span>
                <span className="text-sm text-panel-muted">{q.hint}</span>
              </label>
              {suggestions.length > 0 && (
                <div role="group" aria-label={`Sugerencias para: ${q.label}`} className="flex flex-wrap gap-2">
                  {suggestions.map((s) => {
                    const picked = value === s.text;
                    return (
                      <button
                        key={s.text}
                        type="button"
                        aria-pressed={picked}
                        onClick={() => setAnswers({ ...answers, [q.key]: s.text })}
                        className={`min-h-11 rounded-[14px] border px-3 py-2 text-left text-sm ${
                          picked ? "border-violet bg-violet text-on-violet" : "border-[#cfc9bc] bg-panel-sunk hover:border-panel-ink"
                        }`}
                      >
                        {s.demo && <span className="mr-1 font-mono text-[11px] uppercase">Ejemplo ·</span>}
                        {s.text}
                      </button>
                    );
                  })}
                </div>
              )}
              <textarea
                id={`q-${q.key}`}
                value={value}
                onChange={(e) => setAnswers({ ...answers, [q.key]: e.target.value })}
                rows={2}
                placeholder={g ? "Elige una sugerencia y edítala, o escribe la tuya" : undefined}
                className="rounded-[8px] border border-[#cfc9bc] bg-panel-sunk px-3 py-2"
              />
              <p className="m-0 text-xs text-panel-muted">Para qué sirve: {q.why}</p>
            </div>
          );
        })}
        {error && <p role="alert" className="text-sm font-bold text-coral-ink">{error}</p>}
        <div>
          <button type="button" onClick={save} disabled={saving} className={btnPrimary}>
            {saving ? "Guardando…" : "Guardar y ver mi mapa"}
          </button>
        </div>
      </section>

      <Guide character="pensativo" alt="Astronauta de Antimateria pensando">
        Usar el ejemplo está bien para arrancar. Antes del demo day cambia al menos el evento y quién lo prueba por algo tuyo.
      </Guide>
    </div>
  );
}
