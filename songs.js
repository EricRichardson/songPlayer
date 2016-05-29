var maryHadALittleLamb = (parseSong("E D C D E E E2 D D D2 E G G2 E D C D E E E E D D E D C3 D E D C D C C C2 D D D2 C G G2 E D C D E E E E D D E D C4"));

var franz = (parseSong("C E A G F E D C B C D C B A B B C E A G F E B C B C D"));

var original = (parseSong("E2 A A A G2 F E D2 F C2 E4 E2 A A A F2 F E D2 F C2 A4"));

var arppegios = (parseSong("C E G E C E G E C E G E C E G E A C E C A C E C A C E C A C E C"))

var amaj6 = "3A 3C# 3E 3F# 3E 3C#"
var dmaj6 = "3D 3F# 4A 4C# 4A 3F#"
var emaj6 = "3E 3G 4B 4C# 4B 3G"
var majarp = parseSong( amaj6 + ' ' + amaj6 + ' ' + amaj6 + ' ' + amaj6 + ' ' + dmaj6+ ' ' + dmaj6+ ' ' + amaj6+ ' ' + amaj6+ ' ' + emaj6+ ' ' + dmaj6+ ' ' + amaj6+ ' ' + amaj6)

 var toZanarkand = parseSong("4E2 3E2 3G2 3B2 4E2 4F#2 4G12 4D2 3D2 3F#2 4A2 4D2 4E2 4F#12")


// playSong(majarp, 300)
// playSong(franz, 300)
// playSong(toZanarkand, 384);
// playSong(maryHadALittleLamb, 400)
// playSong(arppegios, 300)
