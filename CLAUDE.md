# Orquestador IA 101

Academia web, en español, que enseña a personas sin experiencia técnica a **orquestar herramientas de IA, desarrollo y UX/UI** para automatizar procesos, construir productos digitales, desplegarlos y lanzarlos. Marca: **Antimateria** (de Leo Borjas). Dueño del producto: Leo.

La persona elige un **caso** (plantilla que personaliza con algo real), lo lleva por **22 módulos en 7 fases** y termina con un proyecto desplegado y su campaña. Todo debe poder hacerse con cuentas gratuitas.

## Lee antes de trabajar

| Documento | Para qué |
| --- | --- |
| `docs/plan.md` | Qué queremos lograr, casos, módulos, roadmap y decisiones |
| `docs/PRD.md` | Requisitos del producto (qué y por qué) |
| `docs/TRD.md` | Requisitos técnicos (cómo): stack, datos, API, seguridad |
| `docs/diseno.md` | Sistema de diseño Órbita, reglas anti relleno y personajes |
| `docs/labs.md` | Estándar obligatorio de los labs y la ficha de cada módulo |
| `shared/content.ts` | Catálogo de fases, módulos, casos y lienzo: fuente de verdad del contenido |

## Stack

- **Frontend:** React 19 + Vite 8 + TypeScript + Tailwind CSS v4 (`src/`).
- **API:** Hono en Cloudflare Workers (`worker/index.ts`), todo bajo `/api/*`.
- **Base de datos:** Cloudflare D1 (SQLite), migraciones en `migrations/`.
- **Deploy:** un solo Worker sirve la SPA (assets) y la API. `@cloudflare/vite-plugin` corre ambos en `npm run dev`.
- **IA dentro de la academia:** cada persona usa su propia clave gratis de Gemini (Google AI Studio), guardada solo en su navegador. Nunca pasa por nuestro servidor ni por D1.

## Comandos

```bash
npm install
npm run db:migrate:local   # crea las tablas en la D1 local
npm run dev                # app + API en http://localhost:5173
npm run build              # tsc -b && vite build (debe quedar en verde antes de cada commit)
npm run deploy             # build + wrangler deploy (requiere database_id real en wrangler.jsonc)
```

## Cómo trabajamos

1. **Un módulo a la vez, siempre con el caso A** (piloto: pasaporte de evento, chaqueta de jean con pines). Los otros casos se abren cuando el caso A recorre los 22 módulos.
2. Cada módulo tiene 5 pasos: **Concepto, Ejercicios, Lab, Aplicar al caso, Check**. Antes de programar uno, escribe su ficha en `docs/labs.md`.
3. **Definición de terminado de un módulo:** los 5 pasos funcionan en celular y computadora; el entregable se guarda en el expediente y se exporta en Markdown; una persona sin experiencia lo completa sin ayuda en menos de 90 minutos; todo lo obligatorio funciona con cuentas gratis; el instructor ve el avance.
4. Agregar un caso = solo contenido (datos de ejemplo, plantillas, preguntas del builder), no código nuevo de plataforma.
5. Commits pequeños, en español, con `npm run build` en verde.

## Reglas que no se negocian

- **Cero relleno, cero slop** (detalle en `docs/diseno.md`): nada de texto genérico, cifras inventadas, títulos tipo eslogan, degradados, glows, emoji, badges sin motivo ni tarjetas decorativas. Si un elemento se quita y nadie lo extraña, sobra.
- **Labs como el de UI 101** (detalle en `docs/labs.md`): objeto visual que reacciona, elegir antes que memorizar, ejecutar y ver el cambio, retos que se marcan solos, deshacer/reiniciar/historial, errores que enseñan.
- **Español para explicar, inglés para nombrar** términos técnicos (Text field, webhook, RAG).
- **Accesible:** texto 4.5:1, áreas táctiles de 44px, elementos interactivos reales (`button`, `a`, `input` con `label`), estado nunca solo por color.
- **Privacidad:** no guardar claves de API, contraseñas ni datos sensibles de terceros. El lienzo del caso no debe pedir datos personales de otras personas más allá de un nombre.
- Personajes de Antimateria en `public/characters/`: uno por pantalla como máximo, con su rol fijo (ver `docs/diseno.md`).

## Estado actual

**Etapa 0 (fundaciones)** en curso: base desplegable con sesión anónima por cookie, selector de caso con lienzo de 5 preguntas, mapa de fases, estructura de módulo con sus 5 pasos y expediente. Lo siguiente es la Etapa 1: módulos 00 a 06 con el caso A, portando el contenido del OPSA AI Lab (ver `docs/plan.md`).
