from datetime import datetime, UTC
from sqlalchemy import Column, Integer, String, Enum, DateTime, ForeignKey, Text, Float
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True, index=True)
    password_hash = Column(String(255))
    role = Column(String(20), default="user") # user or admin
    created_at = Column(DateTime, default=lambda: datetime.now(UTC))

class Company(Base):
    __tablename__ = "companies"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True)
    industry = Column(String(100), nullable=True)
    website = Column(String(255), nullable=True)
    logo = Column(String(255), nullable=True)
    
class Job(Base):
    __tablename__ = "jobs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    location = Column(String(255), index=True)
    salary_min = Column(Float, nullable=True)
    salary_max = Column(Float, nullable=True)
    experience_level = Column(String(50), nullable=True)
    description = Column(Text)
    apply_url = Column(String(500), nullable=True)
    posted_date = Column(DateTime, default=lambda: datetime.now(UTC))
    created_at = Column(DateTime, default=lambda: datetime.now(UTC))

    company = relationship("Company")

class News(Base):
    __tablename__ = "news"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    source = Column(String(100))
    category = Column(String(50), index=True)
    summary = Column(Text)
    content = Column(Text, nullable=True)
    url = Column(String(500))
    published_date = Column(DateTime, default=lambda: datetime.now(UTC))

class SavedJob(Base):
    __tablename__ = "saved_jobs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    job_id = Column(Integer, ForeignKey("jobs.id"))

class FollowedCompany(Base):
    __tablename__ = "followed_companies"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    company_id = Column(Integer, ForeignKey("companies.id"))
