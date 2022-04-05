song ="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
score_leftWrist=0;

function preload(){
   song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is initialised!");
}

function draw(){
    image(video, 0, 0, 600, 500);

    if(score_leftWrist>0.2){
    fill('turquoise');
    stroke('teal');
    circle(leftWristX, leftWristY, 20);

    inNumberLeftWristY= Number(leftWristY);
    remove_decimal= floor(inNumberLeftWristY);
    volume= remove_decimal/500;
    
    document.getElementById("volume").innerHTML="Volume : " + volume;
    song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length > 0 ){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("left Wrist X : " + leftWristX + "Left Wrist Y : " + leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("right Wrist X : " + rightWristX + "right Wrist Y : " + rightWristY);

        score_leftWrist=results[0].pose.keypoints[9].score;
        console.log(score_leftWrist);
    }
}
