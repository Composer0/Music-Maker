const express = require('express');

const mongoose = require('mongoose');
const Song = require('./models/song.js')
const app = express();

mongoose.connect('mongodb://localhost/songrecorder', {useNewUrlParser: true, useUnifiedTopology: true})

// app.set('views', __dirname + 'index');
// content path has to empty in our scenario or else it will try and route to a folder that does not exist.
app.set('view engine', 'ejs');


app.use(express.json())
app.use(express.static('public'));
// tells engine where all files are located. 

app.get('/', (req, res) => {
    res.render('index')
})

//sends song to server.
app.post('/songs', async(req, res) => {
    // const song = new Song({
        // notes: 
        req.body.songNotes
    // })

    // await song.save()

    // res.json(song);
})

app.get('/songs/:id', async (req, res) => {
    let song
    try{
        song = await Song.findById(req.params.id)
    } catch (e) {
        song = undefined
    }
    res.render('index', {song: song})
})

app.listen(3000);

// MIME error occurred during the creation of this project. This error occurred because I was anticipating my files in the public folder to not be found when implementing Express EJS. I preemtively added public to all directories to ensure they could be found. I then learned that this was unnecessary and deleted them all.