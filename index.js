const express = require('express');
const db = require('./data/db.js');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Welcome to Hobbiton');
});

/* 
When the client makes a GET request to /api/users:

    If there's an error in retrieving the users from the database:
        respond with HTTP status code 500.
        return the following JSON object: { errorMessage: "The users information could not be retrieved." }.

*/
server.get('/api/users', (req, res) => {
    console.log('Requesting users');
    db.find()
        .then(users => {
            console.log(users);
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "The users' information could not be retrieved." });
        });
})

/* 
When the client makes a GET request to /api/users/:id:

    If the user with the specified id is not found:
        respond with HTTP status code 404 (Not Found).
        return the following JSON object: { message: "The user with the specified ID does not exist." }.

    If there's an error in retrieving the user from the database:
        respond with HTTP status code 500.
        return the following JSON object: { errorMessage: "The user information could not be retrieved." }.

*/
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    console.log(`Getting user with id ${id}`);
    db.findById(id)
        .then(user => {
            console.log(user);
            if (!user) {
                res.status(500).json({ message: "The user with the specified ID does not exist." });
            }
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "The user information could not be retrieved." });
        });
});




const port = 8000;
server.listen(port, () => console.log(`API up and running on port ${port}`));
