const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

// Serve static files from the 'D:/Projects/Website' directory
app.use(express.static('D:/Projects/Website'));

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile('D:/Projects/Website/index.html');
});

// Handle form submission
app.post('/submit-form', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);

    res.json({
        message: 'Form submitted successfully!'
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});