import { useEffect, useState } from "react";

// Router mínimo por pathname. Rutas: /, /caso, /modulo/:id, /expediente.
export function navigate(to: string) {
  if (to === location.pathname) return;
  history.pushState(null, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}

export function usePath() {
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    const onPop = () => setPath(location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  return path;
}
