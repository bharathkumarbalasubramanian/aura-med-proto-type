import json
import os
from datetime import datetime
from typing import List, Optional

from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from pydantic import BaseModel, Field

# Constants
DB_FILE = os.path.join(os.path.dirname(__file__), 'database.json')

app = FastAPI(title="Aura Med Backend")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Models for request validation
class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str
    phone: Optional[str] = None
    age: Optional[str] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    profileImage: Optional[str] = None
    documents: Optional[List[str]] = []

class LoginRequest(BaseModel):
    email: str
    password: str

# Helper functions for database interaction
def get_db():
    try:
        with open(DB_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {"users": []}

def save_db(data):
    with open(DB_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

def remove_password(user):
    user_copy = dict(user)
    if "password" in user_copy:
        del user_copy["password"]
    return user_copy

@app.post("/api/auth/register", status_code=201)
def register(user_data: RegisterRequest):
    db = get_db()
    
    # Check if user already exists
    if any(u.get("email") == user_data.email for u in db["users"]):
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = pwd_context.hash(user_data.password)
    
    new_user = {
        "email": user_data.email,
        "password": hashed_password,
        "name": user_data.name,
        "phone": user_data.phone,
        "age": user_data.age,
        "gender": user_data.gender,
        "address": user_data.address,
        "profileImage": user_data.profileImage,
        "documents": user_data.documents,
        "role": "Patient",
        "createdAt": datetime.utcnow().isoformat()
    }

    db["users"].append(new_user)
    save_db(db)
    
    return {"message": "User registered successfully"}

@app.post("/api/auth/login")
def login(user_data: LoginRequest):
    db = get_db()
    user = next((u for u in db["users"] if u.get("email") == user_data.email), None)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    if not pwd_context.verify(user_data.password, user.get("password", "")):
        raise HTTPException(status_code=400, detail="Invalid credentials")
        
    return remove_password(user)

@app.get("/api/users/{email}")
def get_user(email: str):
    db = get_db()
    user = next((u for u in db["users"] if u.get("email") == email), None)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    return remove_password(user)

@app.get("/api/patients/assigned/{doctor_username}")
def get_assigned_patients(doctor_username: str):
    db = get_db()
    patients = [u for u in db["users"] if u.get("assigned_doctor") == doctor_username]
    return [remove_password(p) for p in patients]

if __name__ == "__main__":
    import uvicorn
    # Make sure to run it with poetry or venv
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)
