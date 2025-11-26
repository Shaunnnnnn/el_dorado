🧪 El Dorado – System Architecture (Day 1)
1. Frontend (Next.js, Vercel, V0 + Tailwind)

Purpose: User-facing dashboard, chat builder, project workspace, onboarding, domain purchase UI.
Tech: Next.js App Router, Tailwind, ShadCN, Streaming APIs.

Key Responsibilities:

Project creation UI

Chat → AI website generator UX

Live preview builder

Domain purchasing flow

Deployment success pages

Authentication UI (login / register)

Settings + user profile

SEO score visualizations

Integration with backend REST endpoints

Directory Structure:
frontend/
  src/app/
    dashboard/
    chat/
    builder/
    project/[id]/
    settings/
    auth/
  components/
  lib/

2. Backend (NestJS + PostgreSQL + Prisma)

Purpose: Master orchestrator, data store, AI pipeline, SEO integration, domain commands.

Responsibilities:

Authentication (JWT)

User management

Project model

AI generation orchestration

Talking to:

domain-service

seo-engine

V0 → code generation

OpenAI / chat models

Deployment requests

Database: PostgreSQL

Queue jobs (BullMQ recommended)

Directory Structure:
backend/
  src/
    modules/
      auth/
      user/
      project/
      ai/
    main.ts
    app.module.ts

3. Domain Service (Node.js Microservice)

Purpose: Everything to do with domains: purchase + DNS + SSL + Vercel linking.

Responsibilities:

Registrar API integrations

Domain validation

DNS provisioning

SSL activation

Vercel domain API linking

Webhook listener

Directory:

domain-service/
  src/
    index.ts
    controllers/
    services/

4. SEO Engine (AI SEO Microservice)

Purpose: Indexing, metadata, sitemaps, SEO scoring.

Responsibilities:

Auto metadata

Auto content optimization

Google Indexing / IndexNow

Sitemap generation + submission

SEO scoring for dashboard

Directory:

seo-engine/
  src/
    index.ts
    analyzer/
    generator/

5. MCP + Kiro Integration

Inside /.kiro folder:

.kiro/
  specs/
    architecture.yaml
    backend.yaml
    frontend.yaml
  steering/
  hooks/


Used for:

Spec-driven development

Agent hooks (deploy when commit)

Steering (coding style, naming conventions)

Vibe coding improvements

🎯 Summary Architecture Diagram (Text Version)
    ┌────────────────┐
    │   Frontend     │  Next.js → Vercel deployment
    └───────┬────────┘
            │ API Calls
    ┌───────▼────────┐
    │    Backend      │  NestJS orchestrator
    └───────┬────────┘
   ┌────────┴─────────┬──────────┐
   ▼                  ▼           ▼
Domain Service     SEO Engine    V0 / AI Models
(Provisioning)     (Indexing)    (Generation)


Everything flows back to Vercel for website deployment.