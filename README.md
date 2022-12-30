# Music Maker

### EJS, CSS, JavaScript, Node.js, Express, MongoDB, Mongoose

https://www.orionpalmer.com/projects/BeatmakerProject/index.html

Project is responsive but is not meant to work on devices smaller than a tablet at this time. For best user experience please use a tablet or PC. (It can still work on a smart phone but animations are limited and sizing in a vertical space is cumbersome.)

Project focuses on the use of creating sequences within JavaScript to play sounds in a looped pattern. Tracks are introduced to change the sound of the selected track which are based on the displayed instrument.

Piano Player has been introduced into the program and features fully playable keys that can work simultaneously with the Beat Maker. Piano Player functions through linking data.audio to keydowns of keys found in array.

Because this is a one page app we have introduced a basic navigation button clicker that allows for the two pages to be switched between by having the piano app off screen and then quickly snapped into view upon nav click. Play button in the piano app is synced to the Beat Maker app as well. Apps can be switched between in the middle of play.

# Features to be added.

Add track to piano player that allows all keys to become a different sound. Seperate file folder may make the task easier.

Fun feature is to allow instrument families to be swapped into Beat Maker(must add additional sound files as well).

Transfer Beat Maker inputs into music notation of quarter notes and quarter rests.

<br>

# Recording-with-EJS-&-Mongoose Branch
Purpose of this branch to further develop the app with a recording feature. Incorporates Node.js runtime environemnt, EJS templating (soon to be replaced with React), and implements Express.js routing through the use of the Mongoose JS library.

"Save", "Replay", and "View Song" buttons have now been incorporated. 
"Replay" performs the most recent recorded piano input. At this point in the program, inputs are not saved into the database. To save in the database (MongoDBCompass), the user must select "Save". Upon selecting "Save" the information will be stored into the assigned database, in our application that is known as songrecorder.songs. To view the inputs and timings of the most recently saved song during the session, users can select "View Song" and the console.log will populate the information.
