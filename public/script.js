// Dark Mode instructions.
// const toggle = document.querySelector('.toggle')

// toggle.addEventListener('click', (e) => {
//     const html = document.querySelector('html')
//     if (html.classList.contains('dark')) {
//         html.classList.remove('dark')
//         e.target.innerHTML = 'Dark mode'
//     } else {
//         html.classList.add('dark')
//         e.target.innerHTML = "Light mode"
//     }
// })

// Beat Maker Portion
class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll('.pad')
        this.playBtn = document.querySelector('.play')
        this.playBtn2 = document.querySelector('.pianoplay')
        this.currentKick = 'public/sounds/kick-classic.wav'
        this.currentSnare = 'public/sounds/snare-acoustic01.wav'
        this.currentHihat = 'public/sounds/hihat-acoustic01.wav'
        this.currentElectronic = 'public/sounds/bubbles.mp3'
        this.kickAudio = document.querySelector('.kick-sound')
        this.snareAudio = document.querySelector('.snare-sound')
        this.hihatAudio = document.querySelector('.hihat-sound')
        this.electronicAudio = document.querySelector('.electronic-sound')
        this.index = 0
        this.bpm = 120
        // tracks the track placement.
        this.isPlaying = null
        this.selects = document.querySelectorAll('select')
        this.muteBtn = document.querySelectorAll('.mute')
        this.tempoSlider = document.querySelector('.tempo-slider')
    }
    activePad() {
        this.classList.toggle("active")
      }

    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`)
        // once index and step are set you can set the query selector to focus on the class and have all items in that class circulate. The class is normally b0 in this instance. It is identified by the .b and then ${step} which is the number that the current step is on. This generates the b0, b1, b2 ect effect.
        // Loop over the pads
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2` ;
            // the 2 allows the animation to smoothly go back to its original shape.
            // checks if pad is active.
            if(bar.classList.contains('active')){
                // check each sound
                if(bar.classList.contains('kick-pad')){
                    this.kickAudio.currentTime = 0
                    this.kickAudio.play()
                }
                if(bar.classList.contains('snare-pad')){
                    this.snareAudio.currentTime = 0
                    this.snareAudio.play()
                }
                if(bar.classList.contains('hihat-pad')){
                    this.hihatAudio.currentTime = 0
                    this.hihatAudio.play()
                }
                if(bar.classList.contains('electronic-pad')){
                    this.electronicAudio.currentTime = 0
                    this.electronicAudio.play()
                }
            }
        })
        this.index++
    }
    start() {
        const interval = (60/this.bpm) * 1000;
        // calculation for bpm.
        // If Null then you are checking the reverse. This is just an example.
        if(!this.isPlaying){
            this.isPlaying = setInterval(() => {
                this.repeat()
            }, interval)
        } else{
            // remove the interval
            clearInterval(this.isPlaying)
            this.isPlaying = null
            // resetting to null allows you to press play again when you're ready.
        }
    }
    updateBtn() {
        if(this.isPlaying) {
            this.playBtn.innerText = 'Play'
            this.playBtn.classList.remove('active')
        } else {
            this.playBtn.innerText = 'Stop'
            this.playBtn.classList.add("active")
        }
        if(this.isPlaying) {
            this.playBtn2.innerText = 'Play'
            this.playBtn2.classList.remove('active')
        } else {
            this.playBtn2.innerText = 'Stop'
            this.playBtn2.classList.add("active")
        }
    }

    // Changing the sounds!!!!!!!!!!!!
        changeSound(e) {
            const selectionName = e.target.name;
            const selectionValue = e.target.value;
            switch (selectionName) {
              case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
              case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
              case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
         case "electronic-select":
             this.electronicAudio.src = selectionValue
             break;
        }

    }
    mute(e) {
        const muteIndex = e.target.getAttribute('data-track')
        e.target.classList.toggle('active')
        if(e.target.classList.contains('active')){
            // e = reference the event that initiates the function.
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
                case "3":
                    this.electronicAudio.volume = 0;
                    break;
            }
        }else{
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
                case "3":
                    this.electronicAudio.volume = 1;
                    break;
            }
            // volume = 0 is false or off. volume = 1 is true or on.
        }
    }
    changeTempo(e) {
        const tempoText = document.querySelector('.tempo-nr')
        this.bpm = e.target.value
        tempoText.innerText = e.target.value
    }
    updateTempo(e) {
        clearInterval(this.isPlaying)
        // interval must be clear because it contains the original tempo formula. Once null, the newly established tempo can be figured into the equation. Then it will restart.
        this.isPlaying = null
        const playBtn = document.querySelector('.play')
        if(playBtn.classList.contains('active')) {
            this.start()
        }
    }
}

const drumKit = new DrumKit()

