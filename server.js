const express = require('express');
const path = require('path');
// creating the web server obj for organizing
const app = express();
// setting computer port number for service
const jsonData = require('./Develop/db/db.json');
const PORT = 3001;

// installing middleware
app.use(express.static('public'));

app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// app.get('/api/notes', (req, res) =>
//   res.sendFile(path.join(__dirname, ''))
// );

app.get('/api/notes', (req, res) => res.json(jsonData));

app.post('/api/notes', (req, res) => {
    // Let the client know that their POST request was received
    res.json(`${req.method} request received`);
  
    // Show the user agent information in the terminal
    console.info(req.rawHeaders);
  
    // Log our request to the terminal
    console.info(`${req.method} request received`);
  });

// keep your web service awake and listening
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);