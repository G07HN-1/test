# Express Static + JSON Demo ✅

This repository contains a minimal Express app that:

- Serves static files from `public/` (e.g., `index.html`) 🔧
- Exposes JSON endpoints under `/api` (e.g., `/api/status`, `/api/echo`) 💡

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

By default the server runs on `http://localhost:3000`.

## Endpoints

- `GET /api/status` — returns JSON with `status`, `uptime`, and `timestamp`.
- `POST /api/echo` — echoes the JSON body posted.

## Example

Get status:

```bash
curl http://localhost:3000/api/status
```

Echo JSON:

```bash
curl -X POST http://localhost:3000/api/echo -H "Content-Type: application/json" -d '{"hello":"world"}'
```

---

If you'd like, I can add tests, a `dev` workflow, or Docker support next. 
