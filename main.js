video="";
status1="";
object=[];

function preload(){
    video=createVideo('video.mp4');
    video.hide();
}
function setup(){
    canvas=createCanvas(480,360);
    canvas.center();
}
function draw(){
    image(video,0,0,480,360);
    if(status1 != ""){
        objectDetector.detect(video,gotResult);
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML="Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are : "+object.length;

            fill('#FF0000');
            percent=floor(object[i].confidence * 100);
            text(object[i].label + "" + percent + "%", object[i].x + 15, object[i].y+15 );
            noFill();
            stroke('#FF0000');
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status : Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded");
    status1 = true;
    video.loop();
    video.volume(1);
    video.speed(1);
}
function gotResult(error, results){
if(error){
    console.log(error);
}
console.log(results);
objects=results;
}
