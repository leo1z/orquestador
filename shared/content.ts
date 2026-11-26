// Catálogo de la academia: fases, módulos y casos.
// Fuente de verdad compartida por la app (src) y la API (worker).
// Para agregar un módulo o un caso se edita este archivo; no hace falta tocar la plataforma.

export type PhaseId = "F0" | "F1" | "F2" | "F3" | "F4" | "F5" | "F6";

export interface Phase {
  id: PhaseId;
  name: string;
}

export interface Module {
  id: string; // "00".."21"
  phase: PhaseId;
  title: string;
  lab: string; // qué se experimenta en el lab
  deliverable: string; // lo que se guarda en el expediente
  status: "listo" | "en-diseño" | "pendiente"; // estado de construcción en la plataforma
}

export type CaseId = "A" | "B" | "C" | "D" | "E" | "F";

export interface CaseTemplate {
  id: CaseId;
  name: string;
  template: string;
  choices: string; // lo que la persona personaliza
  example: string; // ejemplo de referencia
  open: boolean; // si ya se puede elegir (el piloto es A)
  canvas?: CaseCanvas; // guía del lienzo para este caso: ejemplo y sugerencias por pregunta
  brief?: CaseBrief; // explicación del caso: qué es, cómo funciona y qué se personaliza
}

// Explicación de un caso para quien lo elige. Todo caso abierto debe traerla.
export interface CaseBrief {
  what: string; // qué se construye, en 2 o 3 frases
  flow: string[]; // cómo lo usa la gente, 3 a 5 pasos
  roles: { name: string; does: string }[];
  keep: string; // la mecánica que no cambia
  personalize: { what: string; examples: string }[];
  outcome: string; // con qué termina la persona al final del curso
}

const CASE_A_BRIEF: CaseBrief = {
  what:
    "Una app web para un evento con stands. Cada asistente tiene un pasaporte digital: en el ejemplo, una chaqueta de jean que va llenando con pines cada vez que visita un stand. Cuando compra, desbloquea una personalización de su chaqueta.",
  flow: [
    "El asistente entra a la app con su nombre",
    "Escanea el QR de un stand y gana un pin",
    "Compra en el stand; el emprendedor la registra y se desbloquea una personalización",
    "Comparte su chaqueta terminada; el organizador ve visitas y ventas por stand",
  ],
  roles: [
    { name: "Asistente", does: "Visita stands, colecciona y personaliza" },
    { name: "Emprendedor", does: "Muestra su QR, registra ventas y ve sus visitas" },
    { name: "Organizador", does: "Administra los stands y ve los resultados del evento" },
  ],
  keep: "Visitar o comprar desbloquea algo. Esa mecánica se mantiene; todo lo demás lo cambias por algo que conozcas.",
  personalize: [
    { what: "El evento", examples: "Feria navideña, mercado de emprendedores, festival de música, feria universitaria, congreso" },
    { what: "Qué se colecciona", examples: "Pines en una chaqueta, sellos en un pasaporte, estampas en un álbum, cartas" },
    { what: "Qué se desbloquea al comprar", examples: "Colores y parches, un descuento, una entrada a un sorteo, un premio final" },
    { what: "Los roles", examples: "Mínimo quien visita y quien atiende el stand; el organizador es opcional" },
  ],
  outcome: "Tu app publicada con su propia dirección web, su código en GitHub y una campaña para promocionarla.",
};

// Guía de una pregunta del lienzo para un caso: la respuesta del ejemplo de referencia
// y 3 o 4 sugerencias que la persona puede elegir y editar.
export interface CanvasGuide {
  demo: string;
  options: string[];
}
export type CaseCanvas = Record<CanvasKey, CanvasGuide>;

