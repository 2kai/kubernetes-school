package main

import (
    "2kai.ru/utils"
    "os"
    "time"
)

func main() {
    for {
        os.WriteFile("/opt/timestamps/timestamp.txt", []byte(time.Now().Format(utils.TIME_FORMAT)), 0644)

        time.Sleep(5 * time.Second)
    }
}
