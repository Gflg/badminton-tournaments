from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class TournamentCreate(BaseModel):
    name: str
    description: str
    local: str
    start_date: datetime
    end_date: Optional[datetime] = None
    picture: Optional[str] = None
    host: str
    host_contact: str

    # Categorias (booleans)
    sub13_simple: Optional[bool] = False
    sub15_simple: Optional[bool] = False
    sub17_simple: Optional[bool] = False
    principal_simple: Optional[bool] = False
    cat35_simple: Optional[bool] = False
    cat45_simple: Optional[bool] = False
    cat55_simple: Optional[bool] = False
    cat60_simple: Optional[bool] = False

    sub13_doubles: Optional[bool] = False
    sub15_doubles: Optional[bool] = False
    sub17_doubles: Optional[bool] = False
    principal_doubles: Optional[bool] = False
    cat35_doubles: Optional[bool] = False
    cat45_doubles: Optional[bool] = False
    cat55_doubles: Optional[bool] = False
    cat60_doubles: Optional[bool] = False


class TournamentOutput(TournamentCreate):
    id: int