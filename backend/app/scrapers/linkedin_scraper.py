from bs4 import BeautifulSoup
import requests
from ..database import SessionLocal
from ..models import Job, Company

class DummyLinkedInScraper:
    def __init__(self):
        self.headers = {"User-Agent": "Mozilla/5.0"}
        
    def perform_scrape(self):
        # Dummy scraping simulation
        db = SessionLocal()
        company = db.query(Company).filter(Company.name == "LinkedIn Mock").first()
        if not company:
            company = Company(name="LinkedIn Mock", industry="Tech", website="linkedin.com", logo="L")
            db.add(company)
            db.commit()
            
        new_job = Job(
            title="SDE 2 Mock Scraped",
            company_id=company.id,
            location="Remote",
            salary_min=140000,
            salary_max=190000,
            experience_level="Mid",
            description="Scraped from mock. Needs React and FastAPI.",
            apply_url="https://linkedin.com/apply"
        )
        db.add(new_job)
        db.commit()
        db.close()
        return "Scraped 1 dummy job"
