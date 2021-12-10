from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from src import models
from src.database import engine, SessionLocal

try:
    models.Base.metadata.create_all(bind=engine)
except Exception:
    # Leave it for k8s
    pass

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app.add_route('/', lambda req: JSONResponse(), ['GET'])


@app.get('/healthz')
def healthz(db: Session = Depends(get_db)):
    db.get_bind().connect()
    return JSONResponse()


@app.get('/pingpong')
def index(db: Session = Depends(get_db)):
    return get_ping(db)


@app.get('/pingpong/increase-and-get')
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
