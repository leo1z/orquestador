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
}

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
  { id: "A", name: "Web app de evento", template: "Pasaporte coleccionable: visitar o comprar desbloquea algo", choices: "El evento, qué se colecciona y qué se desbloquea", example: "Chaqueta de jean que se decora con pines; cada compra desbloquea una personalización", open: true },
  { id: "C", name: "Landing + automatización", template: "Lanzar algo propio y dar seguimiento a cada interesado", choices: "Qué lanza y por dónde da seguimiento (correo o Telegram)", example: "Landing de un taller de fotografía con lista de espera", open: false },
  { id: "B", name: "Website de negocio", template: "Sitio de un negocio real, propio o de alguien cercano", choices: "El negocio y el rubro: catálogo, historia, contacto", example: "Tienda de ropa local", open: false },
  { id: "D", name: "Automatización personal", template: "Quitarse una tarea repetida de la vida diaria", choices: "Gastos, hábitos o estudio, pagos y recordatorios, organizador de clases", example: "Gastos por Telegram → hoja → resumen semanal", open: false },
  { id: "E", name: "Asistente IA de ideas y tareas", template: "Un segundo cerebro personal", choices: "Sus proyectos como categorías, el canal (texto o voz) y la revisión semanal", example: "Captura por Telegram, clasifica por proyecto y propone tareas", open: false },
  { id: "F", name: "Agente de contenido", template: "Contenido mensual para una marca real", choices: "La marca, su tono y sus canales", example: "Emprendimiento de café con calendario de 4 semanas", open: false },
];

// Lienzo de personalización: 5 preguntas que alimentan todo el expediente.
export const CANVAS_QUESTIONS = [
  { key: "who", label: "¿Para quién es?", hint: "Una persona real, con nombre" },
  { key: "problem", label: "¿Qué problema le resuelve hoy?", hint: "Lo que le cuesta tiempo, dinero o ganas" },
  { key: "data", label: "¿Qué datos maneja?", hint: "Lo que entra y lo que sale" },
  { key: "success", label: "¿Cómo sabrá que funcionó?", hint: "Un número o un cambio visible" },
  { key: "tester", label: "¿Quién lo va a probar antes del demo day?", hint: "Nombre de la persona" },
] as const;

export type CanvasKey = (typeof CANVAS_QUESTIONS)[number]["key"];
export type Personalization = Partial<Record<CanvasKey, string>>;

export const MODULE_STEPS = ["Concepto", "Ejercicios", "Lab", "Aplicar al caso", "Check"] as const;

export const isModuleId = (id: string) => MODULES.some((m) => m.id === id);
export const isCaseId = (id: string): id is CaseId => CASES.some((c) => c.id === id);
