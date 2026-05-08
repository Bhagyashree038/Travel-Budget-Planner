# 🌍 Travel Budget Planner
## 📌 Project Overview
The Travel Budget Planner is a full-stack web application designed to help users plan trips, manage budgets, and track expenses efficiently.
The application provides an overview of all trips with total budget and expenses, and also allows users to view detailed information for each individual trip.

---

## 🚀 Features
- Create and manage trips
- Set budget for each trip
- Add and track expenses
- View total budget and expenses (dashboard overview)
- View detailed breakdown for each trip
- Responsive and user-friendly UI

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React JS
- Tailwind CSS

### 🔹 Backend
- Django (Python)
- Django REST Framework

### 🔹 Database
- SQLite (default Django database)

---

## 🏗️ Project Structure

```bash
Travel-Budget-Planner/
│
├── public/                     # Static files (React)
├── src/                        # React source code
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
├── travel_budget_backend/      # Django backend
│   ├── planner/               # Main app
│   │   ├── models.py          # Database models
│   │   ├── views.py           # API logic
│   │   ├── serializers.py     # Data conversion
│   │   ├── migrations/        # DB migrations
│   │
│   ├── travel_budget_backend/ # Project settings
│   │   ├── settings.py        # DB & config
│   │   ├── urls.py
│   │
│   └── manage.py
│
├── .gitignore
├── package.json               # Frontend dependencies
├── package-lock.json
├── requirements.txt          # Backend dependencies
├── README.md
├── index.html
├── tailwind.config.js
├── vite.config.js
```

---

## 🔄 Application Flow

1. User opens the application (Landing Page)
2. Navigates to Dashboard
3. Dashboard displays:
   - All trips
   - Total budget
   - Total expenses
4. User clicks on a specific trip
5. Detailed page shows:
   - Trip-specific expenses
   - Total spent
   - Remaining budget

---

## ⚙️ Installation & Setup

### 🔹 Clone the repository
```bash
git clone https://github.com/Bhagyashree038/Travel-Budget-Planner.git
cd Travel-Budget-Planner
```
Backend Setup (Django)
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Frontend Setup (React)
```bash
cd frontend
npm install
npm run dev
```
📊 Database
Uses SQLite as the database
Managed through Django ORM
Models define relationships between Trips and Expenses
