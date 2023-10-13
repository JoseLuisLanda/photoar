import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElementId } from 'src/app/collections/element';
import { DataService } from 'src/app/services/dataservice';
declare const google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  placesPublicar: ElementId[]=[{normalizedName:"negocio",code:"tulancingo",name:"Tulancingo",latitude:"20.065288",longitude:"-98.423772",position:"", description:"San jose tulancingo",location:"tulancingo"},
  {normalizedName:"negocio",code:"artesaniasgdl",name:"CreativaGDL",latitude:"20.677960",longitude:"-103.342280",position:"", description:"Tulancingo de bravo Hgo",location:"general"},
  {normalizedName:"museos",code:"citnova",name:"CITNOVA",latitude:"20.134168",longitude:"-98.802341",position:"", description:"Centro de investigación y tecnología",location:"citnova"}]
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    let map = document.getElementById('map-canvas')!;
    let lat = "20.065288";//map.getAttribute('data-lat');
    let lng = "-98.423772";//map.getAttribute('data-lng');

    //this.dataService.setItem({id:"12",name:"Hola nuevo item"});

    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        zoom: 7,
        scrollwheel: false,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},
          {"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},
          {"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},
         // {"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},
          //{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},
          //{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
          {"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},
          //{"featureType":"water","elementType":"all","stylers":[{"color":'#5e72e4'},{"visibility":"on"}]}
        ]
    }
 
    
    var marker, i;
    map = new google.maps.Map(map, mapOptions);
    for ( i = 0; i < this.placesPublicar.length; i++) {  
       marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.placesPublicar[i].latitude, this.placesPublicar[i].longitude),
        map: map,
        title:this.placesPublicar[i].name
      });

    var contentString = '<div class="info-window-content"><h2>'+this.placesPublicar[i].name+'</h2>' +
    '<p>'+this.placesPublicar[i].description+'.</p>'+
    '</div>';
    var infowindow = new google.maps.InfoWindow({
      content: contentString
  });

     // fixed always open InfoWindow
     marker.iw = new google.maps.InfoWindow();
     marker.iw.setContent(contentString);
     marker.iw.open(map, marker);

  var data = this.placesPublicar[i];
       // dynamic InfoWindow, opened on click
       ((marker, data) => {
        google.maps.event.addListener(marker, "click", () => {
          infowindow.setContent(data.description);
          infowindow.open(map, marker);
          this.dataService.setItem(data);
          this.selectLocation();
        });
      })(marker, data);


    }
   /* this.placesPublicar.forEach(place => {
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: place.name
    });

    var contentString = '<div class="info-window-content"><h2>Argon Dashboard</h2>' +
        '<p>'+place.description+'.</p>'+
        '<button class="btn btn-primary" (click)="selectLocation()">Seleccionar</button></div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(marker, 'click', () => {
        infowindow.open(map, marker);
        console.log("selection: ",marker.title +" "+ marker.position);
        this.dataService.setItem({id:"12",name:"Hola nuevo item desce selector",normalizedName:"negocio",code:"publicar3d",value:"general"});
    });
    });*/

   

  }
  selectLocation(){
    //this.dataService.setItem({id:"12",name:"Hola nuevo item desce button",normalizedName:"negocio",code:"artesaniasgdl"});
      //console.log("selection: ");
      /* this.router.navigate(['/home'])
  .then(() => {
   // window.location.reload();
  });*/
   
  this.router.navigateByUrl('/home');
  }
}
