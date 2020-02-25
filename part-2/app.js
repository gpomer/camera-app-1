// Set constraints for the video stream
var user = 'user';
var constraints;
var track = null;
var baseImage = 'mrbump.png';
var videoWidthDesired = window.screen.availWidth;
var videoHeightDesired = window.screen.availHeight;
var left_overlay =  -window.screen.availWidth*.1;
var top_overlay =  window.screen.availHeight*.1;
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

function startup() {
    console.dir('startup touch');
    var el = window;
    el.addEventListener("touchstart", handleStart, false);
    el.addEventListener("touchend", handleEnd, false);
    el.addEventListener("touchcancel", handleCancel, false);
    el.addEventListener("touchmove", handleMove, false);
}

window.addEventListener("load", startup, false);

function handleStart(evt) {
    evt.preventDefault();
    console.log("touchstart.");
    var el = document.querySelector("#canvas");
    var ctx = el.getContext("2d");
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        console.log("touchstart:" + i + "...");
        ongoingTouches.push(copyTouch(touches[i]));
        var color = colorForTouch(touches[i]);
        ctx.beginPath();
        ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
        ctx.fillStyle = color;
        ctx.fill();
        console.log("touchstart:" + i + ".");
    }
}

function handleMove(evt) {
    evt.preventDefault();
    var el = document.getElementById("canvas");
    var ctx = el.getContext("2d");
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        var color = colorForTouch(touches[i]);
        var idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            console.log("continuing touch "+idx);
            ctx.beginPath();
            console.log("ctx.moveTo(" + ongoingTouches[idx].pageX + ", " + ongoingTouches[idx].pageY + ");");
            ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
            console.log("ctx.lineTo(" + touches[i].pageX + ", " + touches[i].pageY + ");");
            ctx.lineTo(touches[i].pageX, touches[i].pageY);
            ctx.lineWidth = 4;
            ctx.strokeStyle = color;
            ctx.stroke();

            ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
            console.log(".");
        } else {
            console.log("can't figure out which touch to continue");
        }
    }
}

function handleEnd(evt) {
    evt.preventDefault();
    log("touchend");
    var el = document.getElementById("canvas");
    var ctx = el.getContext("2d");
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        var color = colorForTouch(touches[i]);
        var idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            ctx.lineWidth = 4;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
            ctx.lineTo(touches[i].pageX, touches[i].pageY);
            ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);  // and a square at the end
            ongoingTouches.splice(idx, 1);  // remove it; we're done
        } else {
            console.log("can't figure out which touch to end");
        }
    }
}

