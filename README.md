# OfferPilot

Your job search command center.

> [!IMPORTANT]
> This project is a work in progress. Core backend APIs, authentication, and the frontend application shell exist, but the product is still under active development and should not be treated as production-ready.

OfferPilot is a full-stack job-search CRM that helps users track applications, manage companies, monitor progress, and turn their job search into a clear, organized workflow.

## Tech Stack

### Backend

- Django
- Django REST Framework
- Simple JWT with HttpOnly cookies
- PostgreSQL

### Frontend

- Next.js
- React
- TypeScript
- Redux Toolkit
- TanStack Query
- React Hook Form
- Zod
- Tailwind CSS
- shadcn/ui

## How To Run Locally

Run the backend and frontend in separate terminals.

### Prerequisites

- Python 3.13+
- Node.js 20+
- PostgreSQL
- npm

### 1. Configure The Backend

From the repo root:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

If you are using Git Bash, activate the same virtual environment with:

```bash
cd backend
source .venv/Scripts/activate
```

If PowerShell blocks the activation script, allow it for the current terminal session only:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

Edit `backend/.env` and set your PostgreSQL connection values:

```env
DB_NAME=offerpilot
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=127.0.0.1
DB_PORT=5432
AUTH_COOKIE_SECURE=false
AUTH_COOKIE_SAMESITE=Lax
```

PostgreSQL must already be installed and running before the backend can start. Django migrations create the database tables, but they do not install PostgreSQL or create the database itself.

Create the database with any PostgreSQL client, such as DBeaver, pgAdmin, or the `psql` command-line tool. The database name must match `DB_NAME` in `backend/.env`.

For example, with `psql`:

```powershell
psql -U postgres -c "CREATE DATABASE offerpilot;"
```

If the database already exists, skip that command. Then run:

```powershell
python manage.py migrate
python manage.py seed_dev
python manage.py runserver 127.0.0.1:8000
```

The optional `seed_dev` command creates a demo user and demo application data:

```text
Username: demo
Password: demo
```

The backend API runs at `http://127.0.0.1:8000`.

### 2. Configure The Frontend

Open a second terminal from the repo root:

```powershell
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:3000`.

By default, the frontend calls the backend at `http://127.0.0.1:8000`. To override that, create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

### 3. Open The App

Visit:

```text
http://localhost:3000
```

Login with the seeded demo account, or register a new account from the register page.

## Useful Commands

### Backend

PowerShell:

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
python manage.py check
python manage.py migrate
python manage.py seed_dev
python manage.py runserver 127.0.0.1:8000
```

Git Bash:

```bash
cd backend
source .venv/Scripts/activate
python manage.py check
python manage.py migrate
python manage.py seed_dev
python manage.py runserver 127.0.0.1:8000
```

### Frontend

```powershell
cd frontend
npm run lint
npm run build
npm run dev
```

## Notes

- The frontend must run on `http://localhost:3000` or `http://127.0.0.1:3000` for the current backend CORS settings.
- Authentication uses HttpOnly JWT cookies, so frontend requests include credentials automatically through the API client.
- Application and company data is scoped to the authenticated user.
