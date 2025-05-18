import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from routes import tournaments
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Badminton Tournaments API")

app.include_router(tournaments.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")