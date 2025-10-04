// ==============================================
// TOUCH DISTANCE GIF INTERACTION
// ==============================================
// This example scales a GIF based on the distance
// between two finger touches
// ==============================================

let touch1X = 0;
let touch1Y = 0;
let touch2X = 0;
let touch2Y = 0;
let touchDistance = 0;
let initialDistance = 0;
let gifImage;
let gifScale = 1.0;
let minScale = 0.2;
let maxScale = 3.0;
let gifLoaded = false;
let loadError = false;

// ==============================================
// PRELOAD - Load the GIF
// ==============================================
function preload() {
    // Load your local GIF file
    gifImage = loadImage(
        'Images/Heart.gif',
        () => {
            gifLoaded = true;
            console.log('Heart.gif loaded successfully');
        },
        () => {
            loadError = true;
            console.log('Heart.gif failed to load - check file path');
        }
    );
}

// ==============================================
// SETUP FUNCTION
// ==============================================
function setup() {
    createCanvas(windowWidth, windowHeight);
    
    // Lock mobile gestures
    if (typeof lockGestures === 'function') {
        lockGestures();
    }
    
    textAlign(CENTER, CENTER);
    imageMode(CENTER);
    
    console.log('Setup complete');
    console.log('Canvas size:', width, 'x', height);
}

// ==============================================
// DRAW FUNCTION
// ==============================================
function draw() {
    background(240, 240, 240);
    
    // Display loading or error state
    if (loadError) {
        fill(255, 0, 0);
        textSize(20);
        text('Error loading Heart.gif\nCheck Images folder', width/2, height/2);
        return;
    }
    
    if (!gifLoaded) {
        fill(0);
        textSize(20);
        text('Loading Heart.gif...', width/2, height/2);
        return;
    }
    
    // Debug info at top
    fill(0);
    textSize(14);
    textAlign(LEFT, TOP);
    text('Touches detected: ' + touches.length, 10, 10);
    
    // Check if we have at least 2 touches
    if (touches.length >= 2) {
        // Get positions of first 2 touches
        touch1X = touches[0].x;
        touch1Y = touches[0].y;
        touch2X = touches[1].x;
        touch2Y = touches[1].y;
        
        // Calculate current distance
        touchDistance = dist(touch1X, touch1Y, touch2X, touch2Y);
        
        // Set initial distance on first detection
        if (initialDistance === 0) {
            initialDistance = touchDistance;
        }
        
        // Calculate scale based on distance change
        let scaleChange = touchDistance / initialDistance;
        gifScale = constrain(scaleChange, minScale, maxScale);
        
        // Draw the line between touches
        stroke(100, 100, 100);
        strokeWeight(2);
        line(touch1X, touch1Y, touch2X, touch2Y);
        
        // Draw circles at touch points
        fill(255, 0, 0, 150);
        noStroke();
        circle(touch1X, touch1Y, 30);
        circle(touch2X, touch2Y, 30);
        
        // Display info
        fill(0);
        textSize(14);
        textAlign(LEFT, TOP);
        text('Distance: ' + Math.round(touchDistance) + 'px', 10, 30);
        text('Scale: ' + gifScale.toFixed(2) + 'x', 10, 50);
        text('Touch 1: (' + Math.round(touch1X) + ', ' + Math.round(touch1Y) + ')', 10, 70);
        text('Touch 2: (' + Math.round(touch2X) + ', ' + Math.round(touch2Y) + ')', 10, 90);
    } else {
        // Reset initial distance when not touching
        initialDistance = 0;
        
        // Show instructions
        fill(100);
        textSize(24);
        textAlign(CENTER, CENTER);
        text('Touch with 2 fingers\nto scale the Heart', width/2, height/2 - 100);
        
        textSize(16);
        text('(Pinch to zoom in/out)', width/2, height/2 - 40);
    }
    
    // Draw the GIF at center with current scale
    if (gifLoaded && gifImage) {
        push();
        translate(width/2, height/2);
        scale(gifScale);
        image(gifImage, 0, 0);
        pop();
    }
}

// ==============================================
// TOUCH EVENT FUNCTIONS
// ==============================================
function touchStarted() {
    console.log('Touch started, total touches:', touches.length);
    return false; // Prevent default
}

function touchMoved() {
    return false; // Prevent default
}

function touchEnded() {
    console.log('Touch ended, remaining touches:', touches.length);
    return false; // Prevent default
}

// Handle window resize
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}