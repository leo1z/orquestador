# Orquestador IA 101

Academia web para aprender a orquestar IA, desarrollo y UX/UI construyendo un proyecto real, de la idea al deploy y la campaña. Hecha con la marca Antimateria.

## Correr en local

Requiere Node.js 22 o más.

```bash
npm install
npm run db:migrate:local
npm run dev
```

Abre http://localhost:5173.

## Publicar en Cloudflare

```bash
npx wrangler login
npx wrangler d1 create orquestador      # copia el database_id en wrangler.jsonc
npm run db:migrate:remote
npm run deploy
```

Para deploy automático en cada push, conecta este repositorio en el panel de Cloudflare (Workers & Pages → importar repositorio).

## Documentación

- `CLAUDE.md`: contexto para trabajar con Claude Code.
- `docs/plan.md`, `docs/PRD.md`, `docs/TRD.md`, `docs/diseno.md`, `docs/labs.md`.
