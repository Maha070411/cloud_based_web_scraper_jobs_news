from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    role: str
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class CompanyBase(BaseModel):
    name: str
    industry: Optional[str] = None
    website: Optional[str] = None
    logo: Optional[str] = None

class CompanyResponse(CompanyBase):
    id: int
    class Config:
        from_attributes = True

class JobResponse(BaseModel):
    id: int
    title: str
    company_id: int
    location: str
    salary_min: Optional[float] = None
    salary_max: Optional[float] = None
    experience_level: Optional[str] = None
    description: str
    apply_url: Optional[str] = None
    posted_date: datetime
    company: Optional[CompanyResponse] = None
    class Config:
        from_attributes = True

class NewsResponse(BaseModel):
    id: int
    title: str
    source: str
    category: str
    summary: str
    content: Optional[str] = None
    url: str
    published_date: datetime
    class Config:
        from_attributes = True

class SaveJobRequest(BaseModel):
    job_id: int

class FollowCompanyRequest(BaseModel):
    company_id: int
