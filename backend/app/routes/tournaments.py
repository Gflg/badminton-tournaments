from typing import List
from sqlalchemy import select
import models
import schemas
from fastapi import APIRouter, Depends, HTTPException, UploadFile, Form, File
from sqlalchemy.orm import Session
from database import get_db, engine
from datetime import datetime
from uuid import uuid4
import os

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

models.Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/tournaments", tags=["Tournaments"])


@router.post("/", status_code=201)
async def create_tournament(
    # Campos obrigatórios como Form
    name: str = Form(...),
    description: str = Form(...),
    local: str = Form(...),
    start_date: str = Form(...),
    end_date: str = Form(None),
    host: str = Form(...),
    host_contact: str = Form(...),

    # Campos booleanos
    sub13_simple: bool = Form(False),
    sub15_simple: bool = Form(False),
    sub17_simple: bool = Form(False),
    principal_simple: bool = Form(False),
    cat35_simple: bool = Form(False),
    cat45_simple: bool = Form(False),
    cat55_simple: bool = Form(False),
    cat60_simple: bool = Form(False),

    sub13_doubles: bool = Form(False),
    sub15_doubles: bool = Form(False),
    sub17_doubles: bool = Form(False),
    principal_doubles: bool = Form(False),
    cat35_doubles: bool = Form(False),
    cat45_doubles: bool = Form(False),
    cat55_doubles: bool = Form(False),
    cat60_doubles: bool = Form(False),

    picture: UploadFile = File(None),
    db: Session = Depends(get_db)):

    foto_path = None
    if picture:
        filename = f"{uuid4().hex}_{picture.filename}"
        foto_path = os.path.join(UPLOAD_DIR, filename)
        with open(foto_path, "wb") as f:
            f.write(await picture.read())
    
    tournament = schemas.TournamentCreate(
        name=name,
        description=description,
        local=local,
        start_date=datetime.fromisoformat(start_date),
        end_date=datetime.fromisoformat(end_date) if end_date else None,
        picture=foto_path,
        host=host,
        host_contact=host_contact,
        sub13_simple=sub13_simple,
        sub15_simple=sub15_simple,
        sub17_simple=sub17_simple,
        principal_simple=principal_simple,
        cat35_simple=cat35_simple,
        cat45_simple=cat45_simple,
        cat55_simple=cat55_simple,
        cat60_simple=cat60_simple,
        sub13_doubles=sub13_doubles,
        sub15_doubles=sub15_doubles,
        sub17_doubles=sub17_doubles,
        principal_doubles=principal_doubles,
        cat35_doubles=cat35_doubles,
        cat45_doubles=cat45_doubles,
        cat55_doubles=cat55_doubles,
        cat60_doubles=cat60_doubles
    )

    categories = [
        tournament.sub13_simple, tournament.sub15_simple, tournament.sub17_simple, tournament.principal_simple,
        tournament.cat35_simple, tournament.cat45_simple, tournament.cat55_simple, tournament.cat60_simple,
        tournament.sub13_doubles, tournament.sub15_doubles, tournament.sub17_doubles, tournament.principal_doubles,
        tournament.cat35_doubles, tournament.cat45_doubles, tournament.cat55_doubles, tournament.cat60_doubles
    ]

    if not any(categories):
        raise HTTPException(status_code=400, detail="You must choose, at least, a category.")

    new = models.Tournament(**tournament.dict())
    db.add(new)
    db.commit()
    db.refresh(new)
    return {"message": "Tournament created successfully", "id": new.id}


@router.get('/{id}')
async def get_tournament_by_id(id: int, db: Session = Depends(get_db)) -> schemas.TournamentOutput:
    tournament = db.query(models.Tournament).filter(models.Tournament.id == id).first()
    if not tournament:
        raise HTTPException(status_code=404, detail="Tournament not found")
    return tournament


@router.get("/")
async def get_tournaments(
        skip: int,
        limit: int,
        db: Session = Depends(get_db)) -> List[schemas.TournamentOutput]:
    '''
    Endpoint used to retrieve many tournaments, according to the pagination,
    sorting and filtering settings. This endpoint can't return more than
    200 registers by default. This value can be changed in .env file.
    '''
    if limit > 200:
        raise HTTPException(
            status_code=422,
            detail="The number of registers in a page cannot exceed 200."
        )

    tournaments = db.query(models.Tournament).offset(skip).limit(limit).all()

    response = []

    for tournament in tournaments:
        response.append(tournament.__dict__)

    return response


@router.put("/{id}")
async def update_tournament_by_id(
    id: int,
    tournament_data: schemas.TournamentCreate,
    db: Session = Depends(get_db)) -> schemas.TournamentOutput:

    tournament = db.query(models.Tournament).filter(models.Tournament.id == id).first()
    if not tournament:
        raise HTTPException(status_code=404, detail="Tournament not found")
    
    for field, value in tournament_data.model_dump().items():
        setattr(tournament, field, value)
    
    db.add(tournament)
    db.commit()

    return tournament