Song1_status="";
Song2_status="";


rightWristX=0;
rightWristY=0;

leftWristX=0;
leftWristY=0;

scorerightwrist=0;
scoreleftwrist=0;

Song1 = "";
Song2 = "";

function preload()
{

Song1 = loadSound("Song1.mp3");
Song2 = loadSound("Song2.mp3");

}

function setup() 
{
 
    canvas = createCanvas(600,500);
    canvas.center();

  video= createCapture(VIDEO);
  video.hide();
  poseNet=ml5.poseNet(video,modelLoaded);
  poseNet.on('pose',gotposes);
}

function modelLoaded() {

    console.log("Model worked");
}

function gotposes(result) {
 

    if(result.length>0){
     console.log(result);

 scorerightwrist=result[0].pose.keypoints[10].score;
 scoreleftwrist=result[0].pose.keypoints[9].score;

     rightWristX=result[0].pose.rightWrist.x;
     rightWristY=result[0].pose.rightWrist.y;

     leftWristX=result[0].pose.leftWrist.x;
     leftWristY=result[0].pose.leftWrist.y;
    }
}

function draw() {

    image(video,0,0,600,500);

    Song1_status=Song1.isPlaying();
    Song2_status=Song2.isPlaying();

    fill("#3ac25e");
    stroke("#000000");

    if(scoreleftwrist>0.2){
        circle(leftWristX,leftWristY,20);
        Song2.stop();
        if(Song1_status==false){
            Song1.play();
            document.getElementById("song").innerHTML = "playing DANCE MONKEY";
        }
    }
    if(scorerightwrist>0.2){
        circle(rightWristX,rightWristY,20);
        Song1.stop();
        if(Song2_status==false){
            Song2.play();
            document.getElementById("song").innerHTML = "playing OLD TOWN ROAD";
        }
    }

}

function play() {

    Song1.play();
    Song1.setVolume(1);
    Song1.rate(1);
}