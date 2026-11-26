import { useState } from "react";
import { CANVAS_QUESTIONS, CASES, type CaseBrief, type CaseId, type Personalization } from "../../shared/content";
import { api, type Me } from "../lib/api";
import { navigate } from "../lib/router";
import { Guide, btnPrimary, btnSecondary } from "../components/ui";

export function Caso({ me, onSaved }: { me: Me; onSaved: () => void }) {
  const [caseId, setCaseId] = useState<CaseId | null>(me.caseId ?? "A");
  const [answers, setAnswers] = useState<Personalization>(me.personalization);
  const [name, setName] = useState(me.displayName ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const selectedCase = CASES.find((c) => c.id === caseId);
  const guide = selectedCase?.canvas;
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

      {selectedCase?.brief && <CaseExplainer id={selectedCase.id} name={selectedCase.name} brief={selectedCase.brief} />}

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

// Explica el caso elegido antes del lienzo: qué es, cómo se usa, qué se mantiene y qué se personaliza.
function CaseExplainer({ id, name, brief }: { id: string; name: string; brief: CaseBrief }) {
  return (
    <section aria-labelledby="caso-explicado" className="grid gap-6 rounded-[22px] border border-line bg-space-900 p-6">
      <div>
        <p className="eyebrow m-0 text-violet-text">Caso {id} · qué vas a construir</p>
        <h2 id="caso-explicado" className="mt-2 font-display text-2xl font-bold">{name}</h2>
        <p className="mt-2 max-w-3xl text-ink-muted">{brief.what}</p>
      </div>

      <div>
        <h3 className="eyebrow m-0 text-ink-muted">Cómo lo usa la gente</h3>
        <ol className="mt-3 grid list-none gap-3 p-0 md:grid-cols-4">
          {brief.flow.map((step, i) => (
            <li key={step} className="grid gap-2 rounded-[14px] border border-line p-4">
              <span className="font-mono text-xs text-violet-text">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="eyebrow m-0 text-ink-muted">Quién la usa</h3>
          <dl className="mt-3 grid gap-2">
            {brief.roles.map((r) => (
              <div key={r.name} className="grid grid-cols-[110px_1fr] gap-3 text-sm">
                <dt className="font-bold">{r.name}</dt>
                <dd className="m-0 text-ink-muted">{r.does}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h3 className="eyebrow m-0 text-ink-muted">Lo que no cambia</h3>
          <p className="mt-3 text-sm">{brief.keep}</p>
        </div>
      </div>

      <div>
        <h3 className="eyebrow m-0 text-ink-muted">Cómo lo haces tuyo</h3>
        <dl className="mt-3 grid gap-3 md:grid-cols-2">
          {brief.personalize.map((p) => (
            <div key={p.what} className="rounded-[14px] border border-line p-4">
              <dt className="text-sm font-bold">{p.what}</dt>
              <dd className="m-0 mt-1 text-sm text-ink-muted">{p.examples}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="m-0 border-t border-line pt-4 text-sm">
        <span className="font-bold">Al terminar el curso tendrás: </span>
        {brief.outcome}
      </p>
    </section>
  );
}
