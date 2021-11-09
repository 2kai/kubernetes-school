// Exercise 1.07
package main

import (
    "2kai.ru/utils"
    "fmt"
    "net/http"
    "time"
)

func kiittiHandler(random_hex []byte) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Kiitti: %s: %x\n", time.Now().Format(utils.TIME_FORMAT), random_hex)

        fmt.Printf("%s: GET /\n", time.Now().Format(utils.TIME_FORMAT))
    }
}

func main() {
    random_hex := utils.GenerateRandomHash()

    http.HandleFunc("/", kiittiHandler(random_hex))
    go http.ListenAndServe(":8090", nil)

    for {
        fmt.Printf("%s: %x\n", time.Now().Format(utils.TIME_FORMAT), random_hex)

        time.Sleep(5 * time.Second)
    }
}
