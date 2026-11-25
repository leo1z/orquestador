# Diseño · sistema Órbita

Fuente completa (tokens, guía de marca, personajes): [Orquestador IA 101 — Design System](https://claude.ai/artifact/DQKkAauu4RjG64y2jWmSfP). Pantallas de referencia: [lienzo, página Pantallas clave](https://claude.ai/artifact/G9ErEsGrKJPbdSAaUoVPUA). Los tokens viven en `src/styles.css` (`@theme`); si cambian en el sistema, se cambian ahí.

## Esencia

- Espacio oscuro y neutro (`space-950`), contenido en paneles crema (`panel`) y el violeta de Antimateria (`violet`) como único color líder.
- Una sola acción violeta por vista. El coral (`coral`) solo avisa que falta algo o está en curso.
- Tipografía: Sora (títulos y pistas), Manrope (lectura), JetBrains Mono (etiquetas tipo especificación en mayúsculas, clase `.eyebrow`).
- Panel principal con radio 22px, bloques internos 14px, botones y pasos en píldora. Bordes de 1px, sin sombras.
- La navegación por fases es una órbita. El planeta solo aparece en el mapa de inicio.

## Cero relleno, cero slop

Cada palabra y cada elemento tiene que hacer trabajo. Si se quita y nadie lo extraña, sobra.

**Texto:** nada de lorem ipsum ni frases que podrían ir en cualquier producto ("Descubre el poder de…", "Desbloquea tu potencial"). Nada de cifras inventadas; un número solo aparece si viene de datos reales. Los títulos dicen qué hay o qué hacer, no un eslogan. Los estados vacíos dicen qué falta y ofrecen la acción.

**Visual:** sin degradados de fondo, glows, glassmorphism, sombras decorativas, tarjetas con borde izquierdo de color, emoji, íconos que solo decoran, badges sin motivo ni tarjetas que repiten el título. El planeta es la única licencia decorativa y vive solo en el inicio.

## Personajes (`public/characters/*.webp`)

Uno por pantalla como máximo, siempre con su globo de texto, nunca tapando contenido.

| Archivo | Rol |
| --- | --- |
| `lupa` | Pistas del lab, "Revisa mi respuesta" |
| `senala`, `senala-arriba` | Explicar un concepto, marcar el siguiente paso o la fase actual |
| `pensativo` | Revisar el expediente y lo que falta |
| `corazon` | Guardado, entregable aprobado |
| `capa`, `capa-arriba` | Logros, módulo completado, demo day |
| `estrellado` | Errores y pruebas fallidas |
| `frontal`, `snack`, `sentado` | Estados vacíos y pausas |

## Voz

Tuteo, frases cortas, verbo primero en botones ("Ejecutar", "Guardar en expediente"). Español para explicar, inglés para nombrar términos técnicos. Sin "por favor", sin signos de exclamación, sin emoji. Las pistas preguntan antes de responder.
