//Multi Markers WebAR-AR.js and Aframe - Playing the Archive - Connected Environment CASA-UCL

//Global Variable
var markersURLArray=[];
var markersNameArray=[];
console.log('Add markers to the scene');
AFRAME.registerComponent('markers_start',{
	init:function(){
		var sceneEl = document.querySelector('a-scene');
		var tagNumberinit = document.getElementById("tagNumberinit").value;
		var tagNumberlength = document.getElementById("tagNumberlength").value;
		var tagNumberend = document.getElementById("tagNumberend").value;
		console.log('Add markers to the scene'+tagNumberinit+" "+tagNumberlength+" "+tagNumberend);
		//list of the markers
		for(var i=0; i<=tagNumberlength; i++)
		{
			var indexPath = +tagNumberinit+i;
			var url="../../../assets/presets/pat"+indexPath+".patt";
			markersURLArray.push(url);
			markersNameArray.push(i);
			//console.log(url);
		}

		for(var k=0; k<=tagNumberlength; k++)
		{
			console.log('Add markers to the scene');
			var markerEl = document.createElement('a-marker');
			markerEl.setAttribute('type','pattern');
			markerEl.setAttribute('url',markersURLArray[k]);
			//markerEl.setAttribute('url',markersNameArray[k]);
			markerEl.setAttribute('id',markersNameArray[k]);

			markerEl.setAttribute('registerevents','');
			sceneEl.appendChild(markerEl);

			//Adding text to each marker
			var textEl = document.createElement('a-image');
			
			//textEl.setAttribute('id','text');
			//textEl.setAttribute('text',{color: 'red', align: 'center', value:markersNameArray[k], width: '5.5'});
			textEl.setAttribute('id','image');
			textEl.setAttribute('class','clickable');
			textEl.setAttribute('gesture-handler',{minScale: '1', maxScale: '10'});
			textEl.setAttribute('geometry',{width:'3', height:'3'});
			textEl.setAttribute('material',{src: '#img'+[(+tagNumberinit+k)], color: '#FFF'});
			textEl.object3D.position.set(0, .1, 0);
			textEl.object3D.rotation.set(-90, 0, 0);



			markerEl.appendChild(textEl);
		}
	}
});



function handleRotation(event) {
    if (isMarkerVisible) {
      el.object3D.rotation.y +=
        event.detail.positionChange.x * rotationFactor;

      el.object3D.rotation.x +=
        event.detail.positionChange.y * rotationFactor;
    }
  }
  
//Detect marker found and lost
AFRAME.registerComponent('registerevents', {
		init: function () {
			const marker = this.el;

			marker.addEventListener("markerFound", ()=> {
				var markerId = marker.id;
				/*var value = document.getElementById("multimarkerImg").src;
				var elem = document.getElementById("multimarkertest");
				elem.setAttribute("src",value);*/
				
				//window.location = 'https://www.google.com/';  //works
				//console.log('Value to change: ', value);
				//show button for modal details, 
				document.getElementById("showModal").style.visibility = "visible";
				

				marker.setAttribute("position", marker.getAttribute("position"));
                marker.setAttribute("rotation", marker.getAttribute("rotation"));
				if(marker.id.includes("vid")){
					var indexVid = marker.title;
					//console.log("el index es: "+indexVid);
					var v = document.getElementById(""+indexVid);
					v.load();
					v.play();
					v.muted = false;
					markerid = marker.id.split("markervid_")[1];
				}else{
					markerid = marker.id.split("marker_")[1];
				}

				document.getElementById("imgIndex").value = markerid;
				
			});

			marker.addEventListener("markerLost",() =>{
				document.getElementById("showModal").style.visibility = "hidden";
				var markerId = marker.id;
				//console.log('Marker Lost: ', markerId);
				if(marker.id.includes("vid")){
					var indexVid = marker.title;
					//console.log("el index es: "+indexVid);
					document.querySelector("#"+indexVid).pause();
				}
				//var v = document.querySelector('#mivideo2').pause();
			});
		},
	});
	// Component that detects and emits events for touch gestures

