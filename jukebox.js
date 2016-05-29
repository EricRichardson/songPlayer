var parseNote = function(note){
  var regex = /^(\d)?([A-Z]{1})(\#|b{1})?/
  var matchLetter = note.match(regex);
  var letter = matchLetter[0];
  console.log(letter)
  var matchBeat = note.match(/\d+$/) || [1];
  var beat = matchBeat[0];
  var noteObj = {
    "pitch" : letter,
    "beats" : beat
  }
  return noteObj
};

var parseSong = function(notes){
  var song = []
  var noteArr = notes.split(' ');
  for(var i = 0; i < noteArr.length; i++){
    song.push(parseNote(noteArr[i]));
  };
  return song;
}
