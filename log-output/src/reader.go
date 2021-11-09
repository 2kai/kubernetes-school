package main

import (
    "2kai.ru/utils"
    "fmt"
    "net/http"
    "os"
)

func kiittiHandler(random_hex []byte) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        timestamp, _ := os.ReadFile("/opt/timestamps/timestamp.txt")
        fmt.Fprintf(w, "Kiitti: timestamp from the file is %s, hash is %x\n", timestamp, random_hex)
    }
}

func main() {
    http.HandleFunc("/", kiittiHandler(utils.GenerateRandomHash()))
    http.ListenAndServe(":8091", nil)
}
