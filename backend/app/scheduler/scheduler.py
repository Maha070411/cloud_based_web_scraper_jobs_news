from celery import Celery
import os
from datetime import timedelta
from ..scrapers.linkedin_scraper import DummyLinkedInScraper
from ..scrapers.news_scraper import TechCrunchScraper

redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")
celery_app = Celery("scheduler", broker=redis_url, backend=redis_url)

celery_app.conf.beat_schedule = {
    'scrape-jobs-every-hour': {
        'task': 'app.scheduler.scheduler.job_scraper_task',
        'schedule': timedelta(minutes=60),
    },
    'scrape-news-every-2-hours': {
        'task': 'app.scheduler.scheduler.news_scraper_task',
        'schedule': timedelta(minutes=120),
    },
}

@celery_app.task
def job_scraper_task():
    scraper = DummyLinkedInScraper()
    res = scraper.perform_scrape()
    return res

@celery_app.task
def news_scraper_task():
    scraper = TechCrunchScraper()
    res = scraper.perform_scrape()
    return res
