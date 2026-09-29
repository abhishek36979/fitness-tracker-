# Fitness Tracker MVP

A web-based fitness tracker with a **Python (FastAPI) backend** and a **basic JavaScript frontend**. Users can register, log in, save profile data, and get calorie-based meal and workout recommendations.

## Project Structure

```
fitnesstracker/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app entry point
│   │   ├── config.py        # Settings
│   │   ├── database.py      # SQLAlchemy setup
│   │   ├── models.py        # User & Profile models
│   │   ├── schemas.py       # Pydantic request/response schemas
│   │   ├── auth.py          # JWT auth & password hashing
│   │   ├── routes.py        # API endpoints
│   │   └── services.py      # Meal & workout calculation logic
│   └── requirements.txt
└── frontend/
    ├── css/style.css
    ├── js/api.js
    ├── login.html
    ├── register.html
    └── dashboard.html
```

## Features (MVP)

- **Auth**: Register & login with JWT tokens
- **Profile**: Store age, gender, weight, height, activity level, diet preference, fitness goal
- **Nutrition**: BMR/TDEE calculation (Mifflin-St Jeor) with macro targets
- **Meals**: Diet-specific meal suggestions with calories and macros
- **Workouts**: Goal-based workout plans with estimated calorie burn

## Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new user |
| POST | `/api/auth/login` | Login (returns JWT) |
| GET | `/api/auth/me` | Get current user |
| GET/PUT | `/api/profile` | Get/update user profile |
| GET | `/api/nutrition` | Calorie & macro targets |
| GET | `/api/meals/suggest` | Meal plan suggestions |
| GET | `/api/workouts/suggest` | Workout plan suggestions |

Interactive API docs: `http://127.0.0.1:8000/docs`

## Setup & Run

### 1. Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs at: **http://127.0.0.1:8000**

### 2. Frontend

**Important:** Run this from the project root, not from `backend`.

```bash
cd frontend
python -m http.server 5500
```

Or double-click `start-frontend.bat` in the project root folder.

Open: **http://127.0.0.1:5500/login.html**

## Usage Flow

1. **Register** a new account
2. **Login** with your credentials
3. Fill in your **profile** (age, gender, weight, height, preferences)
4. Click **Save Profile** or **Get Recommendations**
5. View your **nutrition targets**, **meal plan**, and **workout plan**

## Tech Stack

- **Backend**: Python, FastAPI, SQLAlchemy, SQLite, JWT (python-jose), bcrypt
- **Frontend**: HTML, CSS, vanilla JavaScript

## Next Steps (Post-MVP)

- Log daily meals and workouts
- Track weight over time with charts
- Custom meal/workout logging
- PostgreSQL for production
- React/Vue frontend
