import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to JobHub API"}

def test_jobs_api():
    response = client.get("/api/jobs")
    assert response.status_code == 200
    assert "items" in response.json()
