from bs4 import BeautifulSoup
import requests
from ..database import SessionLocal
from ..models import News

class TechCrunchScraper:
    def __init__(self):
        self.headers = {"User-Agent": "Mozilla/5.0"}
        
    def perform_scrape(self):
        # Simulation
        db = SessionLocal()
        new_article = News(
            title="AI Revolutionizes Job Market (Mock)",
            source="TechCrunch",
            category="Trends",
            summary="Machine learning creates new opportunities across engineering.",
            content="Full content here.",
            url="https://techcrunch.com"
        )
        db.add(new_article)
        db.commit()
        db.close()
        return "Scraped 1 news article"
