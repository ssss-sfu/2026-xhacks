// Internet Radio Player - Streams from different eras (all tested and working)
const stations = [
    // {
    //     name: "1960s/70s Hits",
    //     url: "https://listen.181fm.com/181-greatoldies_128k.mp3"
    // },
    {
        name: "1970s Hits",
        url: "https://listen.181fm.com/181-70s_128k.mp3"
    },
    {
        name: "1980s Hits",
        url: "https://listen.181fm.com/181-awesome80s_128k.mp3"
    },
    {
        name: "1990s Hits",
        url: "https://listen.181fm.com/181-star90s_128k.mp3"
    },
    // {
    //     name: "1990s Dance",
    //     url: "https://listen.181fm.com/181-90sdance_128k.mp3"
    // },
    {
        name: "2000s/2010s Hits",
        url: "https://listen.181fm.com/181-beat_128k.mp3"
    }
];

let currentStationIndex = 0;
let audio = null;
let isPlaying = false;
let audioContext = null;
let transitionNoise = null;
let fadeInterval = null;

// Create pleasant transition noise (pink noise)
function createTransitionNoise() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const bufferSize = 4096;
    const whiteNoise = audioContext.createScriptProcessor(bufferSize, 1, 1);
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.15; // More noticeable but still pleasant
    
    // Pink noise filter for warmer sound
    let b0, b1, b2, b3, b4, b5, b6;
    b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
    
    whiteNoise.onaudioprocess = function(e) {
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            output[i] *= 0.11; // Scale down
            b6 = white * 0.115926;
        }
    };
    
    whiteNoise.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    return { whiteNoise, gainNode };
}

// Fade audio volume
function fadeVolume(targetVolume, duration, callback) {
    if (fadeInterval) clearInterval(fadeInterval);
    
    const startVolume = audio.volume;
    const volumeDiff = targetVolume - startVolume;
    const steps = 20;
    const stepTime = duration / steps;
    let currentStep = 0;
    
    fadeInterval = setInterval(() => {
        currentStep++;
        audio.volume = startVolume + (volumeDiff * (currentStep / steps));
        
        if (currentStep >= steps) {
            clearInterval(fadeInterval);
            audio.volume = targetVolume;
            if (callback) callback();
        }
    }, stepTime);
}

function initRadio() {
    audio = new Audio();
    audio.volume = 0.5;
    
    const playBtn = document.getElementById('radio-play');
    const prevBtn = document.getElementById('radio-prev');
    const nextBtn = document.getElementById('radio-next');
    const stationDisplay = document.getElementById('radio-station');
    
    // Update display
    function updateDisplay() {
        stationDisplay.textContent = stations[currentStationIndex].name;
    }
    
    // Play current station
    function playStation() {
        // Fade out current audio if playing
        if (isPlaying && audio.src) {
            // Start transition noise immediately
            if (!transitionNoise) {
                transitionNoise = createTransitionNoise();
            }
            
            fadeVolume(0, 300, () => {
                // Load new station (noise is already playing)
                audio.src = stations[currentStationIndex].url;
                audio.load();
                
                audio.play()
                    .then(() => {
                        // Stop transition noise
                        if (transitionNoise) {
                            transitionNoise.whiteNoise.disconnect();
                            transitionNoise = null;
                        }
                        
                        // Fade in new station
                        audio.volume = 0;
                        fadeVolume(0.5, 400);
                        
                        isPlaying = true;
                        playBtn.textContent = '⏸';
                        playBtn.title = 'Pause';
                    })
                    .catch(err => {
                        console.error('Error playing radio:', err);
                        if (transitionNoise) {
                            transitionNoise.whiteNoise.disconnect();
                            transitionNoise = null;
                        }
                    });
            });
        } else {
            // First time playing
            audio.src = stations[currentStationIndex].url;
            audio.volume = 0;
            audio.play()
                .then(() => {
                    fadeVolume(0.5, 400);
                    isPlaying = true;
                    playBtn.textContent = '⏸';
                    playBtn.title = 'Pause';
                })
                .catch(err => {
                    console.error('Error playing radio:', err);
                });
        }
    }
    
    // Pause
    function pauseStation() {
        fadeVolume(0, 200, () => {
            audio.pause();
            isPlaying = false;
            playBtn.textContent = '▶';
            playBtn.title = 'Play';
        });
    }
    
    // Play/Pause toggle
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseStation();
        } else {
            playStation();
        }
    });
    
    // Previous station
    prevBtn.addEventListener('click', () => {
        currentStationIndex = (currentStationIndex - 1 + stations.length) % stations.length;
        updateDisplay();
        if (isPlaying) {
            playStation();
        }
    });
    
    // Next station
    nextBtn.addEventListener('click', () => {
        currentStationIndex = (currentStationIndex + 1) % stations.length;
        updateDisplay();
        if (isPlaying) {
            playStation();
        }
    });
    
    // Initialize display
    updateDisplay();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRadio);
} else {
    initRadio();
}
