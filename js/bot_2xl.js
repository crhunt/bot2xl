window.AudioContext = window.AudioContext || window.webkitAudioContext;

window.onload = function() {

    // Initialize tape and track
    var loadtrack = '1';
    var loadtape = 'fascinating_facts';

    // Set tape
    var tape = document.getElementById('tape');
    tape.value = loadtape;
    //tape.innerHTML = toUpper(loadtape.replace(/_/g," "));
    tape.innerHTML = loadtape.replace(/_/g," ")
                             .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

    // Display tape collection
    display_tapes();
    
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

// Display and set tape

function display_tapes() {
    
    // List of all tapes (these are folders in /media_2xl folder)
    var tape_list = ["african_safari", "planet_earth",
        "all_time_top_topics", "ripleys_believe_it_or_not",
        "amazing_world_records", "safety_first",
        "batman_carnival_crime", "say_hello_to_famous_folks",
        "batman_sizzling_scheme", "sng_blinded_by_the_light",
        "careers_and_you", "spiderman_for_king_and_country",
        "chaos_in_jurassic_park", "sports_world",
        "count_on_it", "   stars_and_planets",
        "fascinating_facts", "storymaker",
        "food_facts_and_you", "superman_a_new_hero",
        "fun_and_games", "superman_mayhem_in_metropolis",
        "fun_with_words", "surprise_package",
        "geography_and_you", "tale_of_the_phantom_manor",
        "incredible_sports_feats", "tftck_if_wishes_were_hornets",
        "jurassic_facts", "treasure_chest_of_facts",
        "letter_perfect", "trivia_time",
        "mmpr_attack_100_foot_teenagers", "voyage_to_outer_space",
        "monsters_myths_and_dinosaurs", "world_of_2xl",
        "music_maker", "world_of_animals",
        "nature_and_you", "world_of_science",
        "oceans_of_fun", "xmen_deadly_games",
        "pet_parade", "xmen_ghosts_that_haunt_us"];

    // Display tape selection in tapecontainer element
    var tape_container = document.getElementById('tapecontainer');
    // Create list of tapes
    for (n = 0, len = tape_list.length, innerHTMLstr="", tape_name=""; n < len; n++) {
        tape_name = tape_list[n].replace(/_/g," ")
                                .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        //tape_name = toUpper(tape_name);
        innerHTMLstr += '<div class="tapebox-outer" id="'+tape_list[n]+'" >' +
                        '<div class="tapebox-inner">'+
                        '<p>'+tape_name+'</p></div></div>';
    }
    // Populate innerhtml
    tape_container.innerHTML = innerHTMLstr;

    for (n = 0, len = tape_list.length; n < len; n++) {
        elem = document.getElementById(tape_list[n]);
        elem.style.background = "url('media_2xl/"+tape_list[n]+"/cover.png') no-repeat";
    }
    
}

function toUpper(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(function(word) {
            //console.log("First capital letter: "+word[0]);
            //console.log("remain letters: "+ word.substr(1));
            return word[0].toUpperCase() + word.substr(1);
        })
        .join(' ');
 }