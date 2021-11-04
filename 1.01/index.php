<?php

$hash = sha1(mt_rand());

while (true) {
    print date('c') . ': ' . $hash . PHP_EOL;

    sleep(5);
}