const CASE_A_CANVAS: CaseCanvas = {
  who: {
    demo: "Asistentes de una feria navideña de emprendedores y los dueños de cada stand",
    options: [
      "Asistentes de un mercado de emprendedores y sus vendedores",
      "Público de un festival de música y las marcas con stand",
      "Visitantes de una feria universitaria y los grupos que exponen",
      "Participantes de un congreso y sus patrocinadores",
    ],
  },
  problem: {
    demo: "Los stands del fondo casi no reciben visitas y la gente se va sin recorrer toda la feria",
    options: [
      "La gente no sabe qué stands hay ni dónde están",
      "Los emprendedores no saben cuántas personas pasan por su stand",
      "Nadie tiene un motivo para comprar en más de un stand",
      "Al terminar el evento no queda ningún recuerdo ni forma de volver a contactar",
    ],
  },
  data: {
    demo: "Entra: el QR escaneado en cada stand y las compras que registra el emprendedor. Sale: pines ganados, personalizaciones desbloqueadas y visitas por stand",
    options: [
      "Entra: escaneos de QR por stand. Sale: pines ganados y progreso de cada asistente",
      "Entra: compras registradas por cada emprendedor. Sale: personalizaciones desbloqueadas y ventas por stand",
      "Entra: el nombre del asistente al registrarse. Sale: su colección y un resumen al final del evento",
    ],
  },
  success: {
    demo: "Cada stand recibe al menos 30 visitas durante la feria",
    options: [
      "La mitad de los asistentes desbloquea al menos 5 pines",
      "Las ventas por stand suben frente a la edición anterior",
      "Al menos 8 de cada 10 emprendedores quieren repetir la dinámica",
    ],
  },
  tester: {
    demo: "Una emprendedora que vende en la feria y dos amigos que la visitan",
    options: [
      "Un emprendedor que conozco y dos personas que irían al evento",
      "Mi equipo de la pasantía, haciéndose pasar por asistentes",
      "La persona que organiza el evento",
    ],
  },
};

export const PHASES: Phase[] = [
  { id: "F0", name: "Arranque" },
  { id: "F1", name: "Pensar y definir" },
  { id: "F2", name: "Diseñar" },
  { id: "F3", name: "Arquitectura" },
  { id: "F4", name: "Construir y conectar" },
  { id: "F5", name: "IA en el producto" },
  { id: "F6", name: "Lanzar" },
];

export const MODULES: Module[] = [
  { id: "00", phase: "F0", title: "El orquestador y el kit gratis", lab: "¿Qué herramienta para qué tarea?", deliverable: "Cuentas creadas y caso elegido", status: "pendiente" },
  { id: "01", phase: "F0", title: "Claude, ChatGPT y Gemini", lab: "El mismo pedido en las 3 apps, comparado", deliverable: "Mi mapa de herramientas", status: "pendiente" },
  { id: "02", phase: "F1", title: "Entender el problema", lab: "Clasificador problema / solución / idea", deliverable: "Problem statement y stakeholders", status: "pendiente" },
  { id: "03", phase: "F1", title: "Value Proposition Canvas y brief", lab: "Canvas interactivo con revisión de encaje", deliverable: "VPC y brief", status: "pendiente" },
  { id: "04", phase: "F1", title: "Lógica y flujos", lab: "Flujo ejecutable con datos de prueba", deliverable: "Reglas, estados y flujo principal", status: "en-diseño" },
  { id: "05", phase: "F1", title: "MVP y validación", lab: "MoSCoW arrastrable y generador Gherkin", deliverable: "Alcance, criterios y casos de prueba", status: "pendiente" },
  { id: "06", phase: "F1", title: "PRD y TRD", lab: "Editor guiado con revisor de requisitos vagos", deliverable: "PRD y TRD", status: "pendiente" },
  { id: "07", phase: "F2", title: "UX", lab: "Armar un wireframe con bloques", deliverable: "User flows y wireframes", status: "pendiente" },
  { id: "08", phase: "F2", title: "UI", lab: "Arregla la pantalla “Tu pedido”", deliverable: "Componentes nombrados y pedidos de cambio", status: "pendiente" },
  { id: "09", phase: "F2", title: "Design bible y generación visual", lab: "Armador de bible y prompts estructurados", deliverable: "Design bible y prompts de piezas", status: "pendiente" },
  { id: "10", phase: "F3", title: "Fundamentos web", lab: "El viaje de un clic", deliverable: "Mapa cliente–servidor del caso", status: "pendiente" },
  { id: "11", phase: "F3", title: "Data schemas y pipelines", lab: "Diseñar tablas y correr SQL en el navegador", deliverable: "Schema SQL y diagrama de datos", status: "pendiente" },
  { id: "12", phase: "F3", title: "System design", lab: "Armar el sistema y simular carga y fallos", deliverable: "Diagrama de arquitectura", status: "pendiente" },
  { id: "13", phase: "F4", title: "Context engineering", lab: "El mismo pedido con y sin contexto, con puntaje", deliverable: "Prompt de construcción y archivo de contexto", status: "pendiente" },
  { id: "14", phase: "F4", title: "APIs, webhooks y secretos", lab: "Cliente API simulado y llamada real a Gemini", deliverable: "Mapa de integraciones y claves guardadas", status: "pendiente" },
  { id: "15", phase: "F4", title: "Automatización con nodos", lab: "Canvas de nodos que ejecuta el JSON", deliverable: "Workflow exportado (n8n o Make)", status: "pendiente" },
  { id: "16", phase: "F4", title: "Git y GitHub", lab: "Árbol de commits visual", deliverable: "Repositorio con historial limpio", status: "pendiente" },
  { id: "17", phase: "F4", title: "Deploy", lab: "Publicar en Cloudflare de verdad", deliverable: "URL pública", status: "pendiente" },
  { id: "18", phase: "F5", title: "Tokens, embeddings y RAG", lab: "Chunking y búsqueda semántica real", deliverable: "Base de conocimiento del caso", status: "pendiente" },
  { id: "19", phase: "F5", title: "Agentes y loop engineering", lab: "Loop con tools, parada y aprobación humana", deliverable: "Diseño del agente", status: "pendiente" },
  { id: "20", phase: "F5", title: "Evals, costos y seguridad", lab: "Calculadora de costos y demo de prompt injection", deliverable: "Set de evals y presupuesto", status: "pendiente" },
  { id: "21", phase: "F6", title: "Campaña y plan de contenido", lab: "Generador de calendario y kit de piezas", deliverable: "Plan de campaña y piezas", status: "pendiente" },
];

