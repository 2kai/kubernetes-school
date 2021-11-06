package main

import (
    "crypto/sha1"
    "fmt"
    "math/rand"
    "net/http"
    "strconv"
    "time"
)

const TIME_FORMAT = "2006-01-02T15:04:05-0700"

func kiittiHandler(random_hex []byte) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Kiitti: %s: %x\n", time.Now().Format(TIME_FORMAT), random_hex)

        fmt.Printf("%s: GET /\n", time.Now().Format(TIME_FORMAT))
    }
}

func main() {
    rand.Seed(time.Now().UnixNano())

    hash := sha1.New()
    hash.Write([]byte(strconv.Itoa(rand.Int())))

    random_hex := hash.Sum(nil)

    http.HandleFunc("/", kiittiHandler(random_hex))
    go http.ListenAndServe(":8090", nil)

    for {
        fmt.Printf("%s: %x\n", time.Now().Format(TIME_FORMAT), random_hex)

        time.Sleep(5 * time.Second)
    }
}
