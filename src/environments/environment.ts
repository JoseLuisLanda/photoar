// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serviceURL : "http://localhost:5000/apisvc/us-central1/api",
   firebaseConfig : {
    apiKey: "AIzaSyAEvhG7q00C_Q58kNx2WrB-M3yUVuK6nU8",
    authDomain: "uptamira.firebaseapp.com",
    projectId: "uptamira",
    storageBucket: "uptamira.appspot.com",
    messagingSenderId: "588176673481",
    appId: "1:588176673481:web:1714763c5dc49d5ad2db18",
    measurementId: "G-9RH6MVJY3R"
  },
  firebase: {
    apiKey: "AIzaSyAEvhG7q00C_Q58kNx2WrB-M3yUVuK6nU8",
    authDomain: "uptamira.firebaseapp.com",
    projectId: "uptamira",
    storageBucket: "uptamira.appspot.com",
    messagingSenderId: "588176673481",
    appId: "1:588176673481:web:1714763c5dc49d5ad2db18",
    measurementId: "G-9RH6MVJY3R"
  },
  prompts : 
    ["quiero","dame","enseñame","dime","proyecta","muestrame","muéstrame", "busca","búscame","buscame","muestra","buscar","mostrar","listar"],

    folders :  
    ["servicio","servicios","producto","museo","museos","productos","postgrado","negocio","negocios","vulcanizadora","posgrado","beca", "anuncio", "curso","laboratorio","convocatoria","edificio","aviso"]
    ,
  places : ["upt","tulancingo","region","alrededor","Tulancingo"],
  conectors : ["en","de","el","al","sobre"],
  itemAR:  {
    uid: 'sky',
    name: '../../../assets/models/Astronaut.glb',
    type:"image",
    areas:[{name:"general",code:"general",normalizedName:"general"}],
    codes:["general"],
    images:[{name:"test1",type:"image"},{name:"test1",type:"image"}]
  },
  arElements : [
    //models tuzo
    { name: "Comida", url: "../../../assets/models/menu_chico.glb", },
    { name: "bebida", url: "../../../assets/models/menu_close.glb", },
    { name: "delorean Cube", url: "../../../assets/models/delorean_cube.glb", },
    { name: "orange Cube", url: "../../../assets/models/orange_cube.glb", },
    { name: "ChaseCube", url: "../../../assets/models/chase_cube.glb", },
    { name: "Backboardv", url: "../../../assets/models/backboardv.glb", },
    { name: "Backboard", url: "../../../assets/models/backboard.glb", },
    { name: "Backfuture", url: "../../../assets/models/backfuture.glb", },
    { name: "comida", url: "../../../assets/models/comida.glb", },
    { name: "bebida", url: "../../../assets/models/bebida.glb", },


    { name: "Chase", url: "../../../assets/models/chase.glb", },
    { name: "Everest", url: "../../../assets/models/everest.glb", },
    { name: "Marshall", url: "../../../assets/models/marshall.glb", },
    //{ name: "Paw", url: "../../../assets/models/patrol_all_tuzoo.glb", },
    //{ name: "Patrulla", url: "../../../assets/models/paw_patrol_all.glb", },
    { name: "Skye", url: "../../../assets/models/skye.glb", },
    //{ name: "Tracker", url: "../../../assets/models/tracker_tuzoo.glb", },
    //{ name: "Zuma", url: "../../../assets/models/zuma_tuzoo.glb", },
    { name: "Rubble", url: "../../../assets/models/rubble.glb", },
    { name: "Tracker", url: "../../../assets/models/tracker.glb", },
    //{ name: "Zuma", url: "../../../assets/models/zuma_tuzoo.glb", },
    //{ name: "Rubble", url: "../../../assets/models/rubble_tuzoo.glb", },
  
    
    { name: "Luli tuzo", url: "../../../assets/models/lulilast.glb", },
    /*{ name: "Duende", url: "../../../assets/models/duende.glb", },
    { name: "Gnomo", url: "../../../assets/models/nomocut.glb", },//      36
    { name: "Gnomo 2", url: "../../../assets/models/gnomo1.glb", },
    { name: "Pitufo", url: "../../../assets/models/pitufo.glb", },
    { name: "Armadillo", url: "../../../assets/modelstuzofari/armadillo.glb", },//8    0
    { name: "Bengali", url: "../../../assets/modelstuzofari/bengal_cat.glb", },//5   1
    { name: "Lobo", url: "../../../assets/modelstuzofari/lobo_anim.glb", },//1    3 ok gde
    { name: "Pinguino", url: "../../../assets/modelstuzofari/pinguino.glb", },//.900   6
    { name: "Husky", url: "../../../assets/modelstuzofari/siberian_husky.glb", },//.925    7*/
    //models dino
    { name: "Quetzal", url: "../../../assets/modelsjurassic/quetzalcoatlus.glb", },//21    15 ok muy grande
    { name: "Spinosaurus", url: "../../../assets/modelsjurassic/spinosaurus.glb", },//7    16 ok gde
    { name: "Suchimimus", url: "../../../assets/modelsjurassic/suchomimus.glb", },//2.6     18  ok
    { name: "Toros", url: "../../../assets/modelsjurassic/torosaurus.glb", },//1    19   ok
    { name: "Velociraptor", url: "../../../assets/modelsjurassic/velociraptor.glb", },//4    21   ok


    { name: "Spider B", url: "../../../assets/models/spideblack.glb", },//4.16    22
    { name: "Superman", url: "../../../assets/models/superman.glb", },//9.94    23
    { name: "Batman", url: "../../../assets/models/batman_photogrammetry_scan.glb", },//10.54   24
    { name: "Capitan", url: "../../../assets/models/captain_marvel.glb", },//1.91                25 
    { name: "Venom", url: "../../../assets/models/2018_venom.glb", },//10.89                   26
    { name: "Venom war", url: "../../../assets/models/venom_marvel_super_war.glb", },//2.07        27
    { name: "Spide red", url: "../../../assets/models/spider-man_-_hybrid_suit.glb", },//1.24      28   16

   /* { name: "OFO", url: "../../../assets/models/ufo_doodle.glb", },//9.12
    { name: "Alien", url: "../../../assets/models/alien.glb", },//3.17
    { name: "Astronauta", url: "../../../assets/models/Astronaut.glb", },//2.74
    { name: "Piramide", url: "../../../assets/models/egyptian_pyramid.glb", },//4.41
    { name: "Jaguar", url: "../../../assets/models/jaguar_staircase_at_the_east_court_of_copan.glb", },//11.22    21

    { name: "Jaguar1", url: "../../../assets/models/jaguar.glb", },//    22
    { name: "Puma", url: "../../../assets/models/puma_gray.glb", },//   23
    { name: "Jaguar anim", url: "../../../assets/models/jaguar_animation.glb", },//    24
    { name: "Maya jaguar", url: "../../../assets/models/mayan_jaguar.glb", },//    25

    { name: "Piramide", url: "../../../assets/models/piramide.glb", },//   26

    { name: "Ovni", url: "../../../assets/models/ovni_low_poly.glb", },
    { name: "Piramide", url: "../../../assets/models/piramid.glb", },

    { name: "Platillo", url: "../../../assets/models/plato_volador_amina.glb", },//      29*/

    { name: "Delorean", url: "../../../assets/models/delorean_highpoly.glb", },
    { name: "DMC", url: "../../../assets/models/delorean_dmc_12.glb", },
   // { name: "Nasi", url: "../../../assets/models/nasi_lemak.glb", },
    { name: "DMC12", url: "../../../assets/models/delorean__dmc-12.glb", },
    { name: "Parzival", url: "../../../assets/models/parzivals_delorean_dmc-12.glb", },//     34
    { name: "Patineta", url: "../../../assets/models/hoverboard.glb", },
    { name: "Hoverboard", url: "../../../assets/models/hover_board_low_poly.glb", },//      36
    { name: "Macfly", url: "../../../assets/models/marty_mcfly.glb", },
    { name: "IronMan lata", url: "../../../assets/models/ironman.glb", },//      38
    { name: "Ironman red", url: "../../../assets/models/iron_n_r.glb", },

    //      


  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