export const CASES: CaseTemplate[] = [
  { id: "A", name: "Web app de evento", template: "Pasaporte coleccionable: visitar o comprar desbloquea algo", choices: "El evento, qué se colecciona y qué se desbloquea", example: "Chaqueta de jean que se decora con pines; cada compra desbloquea una personalización", open: true, canvas: CASE_A_CANVAS, brief: CASE_A_BRIEF },
  { id: "C", name: "Landing + automatización", template: "Lanzar algo propio y dar seguimiento a cada interesado", choices: "Qué lanza y por dónde da seguimiento (correo o Telegram)", example: "Landing de un taller de fotografía con lista de espera", open: false },
  { id: "B", name: "Website de negocio", template: "Sitio de un negocio real, propio o de alguien cercano", choices: "El negocio y el rubro: catálogo, historia, contacto", example: "Tienda de ropa local", open: false },
  { id: "D", name: "Automatización personal", template: "Quitarse una tarea repetida de la vida diaria", choices: "Gastos, hábitos o estudio, pagos y recordatorios, organizador de clases", example: "Gastos por Telegram → hoja → resumen semanal", open: false },
  { id: "E", name: "Asistente IA de ideas y tareas", template: "Un segundo cerebro personal", choices: "Sus proyectos como categorías, el canal (texto o voz) y la revisión semanal", example: "Captura por Telegram, clasifica por proyecto y propone tareas", open: false },
  { id: "F", name: "Agente de contenido", template: "Contenido mensual para una marca real", choices: "La marca, su tono y sus canales", example: "Emprendimiento de café con calendario de 4 semanas", open: false },
];

// Lienzo de personalización: 5 preguntas que alimentan todo el expediente.
// hint = cómo personalizar la respuesta; why = para qué sirve en el resto del curso.
export const CANVAS_QUESTIONS = [
  { key: "who", label: "¿Para quién es?", hint: "Piensa en un evento o negocio que conozcas de verdad y en las personas que lo usarían.", why: "Define a quién le hablas en el brief, el diseño y la campaña." },
  { key: "problem", label: "¿Qué problema le resuelve hoy?", hint: "Escribe lo que pasa hoy sin tu app, como lo diría esa persona. Evita describir la solución.", why: "Es la base del problem statement del módulo 02." },
  { key: "data", label: "¿Qué datos maneja?", hint: "Separa lo que entra (lo que alguien registra) de lo que sale (lo que la app muestra o calcula).", why: "Se convierte en tu schema de base de datos en el módulo 11." },
  { key: "success", label: "¿Cómo sabrá que funcionó?", hint: "Un número o un cambio que se pueda ver el día del evento.", why: "Será tu criterio de éxito del MVP en el módulo 05." },
  { key: "tester", label: "¿Quién lo va a probar antes del demo day?", hint: "Solo nombres o roles: alguien a quien puedas escribirle esta semana.", why: "Sin alguien que lo pruebe, el demo day es una suposición." },
] as const;

export type CanvasKey = (typeof CANVAS_QUESTIONS)[number]["key"];
export type Personalization = Partial<Record<CanvasKey, string>>;

export const MODULE_STEPS = ["Concepto", "Ejercicios", "Lab", "Aplicar al caso", "Check"] as const;

export const isModuleId = (id: string) => MODULES.some((m) => m.id === id);
export const isCaseId = (id: string): id is CaseId => CASES.some((c) => c.id === id);
