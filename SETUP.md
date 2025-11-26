# El Dorado - Setup Guide

## Prerequisites
- Node.js 18+
- npm or yarn

## Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your keys
npm run start:dev
```

Backend runs on `http://localhost:3001`

### 2. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local if needed
npm run dev
```

Frontend runs on `http://localhost:3000`

### 3. Domain Service (Optional)
```bash
cd domain-service
npm install
npm run dev
```

Runs on `http://localhost:3002`

### 4. SEO Engine (Optional)
```bash
cd seo-engine
npm install
npm run dev
```

Runs on `http://localhost:3003`

## Architecture

```
┌─────────────┐
│  Frontend   │ :3000
│  (Next.js)  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Backend   │ :3001
│  (NestJS)   │
└──────┬──────┘
       │
       ├──────────────┐
       │              │
       ▼              ▼
┌─────────────┐ ┌─────────────┐
│   Domain    │ │     SEO     │
│   Service   │ │   Engine    │
│    :3002    │ │    :3003    │
└─────────────┘ └─────────────┘
```

## API Endpoints

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`

### Projects
- POST `/api/project/create`
- GET `/api/project/all`
- GET `/api/project/:id`
- PATCH `/api/project/:id`
- DELETE `/api/project/:id`

### AI
- POST `/api/ai/generate-site-structure`
- POST `/api/ai/generate-copy`
- POST `/api/ai/generate-components`
- POST `/api/ai/refine`

## Environment Variables

### Backend (.env)
```
JWT_SECRET=your-secret-key
PORT=3001
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-...
VERCEL_TOKEN=...
CLOUDFLARE_API_KEY=...
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Next Steps

1. **Database**: Add Prisma or TypeORM for persistent storage
2. **AI Integration**: Connect OpenAI API in `backend/src/modules/ai/ai.service.ts`
3. **Domain Service**: Implement Cloudflare/Vercel integrations
4. **SEO Engine**: Add real metadata generation logic
5. **Testing**: Add unit and e2e tests
6. **Deployment**: Deploy to Vercel (frontend) and Railway/Render (backend)
