from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, Job, Company, News
from ..auth import get_admin_user
import time

router = APIRouter(prefix="/api/admin", tags=["admin"])

@router.get("/stats")
def get_stats(admin: User = Depends(get_admin_user), db: Session = Depends(get_db)):
    return {
        "jobs": db.query(Job).count(),
        "users": db.query(User).count(),
        "companies": db.query(Company).count(),
        "news": db.query(News).count()
    }

@router.get("/scrapers")
def get_scrapers(admin: User = Depends(get_admin_user)):
    return [
        {"id": "jobs_scraper", "name": "Global Jobs Scraper", "status": "Enabled", "interval": "60 minutes", "lastRun": "2026-03-15T12:00:00Z", "running": False},
        {"id": "news_scraper", "name": "Tech News Scraper", "status": "Enabled", "interval": "120 minutes", "lastRun": "2026-03-15T11:30:00Z", "running": False}
    ]

@router.post("/scraper/run")
def trigger_scraper(scraper_id: str, background_tasks: BackgroundTasks, admin: User = Depends(get_admin_user)):
    # Trigger celery task or background task here
    def dummy_task():
        time.sleep(2)
        print(f"Scraper {scraper_id} finished")
        
    background_tasks.add_task(dummy_task)
    return {"status": "triggered", "scraper_id": scraper_id}

@router.post("/scraper/toggle")
def toggle_scraper(scraper_id: str, admin: User = Depends(get_admin_user)):
    # Toggle logic (e.g., updating database config)
    return {"status": "toggled", "scraper_id": scraper_id}
