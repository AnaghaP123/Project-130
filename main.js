song1 = "";
song2 = "";
leftX = 0;
leftY = 0;
rightX = 0;
rightY = 0;
scoreLeft = 0;
scoreRight = 0;
songStatus1 = "";
songStatus2 = "";

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(500,600)
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet (video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("Model has been loaded.");
}

function draw()
{
    image(video, 0, 0, 500, 600);

    fill("#FF0000");
    stroke("#FF0000");
    songStatus1 = song1.isPlaying();
    songStatus2 = song2.isPlaying();

    if(scoreLeft > 0.2)
    {
        circle(leftX, leftY, 20);
        song2.stop();
    
        if(songStatus1 = "false")
        {
            song1.play();
            document.getElementById("song_name").innerHTML = "Harry Potter is playing."
        }
    }
    if(scoreRight > 0.2)
    {
        circle(rightX, rightY, 20);
        song1.stop();
    
        if(songStatus2 = "false")
        {
            song2.play();
            document.getElementById("song_name").innerHTML = "Peter Pan is playing."
        }
    }
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        scoreLeft = results[0].pose.keypoints[9].score;
        scoreRight = results[0].pose.keypoints[10].score;

        leftX = results[0].pose.leftWrist.x;
        leftY = results[0].pose.leftWrist.y;
        rightX = results[0].pose.rightWrist.x;        
        rightY = results[0].pose.rightWrist.y;
        
        console.log("Left Wrist: X - " + leftX + " & Y - " + leftY);
        console.log("Right Wrist: X - " + rightX + " & Y - " + rightY);        
    }
}