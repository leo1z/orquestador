# PRD · Orquestador IA 101

Estado: borrador v0.1 · Dueño: Leo Borjas · Última revisión: 25 nov 2026

## Problema

Las personas que entran al equipo (pasantes, perfiles de marketing) usan IA de forma suelta: piden cosas vagas, no saben qué herramienta usar para qué, no pueden convertir una idea en un flujo ni llevar un producto hasta publicarlo. Los cursos existentes enseñan una herramienta a la vez o asumen que la persona programa.

## Objetivo

Que una persona sin experiencia técnica termine un proyecto real, personalizado y desplegado, con su campaña de lanzamiento, aprendiendo en el camino a orquestar IA, desarrollo y UX/UI con herramientas gratuitas.

## Usuarios

| Rol | Necesita |
| --- | --- |
| Persona que aprende | Saber dónde está, qué sigue y qué le falta; practicar sin miedo a romper; guardar lo que produce |
| Instructor (Leo) | Ver el avance de cada persona, detectar atascos y comentar entregables |

## Alcance

### Etapa 0 (esta versión)
- Entrar sin cuenta: sesión anónima por cookie, progreso guardado en D1 desde el primer clic.
- Elegir caso (solo A abierto) y responder el lienzo de 5 preguntas.
- Mapa de fases y módulos con la fase actual.
- Estructura de módulo con los 5 pasos y avance guardado.
- Expediente con el lienzo y el estado de los 22 entregables.

### Etapas siguientes
- Contenido, ejercicios, lab y builder de cada módulo (ver `docs/labs.md`).
- Guardar en la nube con correo y código de 6 dígitos, sin contraseña.
- Código de cohorte y panel de instructor con comentarios.
- Ayuda de IA en cada paso con la clave gratis de Gemini de la persona; sin clave, copiar la consulta para pegarla en Claude, ChatGPT o Gemini.
- Project Studio: compilar el expediente en PRD, TRD, prompt de construcción, schema SQL, workflow n8n/Make, design bible y plan de campaña.

### Fuera de alcance
- Pagos y suscripciones dentro de la academia.
- Cursos de una sola herramienta en profundidad.
- Calificaciones formales o certificados.

## Requisitos funcionales

| ID | Requisito | Etapa |
| --- | --- | --- |
| RF-01 | Al abrir la academia se crea un usuario anónimo y su progreso se guarda sin registrarse | 0 |
| RF-02 | La persona elige un caso abierto y responde (o deja pendientes) las 5 preguntas del lienzo | 0 |
| RF-03 | El mapa muestra las 7 fases, la fase actual y el siguiente módulo | 0 |
| RF-04 | Cada módulo muestra 5 pasos; avanzar guarda el paso; el check completa el módulo | 0 |
| RF-05 | El expediente lista los 22 entregables con estado (listo, en curso, pendiente) y versión | 0 |
| RF-06 | Cada lab cumple el estándar de `docs/labs.md` | 1+ |
| RF-07 | El entregable de cada módulo se edita, guarda con versión y exporta en Markdown | 1 |
| RF-08 | La persona puede vincular un correo y recuperar su progreso en otro dispositivo con un código | 1 |
| RF-09 | El instructor ve por persona: caso, fase, módulo actual, entregables y atascos, y deja comentarios | 4 |

## Requisitos no funcionales

- Funciona en celular (≥360px) y computadora; probado en Safari iOS y Chrome.
- Accesible: contraste 4.5:1, áreas táctiles de 44px, navegación por teclado.
- Todo lo obligatorio con cuentas gratis; costo de operación dentro del plan gratis de Cloudflare.
- Sin texto de relleno ni elementos decorativos (ver `docs/diseno.md`).

## Métricas de éxito

- % de personas que completan la fase F1 sin ayuda.
- Tiempo medio por módulo (meta: menos de 90 minutos).
- % de personas que llegan a una URL desplegada.
- Entregables comentados por el instructor por semana.

## Preguntas abiertas

- ¿Quiénes son los 1 o 2 pasantes de prueba de la Etapa 1?
- ¿Público solo OPSA al inicio o abierto con link desde el día uno?
