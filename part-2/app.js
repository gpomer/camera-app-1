// Set constraints for the video stream
var user = 'user';
var constraints;
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    cameraSwitch = document.querySelector("#camera--switch");

// Access the device camera and stream to cameraView
function cameraStart() {
    constraints = { video: { facingMode: user }, audio: false };
    console.dir(constraints);
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

cameraSwitch.onclick = function() {
  user == 'user' ? user = 'environment' : user = 'user';
  console.dir(user);
  cameraStart();
};

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
            base_image = new Image();
            base_image.src = 'knuffle.png';
            base_image.onload = function(){
              cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
              cameraSensor.getContext("2d").drawImage(base_image, -150, 150);
              cameraOutput.src = cameraSensor.toDataURL("image/webp");
              cameraOutput.classList.add("taken");
           }
//    cameraSensor.getContext("2d").drawImage(base_image, 0, 0);
    // track.stop();
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);


// Install ServiceWorker
if ('serviceWorker' in navigator) {
  console.log('CLIENT: service worker registration in progress.');
  navigator.serviceWorker.register( '/camera-app-1/part-2/sw.js' , { scope : ' ' } ).then(function() {
    console.log('CLIENT: service worker registration complete.');
  }, function() {
    console.log('CLIENT: service worker registration failure.');
  });
} else {
  console.log('CLIENT: service worker is not supported.');
}
