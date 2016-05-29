var MIDDLE_OCTAVE = 4;
var MIDDLE_A_FREQUENCY = 440.0;

var PITCH_RATIOS = {
  "A"  : 1.0,
  "A#" : 16.0 / 15.0,
  "B"  : 9.0 / 8.0,
  "C"  : 6.0 / 5.0,
  "C#" : 5.0 / 4.0,
  "D"  : 4.0 / 3.0,
  "D#" : 45.0 / 32.0,
  "E"  : 3.0 / 2.0,
  "F"  : 8.0 / 5.0,
  "F#" : 5.0 / 3.0,
  "G"  : 9.0 / 5.0,
  "G#" : 15.0 / 8.0,
  "R"  : 0,


  "3A"  : 0.5,
  "3A#" : 8 / 15.0,
  "3B"  : 4.5 / 8.0,
  "3C"  : 3.0 / 5.0,
  "3C#" : 2.5 / 4.0,
  "3D"  : 2.0 / 3.0,
  "3D#" : 22.5 / 32.0,
  "3E"  : 1.5 / 2.0,
  "3F"  : 4.0 / 5.0,
  "3F#" : 2.5 / 3.0,
  "3G"  : 4.5 / 5.0,
  "3G#" : 7.5 / 8.0,


  "4A"  : 1.0,
  "4A#" : 16.0 / 15.0,
  "4B"  : 9.0 / 8.0,
  "4C"  : 6.0 / 5.0,
  "4C#" : 5.0 / 4.0,
  "4D"  : 4.0 / 3.0,
  "4D#" : 45.0 / 32.0,
  "4E"  : 3.0 / 2.0,
  "4F"  : 8.0 / 5.0,
  "4F#" : 5.0 / 3.0,
  "4G"  : 9.0 / 5.0,
  "4G#" : 15.0 / 8.0,

  "5A"  : 2.0,
  "5A#" : 32.0 / 15.0,
  "5B"  : 18.0 / 8.0,
  "5C"  : 12.0 / 5.0,
  "5C#" : 10.0 / 4.0,
  "5D"  : 8.0 / 3.0,
  "5D#" : 90.0 / 32.0,
  "5E"  : 6.0 / 2.0,
  "5F"  : 16.0 / 5.0,
  "5F#" : 10.0 / 3.0,
  "5G"  : 18.0 / 5.0,
  "5G#" : 30.0 / 8.0
};

var ENHARMONIC_EQUIVALENTS = {
  "A"   : "A",
  "G##" : "A",
  "Bbb" : "A",

  "A#"  : "A#",
  "Bb"  : "A#",
  "Cbb" : "A#",

  "B"   : "B",
  "A##" : "B",
  "Cb"  : "B",

  "C"   : "C",
  "B#"  : "C",
  "Dbb" : "C",

  "C#"  : "C#",
  "B##" : "C#",
  "Db"  : "C#",

  "D"   : "D",
  "C##" : "D",
  "Ebb" : "D",

  "D#"  : "D#",
  "Eb"  : "D#",
  "Fbb" : "D#",

  "E"   : "E",
  "D##" : "E",
  "Fb"  : "E",

  "F"   : "F",
  "E#"  : "F",
  "Gbb" : "F",

  "F#"  : "F#",
  "E##" : "F#",
  "Gb"  : "F#",

  "G"   : "G",
  "F##" : "G",
  "Abb" : "G",

  "G#"  : "G#",
  "Ab"  : "G#",
  "R" : "R",

  "3A"  : "3A" ,
  "3A#" : "3A#",
  "3B"  : "3B" ,
  "3C"  : "3C" ,
  "3C#" : "3C#",
  "3D"  : "3D" ,
  "3D#" : "3D#",
  "3E"  : "3E" ,
  "3F"  : "3F" ,
  "3F#" : "3F#",
  "3G"  : "3G" ,
  "3G#" : "3G#",

  "4A"  : "4A" ,
  "4A#" : "4A#",
  "4B"  : "4B" ,
  "4C"  : "4C" ,
  "4C#" : "4C#",
  "4D"  : "4D" ,
  "4D#" : "4D#",
  "4E"  : "4E" ,
  "4F"  : "4F" ,
  "4F#" : "4F#",
  "4G"  : "4G" ,
  "4G#" : "4G#",

  "5A"  : "5A" ,
  "5A#" : "5A#",
  "5B"  : "5B" ,
  "5C"  : "5C" ,
  "5C#" : "5C#",
  "5D"  : "5D" ,
  "5D#" : "5D#",
  "5E"  : "5E" ,
  "5F"  : "5F" ,
  "5F#" : "5F#",
  "5G"  : "5G" ,
  "5G#" : "5G#"
};

var SECONDS_PER_MINUTE = 60;
var MILLIS_PER_SECOND = 1000;
var CUTOFF_FREQUENCY = 2000;
var RESONANCE_FREQUENCY = 0;
var WAVEFORM = 'triangle';

// Returns the frequency in hz for a given pitch.
// e.g. 'A' => 440
var pitchFrequency = function(pitch) {
  var normalizedPitch =  ENHARMONIC_EQUIVALENTS[pitch];
  return MIDDLE_A_FREQUENCY * PITCH_RATIOS[normalizedPitch];
};

// Play a tone with the given frequency in hz and duration in seconds,
// to the given audio context.
var playTone = function(frequency, duration, audioContext) {
  startTime = audioContext.currentTime;

  // Setup oscillator
  var osc = audioContext.createOscillator();
  osc.type = WAVEFORM;
  osc.frequency.value = frequency;

  // Setup filter with piano-like cut-off.
  var filter = audioContext.createBiquadFilter();
  filter.frequency.value = CUTOFF_FREQUENCY;
  filter.Q.value = RESONANCE_FREQUENCY;

  // Setup master gain the a piano-like envelope.
  var masterGain = audioContext.createGain();
  masterGain.gain.setValueAtTime(0.0, startTime);
  masterGain.gain.linearRampToValueAtTime(10, startTime + 0.01);
  masterGain.gain.linearRampToValueAtTime(0, startTime + duration * 0.75);

  // Wire oscillator through filter, through gain, to speakers.
  osc.connect(filter);
  filter.connect(masterGain);
  masterGain.connect(audioContext.destination);

  // Start the oscillator;
  osc.start(startTime);

  // Stop the oscillator when we're done.
  osc.stop(startTime + duration);
};

// Setup a single shared audio context for the juke box.
var jukeboxAudioContext = new AudioContext();

// Play a given song at "bpm" beats per minute.
// Calls "onComplete" when the song is over.
//
// A song should be an array of notes, each containing a pitch and
// number of beats, e.g:
// [{pitch: 'A', beats: 1}, {pitch: 'B#', beats: 2}, ...]
var playSong = function(song, bpm, onComplete) {

  if (typeof onComplete == "undefined") {
    onComplete = function(){};
  }

  var currNote = 0;

  var bps = bpm / SECONDS_PER_MINUTE;

  var playNextNote = function() {
    var note = song[currNote];
    var duration = note.beats / bps;
    var frequency = pitchFrequency(note.pitch);

    playTone(frequency, duration, jukeboxAudioContext);

    currNote++;

    setTimeout(function() {
      if (currNote < song.length) {
        playNextNote();
      } else {
        onComplete();
      }
    }, duration * MILLIS_PER_SECOND);

  };

  playNextNote();

};
