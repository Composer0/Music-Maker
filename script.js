class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll('.pad')
        this.playBtn = document.querySelector('.play')
        this.currentKick = '.sounds/kick-classic.wav'
        this.currentSnare = '.sounds/snare-acoustic01.wav'
        this.currentHihat = '.sounds/hihat-acoustic01.wav'
        this.currentElectronic = '.sounds/bubbles.mp3'
        this.kickAudio = document.querySelector('.kick-sound')
        this.snareAudio = document.querySelector('.snare-sound')
        this.hihatAudio = document.querySelector('.hihat-sound')
        this.electronicAudio = document.querySelector('.electronic-sound')
        this.index = 0
        this.bpm = 120
        // tracks the track placement.
        this.isPlaying = null
        this.selects = document.querySelectorAll('.select')
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
    }
    // Changing the sounds!!!!!!!!!!!!
    changeSound(e) {
     const selectionName = e.target.name
     const selectionValue = e.target.value
     switch(selectionName){
         case "kick-select":
             this.kickAudio.src = selectionValue
             break
         case "snare-select":
             this.snareAudio.src = selectionValue
             break
         case "hihat-select":
             this.hihatAudio.src = selectionValue
             break
         case "electronic-select":
             this.electronicAudio.src = selectionValue
             break
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