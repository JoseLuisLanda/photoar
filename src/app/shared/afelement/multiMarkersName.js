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
			var size = 2;
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