# Plan maestro

Versión viva y editable: [Orquestador IA 101 — Plan maestro](https://claude.ai/artifact/X7ZmZFA2LanboTWp4y9fCW). Si este archivo y el doc difieren, manda el doc; actualiza este archivo cuando cambie algo importante.

## Qué queremos lograr

Que una persona sin experiencia técnica aprenda a orquestar IA, desarrollo y UX/UI para automatizar procesos y construir productos digitales, desplegarlos y lanzarlos. No buscamos que sepa todo a fondo, sino qué pedir, a qué herramienta y cómo verificar lo que recibe.

Sabremos que funcionó si cada persona que termina tiene una URL pública funcionando, su repositorio en GitHub y su plan de campaña; puede escribir un PRD y un prompt de construcción que otra persona o una IA ejecuta sin preguntar; explica qué hace cada pieza de su sistema; y no pagó nada para llegar ahí.

## Para quién

Primero pasantes y equipo Digital de OPSA Marketing; preparado para abrirse a cualquiera con el link. Personas sin suscripciones de pago, que aprenden en español y en sesiones cortas.

## Casos (plantillas personalizables)

Al elegir caso, la persona responde el lienzo de 5 preguntas: para quién es, qué problema resuelve, qué datos maneja, cómo sabrá que funcionó y quién lo prueba. El lienzo es guiado: cada pregunta trae cómo personalizarla, para qué sirve, la respuesta del ejemplo de referencia y 3 o 4 sugerencias que se eligen y se editan (`canvas` de cada caso en `shared/content.ts`). Un caso nuevo debe traer su `canvas`.

| Caso | Plantilla | Ejemplo de referencia | Orden |
| --- | --- | --- | --- |
| A · Web app de evento | Pasaporte coleccionable: visitar o comprar desbloquea algo | Chaqueta de jean con pines; cada compra desbloquea una personalización | 1 · piloto |
| C · Landing + automatización | Lanzar algo propio y dar seguimiento a cada interesado | Taller de fotografía con lista de espera | 2 |
| B · Website de negocio | Sitio de un negocio real | Tienda de ropa local | 3 |
| D · Automatización personal | Quitarse una tarea repetida | Gastos por Telegram → hoja → resumen semanal | 4 |
| E · Asistente IA de ideas y tareas | Segundo cerebro personal | Captura por Telegram y propone tareas | 5 |
| F · Agente de contenido | Contenido mensual para una marca real | Café con calendario de 4 semanas | 6 |

## Módulos

22 módulos en 7 fases; la lista completa con lab y entregable está en `shared/content.ts`.

- **F0 Arranque:** 00 El orquestador y el kit gratis · 01 Claude, ChatGPT y Gemini
- **F1 Pensar y definir:** 02 Entender el problema · 03 VPC y brief · 04 Lógica y flujos · 05 MVP y validación · 06 PRD y TRD
- **F2 Diseñar:** 07 UX · 08 UI (UI 101) · 09 Design bible y generación visual
- **F3 Arquitectura:** 10 Fundamentos web · 11 Data schemas y pipelines · 12 System design
- **F4 Construir y conectar:** 13 Context engineering · 14 APIs, webhooks y secretos · 15 Automatización con nodos · 16 Git y GitHub · 17 Deploy
- **F5 IA en el producto:** 18 Tokens, embeddings y RAG · 19 Agentes y loop engineering · 20 Evals, costos y seguridad
- **F6 Lanzar:** 21 Campaña y plan de contenido

## Roadmap

| Etapa | Alcance | Gate para avanzar |
| --- | --- | --- |
| 0 · Fundaciones | PRD, TRD, design system, base desplegada con sesión, caso y expediente | Desplegado en workers.dev y probado en celular |
| 1 · Pensar y definir | Módulos 00–06 con el caso A, portando el OPSA AI Lab y el kit de herramientas | 1 o 2 pasantes completan 00–06 sin ayuda |
| 2 · Diseñar | Módulos 07–09 | — |
| 3 · Arquitectura y construir | Módulos 10–17 | — |
| 4 · IA y lanzar | Módulos 18–21, Project Studio, panel de instructor, correo con código y cohortes | El caso A llega de 00 a 21 a una URL desplegada y su campaña |
| 5 · Abrir casos | C, B, D, E y F, uno a la vez | — |

## Referencias

- Sistema de diseño: https://claude.ai/artifact/DQKkAauu4RjG64y2jWmSfP
- Pantallas clave (lienzo): https://claude.ai/artifact/G9ErEsGrKJPbdSAaUoVPUA
- Kit de herramientas gratis, paso a paso: https://claude.ai/artifact/4vv2zdTATqktxM5K5UBThi
- UI 101 (referencia de lab): https://claude.ai/artifact/WqrcVGHz7pUzUfP2Y7AL1Q
- OPSA AI Lab, Problem Solving Studio: https://claude.ai/artifact/BkRd5Ps5YRNQvpWf3ADfYq
- OPSA AI Lab, Case Studio: https://claude.ai/artifact/W37HzkQBx3Bwz3A7FLzVcP
- Prompt Forge (base del módulo 09): https://claude.ai/artifact/4yXTARc4QEVydQmgCziHoy

Estos enlaces abren con la cuenta de Leo en claude.ai.
