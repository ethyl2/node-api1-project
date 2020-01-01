const express = require('express');
const db = require('./data/db.js');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Welcome to Hobbiton');
});

const port = 8000;
server.listen(port, () => console.log(`API up and running on port ${port}`));
