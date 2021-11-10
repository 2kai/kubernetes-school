from fastapi import FastAPI

app = FastAPI()

ping = -1


@app.get("/")
def index():
    global ping
    ping += 1

    f = open("/opt/pings/pings.txt", "w")
    f.write(str(ping))
    f.close()

    return ping
