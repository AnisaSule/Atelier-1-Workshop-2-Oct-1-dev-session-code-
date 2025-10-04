// ==============================================
// HEARTS SPAWN ON TAP
// ==============================================

let heartGif;
let hearts = [];

function preload() {
    heartGif = loadImage('Images/Heart.gif');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    lockGestures();
    imageMode(CENTER);
}

function draw() {
    background(240);
    
    // Draw all hearts
    for (let i = 0; i < hearts.length; i++) {
        image(heartGif, hearts[i].x, hearts[i].y);
    }
}

function touchStarted() {
    // Add heart at random position
    hearts.push({
        x: random(width),
        y: random(height)
    });
    return false;
}

function touchEnded() {
    return false;
}