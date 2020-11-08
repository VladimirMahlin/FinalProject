let video;
let label = "waiting...";
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/dlAamHcFr/';
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}
function setup() {
  createCanvas(640, 520);
  video = createCapture(VIDEO);
  video.hide();
  classifyVideo();
}

function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);

  image(video, 0, 0);

  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);

  let emoji = "💭";
  if (label == "Carrot") {
    emoji = "🥕";
  } else if (label == "Tomato") {
    emoji = "🍅";
  } else if (label == "Challah") {
    emoji = "🍞";
  } else if (label == "Apple") {
    emoji = "🍏";
  }

  textSize(128);
  text(emoji, width / 8, height / 8);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo();
}