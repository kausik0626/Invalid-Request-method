const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

let invalidRequestsCount = 0;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Task 1: Signup endpoint to receive user details and store them in users.txt
app.post('/signup', (req, res) => {
    const { name, gender, age } = req.body;

    // Storing user details in users.txt
    fs.appendFile('users.txt', `Name: ${name}, Gender: ${gender}, Age: ${age}\n`, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send('Signup successful!');
        }
    });
});

// Task 2: Handling invalid GET requests to /signup endpoint
app.get('/signup', (req, res) => {
    invalidRequestsCount++;

    // Returning HTML content for invalid GET request
    res.send(`<h1>Invalid request method - ${invalidRequestsCount}</h1>`);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
