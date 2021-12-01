from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from src import models
from src.database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get('/')
def index(db: Session = Depends(get_db)):
    return get_ping(db)


@app.get('/increase-and-get')
def increase_and_get(db: Session = Depends(get_db)):
    return get_ping(db, True)


def get_ping(db: Session, increase: bool = False):
    ping = db.query(models.Setting).filter(models.Setting.key == 'ping').first()

    if ping is None:
        ping = models.Setting(key='ping', value=0)
        db.add(ping)
        db.commit()

    if increase:
        ping.value = int(ping.value) + 1
        db.commit()

    return int(ping.value)
