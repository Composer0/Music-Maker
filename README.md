# Music Maker

https://www.orionpalmer.com/projects/BeatmakerProject/index.html

## Beat Maker 

The "Beat Maker" script allows users to create and play beats using a virtual drum machine interface. This documentation provides an overview of the script's components, functions, and user interactions.

### Script Components

1. **Constructor and Initialization**
   - Initializes various DOM elements and properties required for the drum kit functionality.
   - Sets default values for audio sources, indexes, BPM, and play state.

2. **Functions**
   - `activePad()`: Toggles the "active" class on a pad when clicked.
   - `repeat()`: Animates and plays sounds for each active pad in the current step of the loop.
   - `start()`: Initiates the loop playback, calculating the interval based on the BPM.
   - `updateBtn()`: Updates the play button's text and appearance based on the play state.
   - `changeSound(e)`: Changes the sound source of a specific drum element based on user selections.
   - `mute(e)`: Mutes/unmutes audio tracks based on user interactions.
   - `changeTempo(e)`: Updates the BPM value and tempo text based on the slider input.
   - `updateTempo(e)`: Updates the loop playback interval based on the new BPM.

3. **Event Listeners**
   - Adds event listeners for various interactions, such as pad clicks, play button clicks, sound selections, mute toggles, and tempo changes.
   - Handles keyboard interactions to trigger drum sounds using keys.
   - Includes event listeners to show/hide the drum machine interface.

### Keyboard Interaction

The script also provides keyboard interaction for triggering drum sounds using specific keys. White and black keys are defined, and event listeners are set up to detect key presses. When a key is pressed, the corresponding note is played.

### Navigation

The script handles navigation between the beat maker and another section using buttons. Event listeners are added to the buttons to toggle the visibility of the beat maker interface.

### Conclusion

The "Beat Maker" script demonstrates how to create an interactive drum machine interface that allows users to create beats by clicking pads, using keyboard keys, and controlling playback settings. Developers can learn from this script to create their own music-related web applications or interactive interfaces with audio functionality.
