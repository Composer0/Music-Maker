const express = require('express');
const app = express();

app.set('views', __dirname + '');
// content path has to empty in our scenario or else it will try and route to a folder that does not exist.
app.set('view engine', 'ejs');

app.use(express.static('public'));
// tells engine where all files are located. 

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000);

// MIME error occurred during the creation of this project. This error occurred because I was anticipating my files in the public folder to not be found when implementing Express EJS. I preemtively added public to all directories to ensure they could be found. I then learned that this was unnecessary and deleted them all.