const express = require('express');
const app = express();
const port = 3000;

app.get('/', function (req, res) {
    res.json('Kiitti');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
