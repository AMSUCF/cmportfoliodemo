let roomImage;
let interactions = {
  bookshelf: { x1: 43, y1: 101, x2: 190, y2: 469, text: "You peruse the tomes of knowledge." },
  box: { x1: 74, y1: 470, x2: 152, y2: 538, text: "You found a key inside the box!" },
  door: { x1: 210, y1: 147, x2: 380, y2: 497, text: "The door is locked. There must be a key." },
  bed: { x1: 406, y1: 354, x2: 557, y2: 557, text: "A comfy bed, perhaps for a quick rest?" }
};
let currentText = "";
let hasKey = false;
let escaped = false;
let black = false;
let linked = false;

function preload() {
  roomImage = loadImage('room.png'); // Preload the room image before the game starts
}

function setup() {
  createCanvas(600, 600); // Set up the canvas
}

function draw() {
  if (!escaped) {
    image(roomImage, 0, 0); // Draw the room image
  } else {
    if(!black) {
      background(0); // If escaped, show a black screen
      black = true;
    }
  }

  textSize(20); // Set text size
  displayText(); // Display any current text
  fill(255);
  stroke(0);
  strokeWeight(3);
  if (!escaped) {
    let hoverText = getHoverText(); // Get the text for the current mouse hover
    if (hoverText !== "") {
      text(hoverText, mouseX + 10, mouseY - 10); // Display hover text near the mouse
    }
  }
}

function mousePressed() {
  if (!escaped) {
    for (let obj in interactions) {
      let zone = interactions[obj];
      if (mouseX > zone.x1 && mouseX < zone.x2 && mouseY > zone.y1 && mouseY < zone.y2) {
        // Check if the mouse is within the interaction zone
        if (obj === "box") {
          hasKey = true; // If the box is clicked, set hasKey to true
          currentText = zone.text;
        } else if (obj === "door" && hasKey) {
          escaped = true; // If the door is clicked with the key, set escaped to true
          currentText = "You escaped!";
        } else {
          currentText = zone.text; // Set the current text to the interaction text
        }
        break;
      } else {
        currentText = "";
      }
    }
  }
}

function displayText() {
  if (currentText !== "") {
    fill(255);
    stroke(0);
    strokeWeight(3);
    textAlign(CENTER, CENTER);
    if (escaped) {
			 if (!linked) {
        let link = createA('twine.html', currentText);
        link.style('font-size', '32px'); // Large text
        link.style('color', '#FFFFFF'); // White text
        link.style('text-align', 'center'); // Center-aligned text
        link.style('text-decoration', 'none'); // No underline
  
          // Position the link in the center
        link.position(width / 2 - link.width / 2, height / 2);
        linked=true;
       }
    } else {
      textAlign(CENTER, BOTTOM);
      text(currentText, width / 2, height - 10); // Otherwise, display the text at the bottom
    }
  }
}

function getHoverText() {
  for (let obj in interactions) {
    let zone = interactions[obj];
    if (mouseX > zone.x1 && mouseX < zone.x2 && mouseY > zone.y1 && mouseY < zone.y2) {
      return obj; // Return the name of the object being hovered over
    }
  }
  return "";
}