// event listeners

drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener("animationend", function() {
        this.style.animation = ''
        // This allows the animation to reset.
    })
}) 

drumKit.playBtn.addEventListener("click", function() {
    drumKit.updateBtn()
    drumKit.start()
})

drumKit.playBtn2.addEventListener("click", function() {
    drumKit.updateBtn()
    drumKit.start()
})

drumKit.selects.forEach(select => {
    select.addEventListener('change', function(e) {
        drumKit.changeSound(e)
    })
})
drumKit.muteBtn.forEach(btn => {
    btn.addEventListener('click', function(e) {
        drumKit.mute(e)
    })
})
drumKit.tempoSlider.addEventListener('input', function(e) {
    drumKit.changeTempo(e)
})
// change vs input.  Input runs each increment the slider is moved or is in motion. Chnage runs only once the slider is stopped.
drumKit.tempoSlider.addEventListener('change', function(e) {
    drumKit.updateTempo(e)
})


// Keyboard portion
const WHITE_KEYS = ['a', 's', 'd', 'j', 'k', 'l', ';'];
const BLACK_KEYS = ['w', 'e', 'i', 'o', 'p']

const keys = document.querySelectorAll('.key');
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')
// .key.black allow for both classes in the same css file to be selected simultaneously.

//returns a new object of mapping the keys.
const keyMap = [...keys].reduce((map, key) => {
    map[key.dataset.note] = key
    return map
}, {})

// We are creating key/id values for each of the notes/pitches. ex.{C : key[0]}

let recordingStartTime
let songNotes = currentSong && currentSong.notes

console.log(currentSong)
keys.forEach(key => {
    key.addEventListener('click', () => playNote(key));
    // activates function listed below regarding function playNote
})

document.addEventListener('keydown', e => {
    // if (e.repeat) return detects if the keydown event is being initiated by the key being held down. If it does, it stops the sounds from continuing.
    if (e.repeat) return;
    // key is being established as a new function.
    const key = e.key;
    // WHITE_KEY refers to the array. indexOF key is referring to the class of the object slected.
    const whiteKeyIndex = WHITE_KEYS.indexOf(key)
    const blackKeyIndex = BLACK_KEYS.indexOf(key)

    // refer to note of what whiteKeyIndex means
    if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex]);
    if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex]);

})

function playNote(key) {
    if (isRecording()) recordNote(key.dataset.note)
    const noteAudio=document.getElementById(key.dataset.note);
    // why ID? Notes have ID assigned. Class Names will not work.
    // instant feedback.
    noteAudio.currentTime = 0;
    noteAudio.play();
    // plays the note. Finds the key class being interacted with and then obtains its dataset. .note refers to the type of dataset being looked for. Theoretically we could also have another data-'type' that was an animal. data-bird="owl". In short. find class and the dataset."type".
    key.classList.add('active');
    // this is how you add a class through standard javascript. Key refers to class being selected. 
    noteAudio.addEventListener('ended', () => {
        key.classList.remove('active')
    })
}

// Navigation

const jamMaker = document.querySelector('.open-btn')
const beatMachine = document.querySelector('.close-btn')


jamMaker.addEventListener('click', () => {
    entireproject.classList.add('visible')
});

beatMachine.addEventListener('click', () => {
    entireproject.classList.remove('visible')
});


// Recording Songs

const recordButton = document.querySelector('.rec-btn');
const replayButton = document.querySelector('.repeat-btn');
const saveButton = document.querySelector('.save-btn');
const viewButton = document.querySelector('.view-btn');

recordButton.addEventListener('click', toggleRecording)
saveButton.addEventListener('click', saveSong)
replayButton.addEventListener('click', playSong)

function toggleRecording() {
    recordButton.classList.toggle('recording')
    if (isRecording()) {
        startRecording()
    } else {
        stopRecording()
    }
}

function isRecording() {
    return recordButton != null && recordButton.classList.contains('recording')
}

function startRecording() {
    recordingStartTime = Date.now()
    songNotes = []
}

function stopRecording() {
    replayButton.classList.remove('hidden');
    saveButton.classList.remove('hidden');
}

function playSong() {
    if (songNotes.length === 0 ) return
    songNotes.forEach(note => {
        setTimeout(()=> {
            setTimeout(() => {
                playNote(keyMap[note.key])
            }, note.startTime)
        })
    })
    console.log(songNotes)
}

function recordNote(note) {
    songNotes.push({
        key: note,
        startTime: Date.now() - recordingStartTime
    })
}

function saveSong() {
    axios.post('/songs', {songNotes: songNotes}).then(res => {
        viewButton.classList.remove('hidden');
        viewButton.href = `/songs/${res.data._id}`
        console.log(res.data)
    })
}

console.log(currentSong)