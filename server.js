const express = require('express');
const fs = require('fs');
const path = require('path');
const jsonData = require('./Develop/db/db.json');
const randomId = require('./helper/randomId.js');

// setting computer port number for service
const PORT = 3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// installing middleware
app.use(express.static('public'));

var noteArr = []

function writeJsonFile(notes){

  json =`[
    {
        "id": "${notes.id}",
        "title":"${notes.title}",
        "text":"${notes.text}"
    }
]
`
  return fs.writeFile("./Develop/db/db.json", json, (err) => {
    if(err) return console.error(err);
    console.log("Success!");
  });
}

app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);


app.get('/api/notes', (req, res) => {
    res.status(200).json(jsonData);
  });
  

app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
    // console.log(req.body)
   
    // Destructuring assignment for the items in req.body
    const {title, text} = req.body;
    
    
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        id: randomId(),
        title,
        text,
      };

      const response = {
        status: 'success',
        body: newNote,
      };
      noteArr.push(newNote)
      console.log(noteArr)
      writeJsonFile(noteArr)

    // JSON is a string, databases/file services/web servers work best with strings
    
    res.status(201).json(response);
  } else {
    // Catching the errors so we can send an error response
    res.status(500).json('Error in posting Note');
  }
});

// keep your web service awake and listening
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
