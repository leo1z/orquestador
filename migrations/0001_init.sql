-- Etapa 0: sesión anónima, caso elegido, progreso por módulo y expediente.
-- El correo (para entrar desde otro dispositivo) y las cohortes llegan en la Etapa 1.

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,                 -- id aleatorio guardado en la cookie oia_sid
  display_name TEXT,
  email TEXT UNIQUE,                   -- se llena al "guardar en la nube" (Etapa 1)
  cohort_code TEXT,
  case_id TEXT,                        -- A..F
  personalization TEXT NOT NULL DEFAULT '{}', -- JSON con las 5 respuestas del lienzo
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  last_seen_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS progress (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,             -- "00".."21"
  step INTEGER NOT NULL DEFAULT 0,     -- 0..4: Concepto, Ejercicios, Lab, Aplicar al caso, Check
  completed_at TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, module_id)
);

CREATE TABLE IF NOT EXISTS deliverables (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  content TEXT NOT NULL,               -- Markdown del entregable
  version INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, module_id)
);

CREATE INDEX IF NOT EXISTS idx_users_cohort ON users(cohort_code);
