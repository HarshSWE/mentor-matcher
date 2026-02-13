# MentorMatcher

Given mentor data grouped by specialty and sample startup pitches with labeled categories, it classifies startup ideas into categories (e.g., Fintech, HealthTech, AI/ML, etc.) using a simple ML model. It recommends suitable mentors based on the predicted category and displays the results to the user via a react frontend.

---

## Tech Stack

**Backend**

- Django, Scikit-learn, Pandas

**Frontend**

- React.js

---

## Prerequisites

Make sure you have the following installed:

- Python 3.9+
- Node.js 18+
- npm
- Git

---

## Backend Setup (Django)

Navigate to the backend directory:

`cd backend`

Create and activate a virtual environment:

**macOS / Linux:**

```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows:**

```bash
python -m venv venv
venv\Scripts\activate
```

Install backend dependencies:

`pip install django djangorestframework pandas scikit-learn django-cors-headers`

Run database migrations:

`python manage.py migrate`

Start the Django development server:

`python manage.py runserver`

The backend will be running at: `http://127.0.0.1:8000/`

---

## Frontend Setup (React + Vite)

Open a new terminal and navigate to the frontend directory:

`cd frontend`

Install frontend dependencies:

`npm install`

Start the Vite development server:

`npm run dev`

The frontend will be available at: `http://localhost:5173/`

<img width="1223" height="910" alt="MentorMatcher" src="https://github.com/user-attachments/assets/7d24dac6-483e-4e1d-8f6d-88aa8a682ca2" />
