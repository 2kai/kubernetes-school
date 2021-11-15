import * as fs from 'fs';
import fetch from 'node-fetch';

const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;

const dailyImageFilename = '/opt/src/daily/daily.jpg';

app.use(express.json());
app.use(cors());

let todos = [];

app.get('/todos', function (req, res) {
    res.json(todos);
});

app.post('/todos', function (req, res) {
    todos.push(req.body.todo);
    res.json(todos);
});

app.get('/daily', async function (req, res) {
    let isFreshFileMissing = false;

    try {
        fs.accessSync(dailyImageFilename);

        let stats = fs.statSync(dailyImageFilename);

        if (stats.mtime.toDateString() === (new Date()).toDateString()) {
            console.log('File mtime is today - no need to download file again');
        } else {
            isFreshFileMissing = true;
        }
    } catch (e) {
        isFreshFileMissing = true;
    }

    if (isFreshFileMissing) {
        console.log('Downloading file');
        let res = await fetch('https://picsum.photos/1200');
        let imageResponse = await fetch(res.url);
        let arrayBuffer = await imageResponse.arrayBuffer();
        fs.writeFileSync(dailyImageFilename, Buffer.from(arrayBuffer));
    }

    res.sendFile(dailyImageFilename);
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
