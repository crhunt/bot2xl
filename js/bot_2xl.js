window.AudioContext = window.AudioContext || window.webkitAudioContext;

window.onload = function() {

    // Initialize tape and track
    var loadtrack = '1';
    var loadtape = 'fascinating_facts';

    // Set tape
    var tape = document.getElementById('tape');
    tape.value = loadtape;
    tape.innerHTML = toUpper(loadtape.replace("_"," "));
    
    // Set track
    var currentTrack =  document.getElementById('audioTrack');
    currentTrack.value = loadtrack;
    currentTrack.innerHTML = "Track "+loadtrack;

    // Initialize audio context
    window.context = new AudioContext();
    set_analyser();
    window.ctx = document.getElementById('c').getContext("2d");
    draw();

}

function toUpper(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(function(word) {
            console.log("First capital letter: "+word[0]);
            console.log("remain letters: "+ word.substr(1));
            return word[0].toUpperCase() + word.substr(1);
        })
        .join(' ');
 }

function playtrack(track) {
    // Update audio track
    var tape = document.getElementById('tape');
    var audio = document.getElementById('audioPlayer');
    var ctime = audio.currentTime;
    var url = "media_2xl/"+tape.value+"/"+track+".mpga";
    audio.src = url;
    audio.currentTime = ctime;
    audio.play();
    // Update track data
    var currentTrack =  document.getElementById('audioTrack');
    currentTrack.value = track;
    currentTrack.innerHTML = "Track "+track;

    // Analyze audio level
    set_analyser();

    draw();
}

function set_analyser() {

    // Analyze audio level
    myaudio = context.createMediaElementSource(document.getElementById('audioPlayer'));
    analyser = context.createAnalyser(); // Create an analyser
    analyser.smoothingTimeConstant = 0.9;
    analyser.fftSize = 512; // Total samples are half the fft size.
    myaudio.connect(analyser);
    analyser.connect(context.destination);
}

function draw() {

    /** Solution adapted from: 
      * https://stackoverflow.com/questions/20769261/how-to-get-video-elements-current-level-of-loudness
      * Credit: MarijnS95
      */

    // Use analyzer to get sound data
    var array = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(array);

    // Draw canvas
    ctx.clearRect(0, 0, 0, 0);

    // Get audio level, max and average (only max used)
    var ave_level = 0;
    var max_level = 0;
    for (i = 0; i < array.length; i++) {
        a = Math.abs(array[i] - 128);
        ave_level += a;
        max_level = Math.max(max_level, a);
    }
    ave_level /= array.length;

    // Get current volume setting for normalization
    var audio = document.getElementById('audioPlayer');
    var norm_factor = 80 * audio.volume + 0.1; // Add 0.1 to avoid div by 0
    
    // Set audio level
    // ... Some art here to get range we want
    var norm_level = Math.max( Math.min( (max_level)/norm_factor-0.19,1.0), 0.0 );
    //var audioLevel =  document.getElementById('audioLevel');    
    //audioLevel.innerHTML = norm_level;
    // Set the mouth image opacity to norm_level
    var mouth =  document.getElementById('mouth');
    mouth.style.opacity = norm_level;

    requestAnimationFrame(draw);
}
