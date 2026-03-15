from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, SavedJob, FollowedCompany, Job, Company
from ..schemas import SaveJobRequest, FollowCompanyRequest
from ..auth import get_current_user

router = APIRouter(prefix="/api/user", tags=["user"])

@router.get("/dashboard")
def get_dashboard(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    saved_jobs = db.query(Job).join(SavedJob).filter(SavedJob.user_id == current_user.id).all()
    followed_companies = db.query(Company).join(FollowedCompany).filter(FollowedCompany.user_id == current_user.id).all()
    return {
        "saved_jobs": saved_jobs,
        "followed_companies": followed_companies
    }

@router.post("/save-job")
def save_job(req: SaveJobRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    existing = db.query(SavedJob).filter_by(user_id=current_user.id, job_id=req.job_id).first()
    if not existing:
        db.add(SavedJob(user_id=current_user.id, job_id=req.job_id))
        db.commit()
    return {"status": "success"}

@router.post("/follow-company")
def follow_company(req: FollowCompanyRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    existing = db.query(FollowedCompany).filter_by(user_id=current_user.id, company_id=req.company_id).first()
    if not existing:
        db.add(FollowedCompany(user_id=current_user.id, company_id=req.company_id))
        db.commit()
    return {"status": "success"}
