// Set constraints for the video stream
var user = 'user';
var constraints;
var track = null;
var baseImage = 'mrbump.png';
var videoWidthDesired = window.screen.width;
var videoHeightDesired = window.screen.height;
var left_overlay =  -(window.screen.width * .1);
var top_overlay =  (window.screen.height * .1);
var scale_x = 100;
var scale_y = 100;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    cameraSwitch = document.querySelector("#camera--switch"),
    imageTakenBox = document.querySelector("#imageTakenBox--view"),
    imageTakenBoxCanvas = document.querySelector("#imageTakenBox--canvas"),
    knuffleSwitch = document.querySelector("#knuffle--switch"),
    mrbumpSwitch = document.querySelector("#mrbump--switch"),
    underpantsSwitch = document.querySelector("#underpants--switch"),
    pigeonSwitch = document.querySelector("#pigeon--switch"),
    caterpillarSwitch = document.querySelector("#caterpillar--switch"),
    brownbearSwitch = document.querySelector("#brownbear--switch");

// Access the device camera and stream to cameraView
function cameraStart() {
    constraints = { video: { facingMode: user, width: videoWidthDesired, height: videoHeightDesired }, audio: false };
    console.dir(constraints);
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
            /*
            imageTakenBox.srcObject = stream;
            base_image = new Image();
            base_image.src = baseImage;
            base_image.onload = function(){
            imageTakenBoxCanvas.getContext("2d").clearRect(0, 0, imageTakenBoxCanvas.width+4, imageTakenBoxCanvas.height+4);
              imageTakenBoxCanvas.getContext("2d").drawImage(cameraView, 0, 0);
              imageTakenBoxCanvas.getContext("2d").drawImage(base_image, left_overlay, top_overlay);
              imageTakenBoxCanvas.src = cameraSensor.toDataURL("image/webp");
           }
           */
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;

    //getResolution();
           // alert("W/H: "+cameraView.videoWidth + " x " + cameraView.videoHeight);

    document.querySelector("#imageTaken img").style.width = window.screen.width * .2;
    document.querySelector("#imageTaken img").style.height = window.screen.height * .2;
            base_image = new Image();
            base_image.src = baseImage;
            base_image.onload = function(){
              cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
              cameraSensor.getContext("2d").drawImage(base_image, left_overlay, top_overlay - 150);
              cameraOutput.src = cameraSensor.toDataURL("image/webp");
              cameraOutput.classList.add("taken");
           }
           //cameraOutput.classList.remove("taken");
           //sleep(1).then(() => {
           //console.dir('slept');
           //cameraSensor.getContext("2d").clearRect(0, 0, imageTakenBoxCanvas.width+4, imageTakenBoxCanvas.height+4);
            
           //});
//    cameraSensor.getContext("2d").drawImage(base_image, 0, 0);
    // track.stop();
};

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

cameraSwitch.onclick = function() {
  user == 'user' ? user = 'environment' : user = 'user';
  console.dir(user);
  track.stop();
  cameraStart();
};
pigeonSwitch.onclick = function() {
  baseImage = 'pigeon.png';
  hideAll();
  left_overlay =  -(window.screen.width * .08);
  top_overlay =  (window.screen.height * .2);
  document.querySelector("#pigeon--overlay").style.visibility = 'visible';
  document.querySelector("#pigeon--switch").style.background = 'yellow';
  console.dir('switched image');
};

knuffleSwitch.onclick = function() {
  baseImage = 'knuffle.png';
  hideAll();
  document.querySelector("#knuffle--overlay").style.visibility = 'visible';
  document.querySelector("#knuffle--switch").style.background = 'yellow';
  console.dir('switched image');
};

mrbumpSwitch.onclick = function() {
  baseImage = 'mrbump.png';
  hideAll();
  document.querySelector("#mrbump--overlay").style.visibility = 'visible';
  document.querySelector("#mrbump--switch").style.background = 'yellow';
  console.dir('switched image');
};

underpantsSwitch.onclick = function() {
  baseImage = 'underpants.png';
  left_overlay =  -(window.screen.width *.25);
  top_overlay =  (window.screen.width *.1);
  //scale_x = 80;
  //scale_y=80;
  hideAll();
  document.querySelector("#underpants--overlay").style.visibility = 'visible';
  document.querySelector("#underpants--switch").style.background = 'yellow';
  console.dir('switched image');
};

caterpillarSwitch.onclick = function() {
  baseImage = 'caterpillar.png';
  hideAll();
  document.querySelector("#caterpillar--overlay").style.visibility = 'visible';
  document.querySelector("#caterpillar--switch").style.background = 'yellow';
  console.dir('switched image');
};

brownbearSwitch.onclick = function() {
  baseImage = 'brownbear.png';
  hideAll();
  document.querySelector("#brownbear--overlay").style.visibility = 'visible';
  document.querySelector("#brownbear--switch").style.background = 'yellow';
  console.dir('switched image');
};

function hideAll() {
  highlightedItems = document.querySelectorAll(".overlay");
  highlightedItems.forEach(function(overlayItem) {
    overlayItem.style.visibility = 'hidden';
  });
  iconItems = document.querySelectorAll(".icon-switch");
  iconItems.forEach(function(iconItem) {
    iconItem.style.background = 'black';
  });
}


// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
window.addEventListener("load", getPosition(document.querySelector("#mrbump--overlay")), false);
dragElement(document.querySelector("#mrbump--overlay"));

    function getResolution() {
        alert("W/H: "+window.screen.width + " x " + window.screen.height + "\nYour screen resolution is: " + window.screen.width * window.devicePixelRatio + "x" + window.screen.height * window.devicePixelRatio);
    }

    function getResolution(video) {
        alert("W/H: "+window.screen.width + " x " + window.screen.height + "\nYour screen resolution is: " + window.screen.width * window.devicePixelRatio + "x" + window.screen.height * window.devicePixelRatio);
    }

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    getPosition(elmnt);
  }
}

function getPosition(el) {
  var xPos = 0;
  var yPos = 0;

  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }


  //alert("x:"+xPos+" y:"+yPos);
  //document.querySelector("#xPos").innerHTML = xPos;
  //document.querySelector("#yPos").innerHTML = yPos;
  left_overlay = xPos;
  top_overlay = yPos;
  //cameraStart();
  return {
    x: xPos,
    y: yPos
  };
}


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
