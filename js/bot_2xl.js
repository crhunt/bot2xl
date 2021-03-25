window.onload = function() {
    var loadtrack = '1';
    var loadtape = 'fascinating_facts';

    var tape = document.getElementById('tape');
    tape.value = loadtape;
    tape.innerHTML = loadtape;
    var currentTrack =  document.getElementById('audioTrack');
    currentTrack.value = loadtrack;
    currentTrack.innerHTML = "Track "+loadtrack;

    window.context = new AudioContext();
    set_analyser();
    window.ctx = document.getElementById('c').getContext("2d");

    draw();

}

window.AudioContext = window.AudioContext || window.webkitAudioContext;

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
    video = context.createMediaElementSource(document.getElementById('audioPlayer'));
    analyser = context.createAnalyser(); //we create an analyser
    analyser.smoothingTimeConstant = 0.9;
    analyser.fftSize = 512; //the total samples are half the fft size.
    video.connect(analyser);
    analyser.connect(context.destination);
}

function draw() {

    // Solution adapted from: https://stackoverflow.com/questions/20769261/how-to-get-video-elements-current-level-of-loudness
    // Credit: MarijnS95

    // Use analyzer to get sound data
    var array = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(array);

    // Draw canvas
    ctx.clearRect(0, 0, 0, 0);

    // Get audio level
    var ave_level = 0;
    var max_level = 0;
    for (i = 0; i < array.length; i++) {
        a = Math.abs(array[i] - 128);
        ave_level += a;
        max_level = Math.max(max_level, a);
    }
    ave_level /= array.length;

    // Get audio for current volume setting
    var audio = document.getElementById('audioPlayer');
    var norm_factor = 80 * audio.volume + 0.1;
    
    // Set audio level
    var norm_level = Math.max( Math.min( (max_level)/norm_factor-0.19,1.0), 0.0 );
    //var audioLevel =  document.getElementById('audioLevel');    
    //audioLevel.innerHTML = norm_level;
    var mouth =  document.getElementById('mouth');
    mouth.style.opacity = norm_level;
    

    /* Draw circles
    ctx.beginPath();
    ctx.arc(128, 128, ave_level, 0, Math.PI * 2, true);
    ctx.arc(128 + 256, 128, 128 * norm_level, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();*/

    requestAnimationFrame(draw);
}
