from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Tournament(Base):
    __tablename__ = 'tournaments'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    local = Column(String, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=True)
    picture = Column(String, nullable=True)
    host = Column(String, nullable=False)
    host_contact = Column(String, nullable=False)

    # Categorias - simple
    sub13_simple = Column(Boolean, default=False)
    sub15_simple = Column(Boolean, default=False)
    sub17_simple = Column(Boolean, default=False)
    principal_simple = Column(Boolean, default=False)
    cat35_simple = Column(Boolean, default=False)
    cat45_simple = Column(Boolean, default=False)
    cat55_simple = Column(Boolean, default=False)
    cat60_simple = Column(Boolean, default=False)

    # Categorias - doubles
    sub13_doubles = Column(Boolean, default=False)
    sub15_doubles = Column(Boolean, default=False)
    sub17_doubles = Column(Boolean, default=False)
    principal_doubles = Column(Boolean, default=False)
    cat35_doubles = Column(Boolean, default=False)
    cat45_doubles = Column(Boolean, default=False)
    cat55_doubles = Column(Boolean, default=False)
    cat60_doubles = Column(Boolean, default=False)
