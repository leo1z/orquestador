import type { AnchorHTMLAttributes, ReactNode } from "react";
import { navigate } from "../lib/router";

export function Link({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export const btnPrimary =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-violet px-5 text-sm font-bold text-on-violet transition hover:brightness-110 disabled:opacity-50";
export const btnSecondary =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-line-strong px-5 text-sm text-ink transition hover:border-ink";

// Los personajes de Antimateria tienen un rol fijo (ver docs/diseno.md).
export type Character =
  | "lupa" | "senala" | "senala-arriba" | "pensativo" | "corazon" | "capa" | "capa-arriba"
  | "estrellado" | "frontal" | "snack" | "sentado";

export function Guide({ character, alt, children }: { character: Character; alt: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[88px_1fr] items-center gap-4 rounded-[22px] border border-line bg-space-900 p-4">
      <img src={`/characters/${character}.webp`} alt={alt} className="h-28 w-full object-contain" />
      <div className="font-display text-base leading-snug">{children}</div>
    </div>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between gap-4 px-5 py-5 md:px-10">
        <Link href="/" className="font-display text-lg font-bold text-ink no-underline">
          Orquestador <span className="text-violet-text">IA 101</span>
        </Link>
        <nav aria-label="Principal" className="flex gap-1 text-sm">
          <Link href="/" className="rounded-full px-3 py-2 text-ink-muted no-underline hover:text-ink">Mapa</Link>
          <Link href="/expediente" className="rounded-full px-3 py-2 text-ink-muted no-underline hover:text-ink">Expediente</Link>
        </nav>
      </header>
      <main className="px-5 pb-16 md:px-10">{children}</main>
    </div>
  );
}
