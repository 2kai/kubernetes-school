package utils

import (
    "crypto/sha1"
    "math/rand"
    "strconv"
    "time"
)

const TIME_FORMAT = "2006-01-02T15:04:05-0700"

func GenerateRandomHash() []byte {
    rand.Seed(time.Now().UnixNano())

    hash := sha1.New()
    hash.Write([]byte(strconv.Itoa(rand.Int())))

    return hash.Sum(nil)
}
