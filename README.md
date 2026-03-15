# JobHub - Cloud-Based Scalable Web Scraper with Trend Dashboard

JobHub is a full-stack production-grade web application that collects job postings and tech industry news, stores them in a MySQL database, and displays analytics dashboards for users and administrators.

![JobHub Login](https://img.shields.io/badge/Status-Production%20Ready-brightgreen) ![React](https://img.shields.io/badge/React-18.2-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green) ![MySQL](https://img.shields.io/badge/MySQL-8.0-orange) ![Docker](https://img.shields.io/badge/Docker-Ready-blue)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Default Credentials](#default-credentials)
- [Screenshots](#screenshots)
- [Docker Deployment](#docker-deployment)
- [Testing](#testing)

---

## Features

### User Features
- Browse and search job postings with filters (keyword, company, location, experience level)
- View detailed job descriptions and apply via external links
- Read latest tech industry news with category filtering
- Save jobs and follow companies
- Personal dashboard to track saved jobs and followed companies
- JWT-based authentication (Register / Login / Logout)

### Admin Features
- System statistics dashboard (total jobs, users, companies, news)
- Scraper management controls (enable/disable/trigger scrapers)
- Analytics charts and data visualizations

### System Features
- Automated web scraping with scheduling (Celery + Redis)
- RESTful API with FastAPI
- Responsive UI with TailwindCSS
- Docker containerization for deployment
- Database seeding with sample data

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React.js** | 18.2 | UI library for building component-based interfaces |
| **Vite** | 5.4 | Fast build tool and development server |
| **React Router** | 6.x | Client-side routing and navigation |
| **Axios** | 1.6 | HTTP client for API requests |
| **Recharts** | 2.x | Data visualization and analytics charts |
| **Chart.js** | 4.x | Additional charting library |
| **react-chartjs-2** | 5.x | React wrapper for Chart.js |
| **TailwindCSS** | 3.x | Utility-first CSS framework for styling |
| **Lucide React** | 0.x | Modern icon library |
| **Jest** | 29.x | JavaScript testing framework |
| **React Testing Library** | 14.x | React component testing utilities |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| **Python** | 3.11+ | Backend programming language |
| **FastAPI** | 0.109 | High-performance async web framework |
| **Uvicorn** | 0.27 | ASGI server for FastAPI |
| **SQLAlchemy** | 2.0 | ORM for database operations |
| **PyMySQL** | 1.1 | MySQL database driver |
| **bcrypt** | 4.x | Password hashing for authentication |
| **python-jose** | 3.3 | JWT token generation and validation |
| **Pydantic** | 2.6 | Data validation and serialization |
| **pydantic-settings** | 2.2 | Configuration management |
| **python-dotenv** | 1.0 | Environment variable management |
| **python-multipart** | 0.0.9 | Form data parsing |

### Web Scraping

| Technology | Version | Purpose |
|---|---|---|
| **BeautifulSoup4** | 4.12 | HTML/XML parsing for web scraping |
| **Requests** | 2.31 | HTTP library for fetching web pages |
| **Scrapy** | 2.11 | Advanced web crawling framework |

### Automation / Scheduling

| Technology | Version | Purpose |
|---|---|---|
| **Celery** | 5.3 | Distributed task queue for background jobs |
| **Redis** | 5.0 | Message broker for Celery task scheduling |

### Database

| Technology | Version | Purpose |
|---|---|---|
| **MySQL** | 8.0 | Relational database for persistent storage |

### DevOps & Deployment

| Technology | Version | Purpose |
|---|---|---|
| **Docker** | Latest | Containerization platform |
| **Docker Compose** | v2 | Multi-container orchestration |

### Testing

| Technology | Version | Purpose |
|---|---|---|
| **PyTest** | 8.0 | Python backend testing framework |
| **Jest** | 29.x | JavaScript frontend testing framework |
| **React Testing Library** | 14.x | React component testing |

### Security

| Technology | Purpose |
|---|---|
| **JWT (JSON Web Tokens)** | Stateless authentication |
| **bcrypt** | Secure password hashing |
| **CORS Middleware** | Cross-Origin Resource Sharing protection |

---

## Project Structure

```
cloud_based_web_scraper_jobs_news/
|
|-- backend/                        # FastAPI Backend
|   |-- app/
|   |   |-- __init__.py
|   |   |-- main.py                 # FastAPI application entry point
|   |   |-- config.py               # Application configuration (Pydantic Settings)
|   |   |-- database.py             # SQLAlchemy engine & session setup
|   |   |-- models.py               # Database ORM models
|   |   |-- schemas.py              # Pydantic request/response schemas
|   |   |-- auth.py                 # Authentication utilities (JWT, bcrypt)
|   |   |-- routers/
|   |   |   |-- __init__.py
|   |   |   |-- auth.py             # Auth endpoints (register, login, me)
|   |   |   |-- jobs.py             # Job CRUD endpoints
|   |   |   |-- news.py             # News endpoints
|   |   |   |-- user.py             # User dashboard endpoints
|   |   |   |-- admin.py            # Admin dashboard & scraper control
|   |   |-- scrapers/
|   |   |   |-- __init__.py
|   |   |   |-- linkedin_scraper.py # LinkedIn job scraper
|   |   |   |-- news_scraper.py     # Tech news scraper
|   |   |-- scheduler/
|   |       |-- __init__.py
|   |       |-- scheduler.py        # Celery task scheduling
|   |-- tests/
|   |   |-- test_main.py            # Backend API tests
|   |-- .env                        # Environment variables
|   |-- requirements.txt            # Python dependencies
|   |-- seed.py                     # Database seeder script
|   |-- create_db.py                # Database creation helper
|   |-- Dockerfile                  # Backend Docker image
|
|-- frontend/                       # React Frontend
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |   |-- Navbar.jsx          # Navigation bar component
|   |   |-- context/
|   |   |   |-- AuthContext.jsx     # Authentication context provider
|   |   |-- pages/
|   |   |   |-- Home.jsx            # Home page with stats & companies
|   |   |   |-- Login.jsx           # Login page (split-screen design)
|   |   |   |-- Register.jsx        # Registration page
|   |   |   |-- Jobs.jsx            # Job explorer with search & filters
|   |   |   |-- JobDetail.jsx       # Individual job detail view
|   |   |   |-- News.jsx            # Tech news feed
|   |   |   |-- UserDashboard.jsx   # User dashboard (saved jobs, companies)
|   |   |   |-- AdminDashboard.jsx  # Admin panel (stats, scraper controls)
|   |   |-- routes/
|   |   |   |-- ProtectedRoute.jsx  # Route guard for auth & admin
|   |   |-- services/
|   |   |   |-- api.js              # Axios API client with JWT interceptor
|   |   |-- App.jsx                 # Main app with routing
|   |   |-- main.jsx                # React entry point
|   |   |-- index.css               # Global styles & Tailwind directives
|   |-- index.html                  # HTML entry point
|   |-- vite.config.js              # Vite configuration
|   |-- tailwind.config.js          # TailwindCSS configuration
|   |-- postcss.config.js           # PostCSS configuration
|   |-- jest.config.cjs             # Jest test configuration
|   |-- package.json                # Node.js dependencies
|   |-- Dockerfile                  # Frontend Docker image
|
|-- docker-compose.yml              # Multi-container orchestration
|-- README.md                       # Project documentation
```

---

## Prerequisites

- **Node.js** >= 18.x
- **Python** >= 3.11
- **MySQL** >= 8.0 (running locally or via Docker)
- **Docker & Docker Compose** (optional, for containerized deployment)

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Maha070411/cloud_based_web_scraper_jobs_news.git
cd cloud_based_web_scraper_jobs_news
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
pip install bcrypt

# Configure environment variables
# Edit .env file with your MySQL credentials:
#   DB_USER=root
#   DB_PASSWORD=your_password
#   DB_HOST=127.0.0.1
#   DB_PORT=3306
#   DB_NAME=web_scraper

# Create the database
python create_db.py

# Seed the database with sample data
python seed.py
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
```

---

## Running the Application

### Start Backend Server

```bash
cd backend
.\venv\Scripts\activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at: **http://localhost:8000**
API Documentation (Swagger UI): **http://localhost:8000/docs**

### Start Frontend Server

```bash
cd frontend
npm run dev
```

The frontend will be available at: **http://localhost:5173**

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |
| GET | `/api/auth/me` | Get current user profile |

### Jobs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs/` | List jobs (with search, filter, pagination) |
| GET | `/api/jobs/{id}` | Get job details |
| GET | `/api/jobs/company/{id}` | Get jobs by company |

### News
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/news/` | List news articles |
| GET | `/api/news/{id}` | Get news detail |

### User Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/dashboard` | Get user's saved jobs & followed companies |
| POST | `/api/user/save-job` | Save a job |
| POST | `/api/user/follow-company` | Follow a company |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Get system statistics |
| GET | `/api/admin/scrapers` | List configured scrapers |
| POST | `/api/admin/scraper/run` | Trigger a scraper |
| POST | `/api/admin/scraper/toggle` | Enable/disable a scraper |

### General
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats/summary` | Get public stats (jobs, companies, news counts) |
| GET | `/api/companies/top` | Get top hiring companies |

---

## Default Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | john@example.com | password |
| **User** | jane@example.com | password |
| **User** | bob@example.com | password |

> The first registered user is automatically assigned the **admin** role.

---

## Docker Deployment

### Using Docker Compose

```bash
# Build and start all services
docker-compose up -d --build

# Services started:
#   - MySQL (port 3306)
#   - Redis (port 6379)
#   - FastAPI Backend (port 8000)
#   - Celery Worker
#   - Celery Beat Scheduler
#   - React Frontend (port 5173)
```

### Docker Services

| Service | Port | Description |
|---------|------|-------------|
| `db` | 3306 | MySQL 8.0 database |
| `redis` | 6379 | Redis message broker |
| `backend` | 8000 | FastAPI application |
| `celery_worker` | - | Background task processor |
| `celery_beat` | - | Periodic task scheduler |
| `frontend` | 5173 | React development server |

---

## Testing

### Backend Tests

```bash
cd backend
.\venv\Scripts\activate
pytest tests/
```

### Frontend Tests

```bash
cd frontend
npm test
```

---

## Database Schema

### Tables

| Table | Description |
|-------|-------------|
| `users` | User accounts with roles (admin/user) |
| `companies` | Company profiles (name, industry, website) |
| `jobs` | Job postings linked to companies |
| `news` | Tech industry news articles |
| `saved_jobs` | User-job bookmarks |
| `followed_companies` | User-company follows |

---

## Environment Variables

### Backend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_USER` | MySQL username | root |
| `DB_PASSWORD` | MySQL password | - |
| `DB_HOST` | MySQL host | 127.0.0.1 |
| `DB_PORT` | MySQL port | 3306 |
| `DB_NAME` | Database name | web_scraper |
| `SECRET_KEY` | JWT signing key | - |
| `REDIS_URL` | Redis connection URL | redis://localhost:6379/0 |

### Frontend

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | http://localhost:8000 |

---

## License

This project is developed as part of a training exercise.

---

## Author

**Maha** - [GitHub](https://github.com/Maha070411)