AFRAME.registerComponent("gesture-detector", {
	schema: {
	  element: { default: "" }
	},
  
	init: function() {
	  this.targetElement =
		this.data.element && document.querySelector(this.data.element);
  
	  if (!this.targetElement) {
		this.targetElement = this.el;
	  }
  
	  this.internalState = {
		previousState: null
	  };
  
	  this.emitGestureEvent = this.emitGestureEvent.bind(this);
  
	  this.targetElement.addEventListener("touchstart", this.emitGestureEvent);
  
	  this.targetElement.addEventListener("touchend", this.emitGestureEvent);
  
	  this.targetElement.addEventListener("touchmove", this.emitGestureEvent);
	},
  
	remove: function() {
	  this.targetElement.removeEventListener("touchstart", this.emitGestureEvent);
  
	  this.targetElement.removeEventListener("touchend", this.emitGestureEvent);
  
	  this.targetElement.removeEventListener("touchmove", this.emitGestureEvent);
	},
  
	emitGestureEvent(event) {
	  const currentState = this.getTouchState(event);
  
	  const previousState = this.internalState.previousState;
  
	  const gestureContinues =
		previousState &&
		currentState &&
		currentState.touchCount == previousState.touchCount;
  
	  const gestureEnded = previousState && !gestureContinues;
  
	  const gestureStarted = currentState && !gestureContinues;
  
	  if (gestureEnded) {
		const eventName =
		  this.getEventPrefix(previousState.touchCount) + "fingerend";
  
		this.el.emit(eventName, previousState);
  
		this.internalState.previousState = null;
	  }
  
	  if (gestureStarted) {
		currentState.startTime = performance.now();
  
		currentState.startPosition = currentState.position;
  
		currentState.startSpread = currentState.spread;
  
		const eventName =
		  this.getEventPrefix(currentState.touchCount) + "fingerstart";
  
		this.el.emit(eventName, currentState);
  
		this.internalState.previousState = currentState;
	  }
  
	  if (gestureContinues) {
		const eventDetail = {
		  positionChange: {
			x: currentState.position.x - previousState.position.x,
  
			y: currentState.position.y - previousState.position.y
		  }
		};
  
		if (currentState.spread) {
		  eventDetail.spreadChange = currentState.spread - previousState.spread;
		}
  
		// Update state with new data
  
		Object.assign(previousState, currentState);
  
		// Add state data to event detail
  
		Object.assign(eventDetail, previousState);
  
		const eventName =
		  this.getEventPrefix(currentState.touchCount) + "fingermove";
  
		this.el.emit(eventName, eventDetail);
	  }
	},
  
	getTouchState: function(event) {
	  if (event.touches.length === 0) {
		return null;
	  }
  
	  // Convert event.touches to an array so we can use reduce
  
	  const touchList = [];
  
	  for (let i = 0; i < event.touches.length; i++) {
		touchList.push(event.touches[i]);
	  }
  
	  const touchState = {
		touchCount: touchList.length
	  };
  
	  // Calculate center of all current touches
  
	  const centerPositionRawX =
		touchList.reduce((sum, touch) => sum + touch.clientX, 0) /
		touchList.length;
  
	  const centerPositionRawY =
		touchList.reduce((sum, touch) => sum + touch.clientY, 0) /
		touchList.length;
  
	  touchState.positionRaw = { x: centerPositionRawX, y: centerPositionRawY };
  
	  // Scale touch position and spread by average of window dimensions
  
	  const screenScale = 2 / (window.innerWidth + window.innerHeight);
  
	  touchState.position = {
		x: centerPositionRawX * screenScale,
		y: centerPositionRawY * screenScale
	  };
  
	  // Calculate average spread of touches from the center point
  
	  if (touchList.length >= 2) {
		const spread =
		  touchList.reduce((sum, touch) => {
			return (
			  sum +
			  Math.sqrt(
				Math.pow(centerPositionRawX - touch.clientX, 2) +
				  Math.pow(centerPositionRawY - touch.clientY, 2)
			  )
			);
		  }, 0) / touchList.length;
  
		touchState.spread = spread * screenScale;
	  }
  
	  return touchState;
	},
  
	getEventPrefix(touchCount) {
	  const numberNames = ["one", "two", "three", "many"];
  
	  return numberNames[Math.min(touchCount, 4) - 1];
	}
  });
  /* global AFRAME, THREE */

AFRAME.registerComponent("gesture-handler", {
	schema: {
	  enabled: { default: true },
	  rotationFactor: { default: 5 },
	  minScale: { default: 0.3 },
	  maxScale: { default: 8 },
	},
  
	init: function () {
	  this.handleScale = this.handleScale.bind(this);
	  this.handleRotation = this.handleRotation.bind(this);
  
	  this.isVisible = false;
	  this.initialScale = this.el.object3D.scale.clone();
	  this.scaleFactor = 1;
  
	  this.el.sceneEl.addEventListener("markerFound", (e) => {
		this.isVisible = true;
	  });
  
	  this.el.sceneEl.addEventListener("markerLost", (e) => {
		this.isVisible = false;
	  });
	},
  
	update: function () {
	  if (this.data.enabled) {
		this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
		this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
	  } else {
		this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
		this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
	  }
	},
  
	remove: function () {
	  this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
	  this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
	},
  
	handleRotation: function (event) {
	  if (this.isVisible) {
		this.el.object3D.rotation.y +=
		  event.detail.positionChange.x * this.data.rotationFactor;
		this.el.object3D.rotation.x +=
		  event.detail.positionChange.y * this.data.rotationFactor;
	  }
	},
  
	handleScale: function (event) {
	  if (this.isVisible) {
		this.scaleFactor *=
		  1 + event.detail.spreadChange / event.detail.startSpread;
  
		this.scaleFactor = Math.min(
		  Math.max(this.scaleFactor, this.data.minScale),
		  this.data.maxScale
		);
  
		this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
		this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
		this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
	  }
	},
  });