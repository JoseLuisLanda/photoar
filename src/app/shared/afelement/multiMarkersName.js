//Multi Markers WebAR-AR.js and Aframe - Playing the Archive - Connected Environment CASA-UCL

//Global Variable
var markersURLArray=[];
var markersNameArray=[];
console.log('Add markers to the scene');
AFRAME.registerComponent('markers_start',{
	init:function(){
		console.log('Add markers to the scene');

		var sceneEl = document.querySelector('a-scene');
		
		//list of the markers
		for(var i=1; i<=4; i++)
		{
			var url="../../../assets/presets/pat"+i+".patt";
			markersURLArray.push(url);
			markersNameArray.push('Marker_'+i);
			//console.log(url);
		}

		for(var k=0; k<4; k++)
		{
			var markerEl = document.createElement('a-marker');
			markerEl.setAttribute('type','pattern');
			markerEl.setAttribute('url',markersURLArray[k]);
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
			textEl.setAttribute('material',{src: '#img'+[k], color: '#FFF'});
			textEl.object3D.position.set(0, .1, 0);
			textEl.object3D.rotation.set(-90, 0, 0);

/*
class="clickable"
      gesture-handler="minScale: 0.25; maxScale: 10"

 <a-assets>
      <img id="earth-sphere" src="../../../assets/images/earth-sphere.jpeg" />
          <a-asset-item id="back" src="../../../assets/models/hoverboard.glb"></a-asset-item>
    </a-assets>
  <a-plane id="followerPlane"
          position="0 0 0"
          position="0 1 0"
          rotation="-90 0 0"
          material="src:#earth-sphere;">
   </a-plane>
*/

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
				//window.location = 'https://www.google.com/';  //works
				console.log('Marker Found: ', markerId);
				marker.setAttribute("position", marker.getAttribute("position"));
                marker.setAttribute("rotation", marker.getAttribute("rotation"));
				marker.addEventListener("onefingermove", handleRotation);
				marker.addEventListener("twofingermove", function () {
					
						if (isMarkerVisible) {
						  this.scaleFactor *=
							1 + detail.spreadChange / detail.startSpread;
					
						  this.scaleFactor = Math.min(
							Math.max(this.scaleFactor, this.data.minScale),
							this.data.maxScale
						  );
					
						  el.object3D.scale.x = scaleFactor * initialScale.x;
						  el.object3D.scale.y = scaleFactor * initialScale.y;
						  el.object3D.scale.z = scaleFactor * initialScale.z;
						}
					  
				});
			});

			marker.addEventListener("markerLost",() =>{
				var markerId = marker.id;
				console.log('Marker Lost: ', markerId);
			});
		},
	});