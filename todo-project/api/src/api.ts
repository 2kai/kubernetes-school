import * as fs from 'fs';
import fetch from 'node-fetch';
import Database from './database';

const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;

const dailyImageFilename = '/opt/src/daily/daily.jpg';

const database = new Database();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send();
});

app.get('/api/todos', async function (req, res) {
    res.json(await database.getTodos());
});

app.post('/api/todos', async function (req, res) {
    await database.addTodo(req.body.todo);
    res.json(await database.getTodos());
});

app.get('/api/daily', async function (req, res) {
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