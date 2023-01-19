import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Elemento } from 'src/app/collections/element';
@Component({
  selector: 'app-arheader',
  templateUrl: './arheader.component.html',
  styleUrls: ['./arheader.component.css']
})
export class ARHeaderComponent implements OnInit, OnChanges {
  @Output() changeModel: EventEmitter<string> = new EventEmitter<string>();
  nombreModelo: Elemento[] = [
//models tuzo
{name:"Alien plain",url:"../../../assets/models/alienplain.glb",},
{name:"Duende",url:"../../../assets/models/duende.glb",},
    {name:"Gnomo",url:"../../../assets/models/nomocut.glb",},//      36
    {name:"Gnomo 2",url:"../../../assets/models/gnomo1.glb",},
    {name:"Pitufo",url:"../../../assets/models/pitufo.glb",},
    {name:"Armadillo",url:"../../../assets/modelstuzofari/armadillo.glb",},//8    0
    {name:"Bengali",url:"../../../assets/modelstuzofari/bengal_cat.glb",},//5   1
    {name:"Lobo",url:"../../../assets/modelstuzofari/lobo_anim.glb",},//1    3 ok gde
    {name:"Pinguino",url:"../../../assets/modelstuzofari/pinguino.glb",},//.900   6
    {name:"Husky",url:"../../../assets/modelstuzofari/siberian_husky.glb",},//.925    7
//models dino
    {name:"Quetzal",url:"../../../assets/modelsjurassic/quetzalcoatlus.glb",},//21    15 ok muy grande
    {name:"Spinosaurus",url:"../../../assets/modelsjurassic/spinosaurus.glb",},//7    16 ok gde
    {name:"Suchimimus",url:"../../../assets/modelsjurassic/suchomimus.glb",},//2.6     18  ok
    {name:"Toros",url:"../../../assets/modelsjurassic/torosaurus.glb",},//1    19   ok
    {name:"Velociraptor",url:"../../../assets/modelsjurassic/velociraptor.glb",},//4    21   ok


    {name:"Spider B",url:"../../../assets/models/spideblack.glb",},//4.16    22
    {name:"Superman",url:"../../../assets/models/superman.glb",},//9.94    23
    {name:"Batman",url:"../../../assets/models/batman_photogrammetry_scan.glb",},//10.54   24
    {name:"Capitan",url:"../../../assets/models/captain_marvel.glb",},//1.91                25 
    {name:"Venom",url:"../../../assets/models/2018_venom.glb",},//10.89                   26
    {name:"Venom war",url:"../../../assets/models/venom_marvel_super_war.glb",},//2.07        27
    {name:"Spide red",url:"../../../assets/models/spider-man_-_hybrid_suit.glb",},//1.24      28   16

    {name:"OFO",url:"../../../assets/models/ufo_doodle.glb",},//9.12
    {name:"Alien",url:"../../../assets/models/alien.glb",},//3.17
    {name:"Astronauta",url: "../../../assets/models/Astronaut.glb",},//2.74
    {name:"Piramide",url: "../../../assets/models/egyptian_pyramid.glb",},//4.41
    {name:"Jaguar",url:"../../../assets/models/jaguar_staircase_at_the_east_court_of_copan.glb",},//11.22    21
  
    {name:"Jaguar1",url: "../../../assets/models/jaguar.glb",},//    22
    {name:"Puma",url: "../../../assets/models/puma_gray.glb",},//   23
    {name:"Jaguar anim",url: "../../../assets/models/jaguar_animation.glb",},//    24
    {name:"Maya jaguar",url:"../../../assets/models/mayan_jaguar.glb",},//    25
  
    {name:"Piramide",url:"../../../assets/models/piramide.glb", },//   26
  
    {name:"Ovni",url:"../../../assets/models/ovni_low_poly.glb",},
    {name:"Piramide",url:"../../../assets/models/piramid.glb",},
  
    {name:"Platillo",url:"../../../assets/models/plato_volador_amina.glb", },//      29

    {name:"Delorean",url:"../../../assets/models/delorean_highpoly.glb",},
    {name:"DMC",url:"../../../assets/models/delorean_dmc_12.glb",},
    {name:"Nasi",url:"../../../assets/models/nasi_lemak.glb",},
    {name:"DMC12",url:"../../../assets/models/delorean__dmc-12.glb",},
    {name:"Parzival",url:"../../../assets/models/parzivals_delorean_dmc-12.glb",},//     34
    {name:"Patineta",url:"../../../assets/models/hoverboard.glb",},
    {name:"Hoverboard",url:"../../../assets/models/hover_board_low_poly.glb",},//      36
    {name:"Macfly",url:"../../../assets/models/marty_mcfly.glb",},
    {name:"IronMan lata",url:"../../../assets/models/ironman.glb",},//      38
    {name:"Ironman red",url:"../../../assets/models/iron_n_r.glb",},

    //      


];
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("onchanges arheader");
    
  }

  ngOnInit(): void {
  }
  sendModel(modelName: any){
    console.log("sending modelo: " + modelName);

    this.changeModel.emit(modelName);

  }
  
}
