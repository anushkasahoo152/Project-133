Status = "";
fruit_img = "";
objects = [];
function preload() {
    fruits_img = loadImage('fruit.jpg');
}
function setup() {
    canvas = createCanvas(640,420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = 'Status: Detecting Objects';
}
function modelLoaded() {
    console.log('Model Loaded!')
    Status = true;
    objectDetector.detect(fruit_img , gotResult);
    }
function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}    
function draw() {
    if(Status != "") {
        objectDetector.detect(fruits_img, gotResult);
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = 'Status: Object Detected';
            document.getElementById("object_detected").innerHTML = 'There are 2s objects in the image from which cocossd model has detected '+objects.length+' objects';
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+''+percent+'%', objects[i].x ,objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 
        }
    }
}
function back() {
    window.location = "index.html"; 
}