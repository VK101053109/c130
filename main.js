lwx = "";
lwy = "";
rwx = "";
rwy = "";
lwscore = "";
rwscore = "";

song1_status = "";
song1 = "";
song2 = "";

function preload() {
    song2 = loadSound("harrypotter.mp3");
    song1 = loadSound("peterpan.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600, 500);
    video.hide();
    posenet = ml5.poseNet(video, modelready);
    posenet.on("pose", got);
}

function modelready() {
    console.log("model is working!!!");
}

function got(r) {
    if (r.length > 0) {
        lwx = r[0].pose.leftWrist.x;
        lwy = r[0].pose.leftWrist.y;
        rwx = r[0].pose.rightWrist.x;
        rwy = r[0].pose.rightWrist.y;
        lwscore = r[0].pose.keypoints[9].score;
        rwscore = r[0].pose.keypoints[10].score;
    }

}

function draw() {
    image(video, 0, 0, 600, 500);
    stroke("black");
    fill("red");
    if (lwscore > 0.2) {
        circle(lwx, lwy, 20);
        song2.stop();
        if (song1.isPlaying() == false) {
            song1.play();
            document.getElementById("m_name").innerHTML = "peterpan";
        }
    }
    if (rwscore > 0.2) {
        circle(rwx,rwy, 20);
        song1.stop();
        if (song2.isPlaying() == false) {
            song2.play();
            document.getElementById("m_name").innerHTML = "harrypotter";
        }
    }



}