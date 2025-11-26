# El Dorado Domain Service

This microservice is responsible for EVERYTHING related to domain provisioning and hosting configuration.

## Purpose

This service handles:

### 1. **Domain Purchasing**
- Interacts with domain registrar API (e.g., Namecheap / Cloudflare Registrar / Porkbun)
- Initiates purchases directly from the user's dashboard
- Returns order confirmations + domain ownership data

### 2. **DNS Records**
Automatically configures DNS required for:

- Vercel deployments  
- APEX domains  
- www → root redirects  
- TXT verification  
- CNAME + A/AAAA records as needed  

### 3. **SSL Provisioning**
- Ensures HTTPS is active for every domain
- Validates DNS and triggers certificate issuance
- Supports automatic renewal

### 4. **Vercel Project Linking**
- Connects the generated website to Vercel
- Creates Vercel project dynamically
- Adds domains to Vercel programmatically
- Ensures deployment + preview URLs work instantly

## Architecture

- Node.js (TypeScript)
- Lightweight Express/Nest microservice
- Webhook listener for Vercel domain events

This service ensures users have a fully working custom domain with **zero manual configuration**.