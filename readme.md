# Full-Stack Project Setup Guide

Welcome to the project! This guide will help you set up and run both the **frontend** and **backend** locally.

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (>=16) & **npm** (>=8) → [Download](https://nodejs.org/)
- **Python** (>=3.10) & **pip** → [Download](https://www.python.org/)
- **FastAPI** (for backend)
- **MySQL** (for database)

---

## Backend Setup (FastAPI + MySQL)

1. **Clone the repository:**
   git clone https://github.com/prajwal10s/CreditRating_POC.git
   cd backend

2. **Create a virtual environment:**

   python -m venv venv
   source venv/bin/activate # On macOS/Linux
   venv\Scripts\activate # On Windows

3. **Install dependencies:**

   pip install -r requirements.txt

4. **Set up environment variables:**

   - Copy the `example-env.txt` file and rename it to `.env`.
   - Update the database connection details inside `.env`:

5. **Run database migrations :**

   alembic upgrade head

6. **Start the FastAPI server:**

   uvicorn main:app --reload

---

## Frontend Setup (React + Vite)

1. **Install dependencies:**

   npm install

2. **Start the development server:**

   npm run dev

3. **Open the app in your browser:**
   - Open: [http://localhost:5173]

---

## Running Both Backend & Frontend Together

1. **Start the backend server:**
   uvicorn main:app --reload
2. **Start the frontend server:**
   npm run dev

Now you can start testing out the features
If you face any issues please check out below troubleshooting steps!

---

## Troubleshooting

- **Database Connection Error?** Ensure MySQL is running and the credentials in `.env` are correct.
- **Port Conflicts?** Change the ports in `.env` or modify FastAPI/Vite config.
- **Dependencies Issues?** Try running:

  rm -rf node_modules package-lock.json && npm install # Frontend
  pip install --force-reinstall -r requirements.txt # Backend

Feel free to create a github issuw if you face any issue
