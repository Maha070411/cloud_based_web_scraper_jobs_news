import os
import bcrypt
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models import Company, Job, News, User

def hash_password(password: str) -> str:
    """Hash password using bcrypt directly to avoid passlib compatibility issues."""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def seed_db():
    # Drop all tables to completely reset before seeding
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    print("Seeding database with fresh data...")
    
    # --- Users ---
    users_data = [
        {"name": "John Doe", "email": "john@example.com", "password": "password", "role": "admin"},
        {"name": "Jane Smith", "email": "jane@example.com", "password": "password", "role": "user"},
        {"name": "Bob Wilson", "email": "bob@example.com", "password": "password", "role": "user"},
    ]
    
    for u in users_data:
        user = User(
            name=u["name"],
            email=u["email"],
            password_hash=hash_password(u["password"]),
            role=u["role"]
        )
        db.add(user)
    db.commit()
    print(f"  [OK] Created {len(users_data)} users (admin: john@example.com / password)")
    
    # --- Companies ---
    companies_data = [
        {"name": "Google", "industry": "Technology", "website": "google.com", "logo": "G"},
        {"name": "Amazon", "industry": "E-commerce", "website": "amazon.com", "logo": "A"},
        {"name": "Microsoft", "industry": "Technology", "website": "microsoft.com", "logo": "M"},
        {"name": "Apple", "industry": "Technology", "website": "apple.com", "logo": "A"},
        {"name": "Meta", "industry": "Social Media", "website": "meta.com", "logo": "M"},
        {"name": "Netflix", "industry": "Entertainment", "website": "netflix.com", "logo": "N"},
    ]
    
    companies = []
    for c in companies_data:
        comp = Company(**c)
        db.add(comp)
        companies.append(comp)
    db.commit()
    print(f"  [OK] Created {len(companies_data)} companies")
    
    # --- Jobs ---
    jobs_data = [
        {"title": "Senior React Developer", "company_id": companies[0].id, "location": "Remote", "salary_min": 120000, "salary_max": 160000, "experience_level": "Senior", "apply_url": "https://google.com/careers", "description": "Build scalable web applications with React and modern frontend technologies."},
        {"title": "Python Backend Engineer", "company_id": companies[1].id, "location": "Seattle, WA", "salary_min": 130000, "salary_max": 180000, "experience_level": "Mid", "apply_url": "https://amazon.jobs", "description": "Design microservices using FastAPI and AWS cloud infrastructure."},
        {"title": "DevOps Specialist", "company_id": companies[2].id, "location": "Redmond, WA", "salary_min": 110000, "salary_max": 150000, "experience_level": "Mid-Senior", "apply_url": "https://careers.microsoft.com", "description": "Manage Kubernetes clusters and CI/CD pipelines at scale."},
        {"title": "iOS Engineer", "company_id": companies[3].id, "location": "Cupertino, CA", "salary_min": 140000, "salary_max": 200000, "experience_level": "Senior", "apply_url": "https://apple.com/careers", "description": "Develop cutting-edge iOS applications using Swift and SwiftUI."},
        {"title": "ML Research Scientist", "company_id": companies[4].id, "location": "Menlo Park, CA", "salary_min": 160000, "salary_max": 250000, "experience_level": "Senior", "apply_url": "https://meta.com/careers", "description": "Research and develop novel machine learning models for recommendation systems."},
        {"title": "Full Stack Developer", "company_id": companies[5].id, "location": "Los Angeles, CA", "salary_min": 100000, "salary_max": 140000, "experience_level": "Mid", "apply_url": "https://netflix.com/jobs", "description": "Build and maintain Netflix's streaming platform using React and Node.js."},
        {"title": "Data Engineer", "company_id": companies[0].id, "location": "New York, NY", "salary_min": 125000, "salary_max": 170000, "experience_level": "Mid", "apply_url": "https://google.com/careers", "description": "Design and build data pipelines processing petabytes of data daily."},
        {"title": "Cloud Architect", "company_id": companies[1].id, "location": "Remote", "salary_min": 150000, "salary_max": 220000, "experience_level": "Senior", "apply_url": "https://amazon.jobs", "description": "Architect cloud-native solutions on AWS for enterprise customers."},
    ]
    
    for j in jobs_data:
        db.add(Job(**j))
    db.commit()
    print(f"  [OK] Created {len(jobs_data)} job postings")
    
    # --- News ---
    news_data = [
        {"title": "AI Startups Are Hiring Vigorously in 2026", "source": "TechCrunch", "category": "Hiring", "summary": "Despite broader market shifts, artificial intelligence companies continue to expand their engineering teams at record speeds.", "url": "https://techcrunch.com"},
        {"title": "The Rise of Rust in Backend Web Development", "source": "The Verge", "category": "Tech", "summary": "More companies are adopting Rust for performance-critical backend services, shifting away from Go and C++ in specific domains.", "url": "https://theverge.com"},
        {"title": "Remote Work Trends Stabilize Post-2025", "source": "Bloomberg", "category": "Trends", "summary": "Analysis of millions of job posts shows remote work stabilizing at approximately 30% of all professional tech roles.", "url": "https://bloomberg.com"},
        {"title": "Big Tech Resumes Hiring After Lean Year", "source": "Business Insider", "category": "Market", "summary": "Top technology firms are opening new roles across AI, cloud infrastructure, and cybersecurity after a year of cautious spending.", "url": "https://businessinsider.com"},
    ]
    
    for n in news_data:
        db.add(News(**n))
    db.commit()
    print(f"  [OK] Created {len(news_data)} news articles")
    
    db.close()
    print("\n[DONE] Seeding complete!")
    print("   Admin login: john@example.com / password")
    print("   User login:  jane@example.com / password")

if __name__ == "__main__":
    seed_db()
