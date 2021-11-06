from fastapi import FastAPI

app = FastAPI()

ping = -1


@app.get("/")
def index():
    global ping
    ping += 1
    return ping
