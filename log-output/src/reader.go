package main

import (
    "2kai.ru/utils"
    "github.com/joho/godotenv"
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
    "os"
)

func kiittiHandler(random_hex []byte) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        simple_timestamp, _ := os.ReadFile("/opt/timestamps/timestamp.txt")
        response, _ := http.Get("http://ping-pong-svc")

        defer response.Body.Close()

        persistent_pings, _ := ioutil.ReadAll(response.Body)

        fmt.Fprintf(w, "%s\n", os.Getenv("MESSAGE"))
        fmt.Fprintf(w, "Kiitti: timestamp from the file from Simple Volume is %s, hash is %x\n", simple_timestamp, random_hex)
        fmt.Fprintf(w, "Ping / Pongs: %s\n", persistent_pings)
    }
}

func main() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    http.HandleFunc("/", kiittiHandler(utils.GenerateRandomHash()))
    http.ListenAndServe(":8091", nil)
}
