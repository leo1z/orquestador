import { useCallback, useEffect, useState } from "react";
import { api, type Me } from "./lib/api";
import { usePath } from "./lib/router";
import { Guide, Shell } from "./components/ui";
import { Inicio } from "./pages/Inicio";
import { Caso } from "./pages/Caso";
import { Modulo } from "./pages/Modulo";
import { Expediente } from "./pages/Expediente";

export function App() {
  const path = usePath();
  const [me, setMe] = useState<Me | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    api.me().then(setMe, (e: Error) => setError(e.message));
  }, []);
  useEffect(load, [load]);

  if (error) {
    return (
      <Shell>
        <div className="mx-auto max-w-3xl">
          <Guide character="estrellado" alt="Astronauta de Antimateria estrellándose">
            No pudimos cargar tu progreso: {error}. Recarga la página.
          </Guide>
        </div>
      </Shell>
    );
  }
  if (!me) return <Shell><p className="eyebrow text-ink-muted">Cargando tu misión…</p></Shell>;

  const moduleMatch = path.match(/^\/modulo\/(\d{2})$/);
  let page;
  if (path === "/caso") page = <Caso me={me} onSaved={load} />;
  else if (path === "/expediente") page = <Expediente me={me} />;
  else if (moduleMatch) page = <Modulo key={moduleMatch[1]} me={me} id={moduleMatch[1]} onChange={load} />;
  else page = <Inicio me={me} />;

  return <Shell>{page}</Shell>;
}