function handleCancel(evt) {
    evt.preventDefault();
    console.log("touchcancel.");
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        var idx = ongoingTouchIndexById(touches[i].identifier);
        ongoingTouches.splice(idx, 1);  // remove it; we're done
    }
}
// Access the device camera and stream to cameraView
function cameraStart() {
    constraints = { video: { facingMode: user }, audio: false };
    console.dir(constraints);
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
            var settings = stream.getTracks()[0].getSettings();
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
//    console.dir([left_overlay,top_overlay]);
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    console.dir([cameraSensor.width,cameraSensor.height])
    console.dir([document.querySelector("#camera").clientWidth,document.querySelector("#camera").clientHeight])
    //getResolution();
            //alert("W/H: "+window.screen.availWidth + " x " + window.screen.availHeight + '='+window.screen.availWidth/window.screen.availHeight);
            //alert("W/H: "+left_overlay + " x " + top_overlay + '='+left_overlay/top_overlay);
            //alert("W/H: "+window.screen.availWidth + "->"+left_overlay/window.screen.availWidth + " x " + window.screen.availHeight + '->'+top_overlay/window.screen.availHeight);
            document.querySelector("#imageTaken img").style.width = (document.querySelector("#camera").clientWidth * .1);
            document.querySelector("#imageTaken img").style.height = (document.querySelector("#camera").offsetHeight * .125);
            base_image = new Image();
            base_image.src = baseImage;
            base_image.onload = function(){
//                console.dir([base_image.width,base_image.height]);
                var final_left_overlay = ((left_overlay ) / (document.querySelector("#camera").clientWidth)) * (cameraSensor.width);
                var final_top_overlay  = ((top_overlay) / (document.querySelector("#camera").clientHeight)) * (cameraSensor.height);
//                console.dir([left_overlay,final_left_overlay,top_overlay,final_top_overlay]);
                var scale_factor_x = cameraSensor.width/document.querySelector("#camera").clientWidth;
                var scale_factor_y = cameraSensor.width/document.querySelector("#camera").clientWidth;
                scale_x = base_image.width * scale_factor_x;
                scale_y = base_image.height  * scale_factor_y;
//                console.dir([scale_factor_x,scale_x,scale_factor_y,scale_y]);
              cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
              cameraSensor.getContext("2d").drawImage(base_image, final_left_overlay, final_top_overlay+40, scale_x, scale_y);
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

cameraSwitch.onclick = function() {
  user == 'user' ? user = 'environment' : user = 'user';
  console.dir(user);
  track.stop();
  cameraStart();
};
pigeonSwitch.onclick = function() {
  left_overlay =  -window.screen.availWidth*.1;
  top_overlay =  window.screen.availHeight*.1;
  baseImage = 'pigeon.png';
  hideAll();
  document.querySelector("#pigeon--overlay").style.visibility = 'visible';
  document.querySelector("#pigeon--switch").style.background = 'yellow';
  console.dir('switched image');
  dragElement(document.querySelector("#pigeon--overlay"));
};

knuffleSwitch.onclick = function() {
  left_overlay =  -window.screen.availWidth*.1;
  top_overlay =  window.screen.availHeight - (document.querySelector("#camera").clientHeight * .35);
  baseImage = 'knuffle.png';
  hideAll();
  document.querySelector("#knuffle--overlay").style.visibility = 'visible';
  document.querySelector("#knuffle--switch").style.background = 'yellow';
  console.dir('switched image');
  dragElement(document.querySelector("#knuffle--overlay"));
};

mrbumpSwitch.onclick = function() {
  left_overlay =  -window.screen.availWidth*.1;
  top_overlay =  window.screen.availHeight* - (window.screen.availHeight*.1);
  baseImage = 'mrbump.png';
  hideAll();
  document.querySelector("#mrbump--overlay").style.visibility = 'visible';
  document.querySelector("#mrbump--switch").style.background = 'yellow';
  console.dir('switched image');
  dragElement(document.querySelector("#mrbump--overlay"));
};

underpantsSwitch.onclick = function() {
  left_overlay =  -window.screen.availWidth*.1;
  top_overlay =  window.screen.availHeight* - (window.screen.availHeight*.1);
  baseImage = 'underpants.png';
  hideAll();
  document.querySelector("#underpants--overlay").style.visibility = 'visible';
  document.querySelector("#underpants--switch").style.background = 'yellow';
  console.dir('switched image');
  dragElement(document.querySelector("#underpants--overlay"));
};

caterpillarSwitch.onclick = function() {
  left_overlay =  -window.screen.availWidth*.1;
  top_overlay =  window.screen.availHeight*.1;
  left_overlay = left_overlay + 200;
  top_overlay = top_overlay + 100;
  baseImage = 'caterpillar.png';
  hideAll();
  document.querySelector("#caterpillar--overlay").style.visibility = 'visible';
  document.querySelector("#caterpillar--switch").style.background = 'yellow';
  console.dir('switched image');
  dragElement(document.querySelector("#caterpillar--overlay"));
};

brownbearSwitch.onclick = function() {
  left_overlay =  -window.screen.availWidth*.1;
  top_overlay =  window.screen.availHeight*.1;
  baseImage = 'brownbear.png';
  hideAll();
  document.querySelector("#brownbear--overlay").style.visibility = 'visible';
  document.querySelector("#brownbear--switch").style.background = 'yellow';
  console.dir('switched image');
  dragElement(document.querySelector("#brownbear--overlay"));
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
