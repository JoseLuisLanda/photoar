import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ElementId } from 'src/app/collections/element';
import { UserModel } from 'src/app/collections/user.model';
import { AfsService } from '../services/afs.service';
import * as firebase from 'firebase/compat';
//import * as firebase from 'firebase/compat/';
@Component({
  selector: 'app-elementform',
  templateUrl: './elementform.component.html',
  styleUrls: ['./elementform.component.css']
})
export class ElementformComponent implements OnInit, OnChanges {
  hastags:string[]=[];
  folders: ElementId[]=[{ uid: '1', name: 'Negocio', description: 'negocio' },{ uid: '2', name: 'Playera', description: 'playera' },{ uid: '3', name: 'Foto', description: 'foto' }];
  forma: FormGroup = this.fb.group({} as ElementId);
  @Input() isNewElement: boolean = false;
  @Input() item: ElementId = {name:"",description:""} as ElementId;
  @Input() profile: UserModel = {} as UserModel;
  @Input() editingProfile: boolean = false;
  @Input() element: string = "negocio";
  @Output() addItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output() itemSaved: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() backProfile: EventEmitter<boolean> = new EventEmitter<boolean>();
  images:ElementId[];
  formElement : any;
  uploadImage = false;
  uploadType = "image";
  uploadIndex = 0;
  elemUploadIndex = 0;
  edit = false;
  code:string = "";
  //private storageRef = firebase.default.storage().ref();

  constructor(private fb: FormBuilder, private afsService : AfsService) { 
   
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.hastags = this.item.codes?this.item.codes:this.hastags;
    console.log("id: "+this.item.id);
    //this.crearFormulario();
  }
  uploadImgToggle(uploadType: string, uploadIndex: number = 0, elemUploadIndex: number = 0, edit: boolean = false){
    this.uploadImage = !this.uploadImage;
    if(this.uploadImage)
    {
      this.uploadType = uploadType;
      this.uploadIndex = uploadIndex;
      this.elemUploadIndex = elemUploadIndex;
      this.edit = edit;
    }
  }
  crearFormulario() {
    this.formElement = this.item;
    
    if(this.item!== undefined)
    {
    this.formReset();
   //console.log("formelement: "+JSON.stringify(this.formElement)+"item: "+JSON.stringify(this.item))
    
     // this.formElement = this.item;
      if(this.item.uid === undefined || this.item.uid === null)
    {
      const id = this.afsService.createId();
      this.formElement.id = id;
      this.item.id = this.item.id;
    }else this.item.id = this.item.uid;
    //}
    this.item.url = this.element+'/'+this.item.id;
    //console.log("form datebirth: "+JSON.stringify(this.formElement.dateBirth))
    this.forma = this.fb.group(this.formElement);
    //ading default fields to form name and description
    this.formElement.displayName !== undefined ? this.addTextInput('carpeta', this.formElement.displayName != null ? this.formElement.displayName : "") : null;
    this.formElement.name !== undefined ? this.addTextInput('name', this.formElement.name != null ? this.formElement.name : "") : null;
    this.formElement.owner !== undefined ? this.addTextInput('owner', this.formElement.owner != null ? this.formElement.owner : "") : null;
    this.formElement.autor !== undefined ? this.addTextInput('autor', this.formElement.autor != null ? this.formElement.autor : "") : null;
    this.formElement.code !== undefined ? this.addTextInput('code', this.formElement.code != null ? this.formElement.code : "") : null;
    this.formElement.indexInit !== undefined ? this.addNumberInput('indexInit', this.formElement.indexInit != null ? this.formElement.indexInit : 1) : null;
    this.formElement.link !== undefined ? this.addTextInput('link', this.formElement.link != null ? this.formElement.link : "") : null;
    this.formElement.pais !== undefined ? this.addTextInputOp('pais', this.formElement.pais != null ? this.formElement.pais : "") : null;
    this.formElement.genero !== undefined ? this.addTextInputOp('genero', this.formElement.genero != null ? this.formElement.genero : "") : null;
    this.formElement.dateBirth !== undefined ? this.addTextInputOp('dateBirth', this.formElement.dateBirth != null ? this.formElement.dateBirth : "") : null;
    this.formElement.description !== undefined ? this.addTextInput('description',
      this.formElement.description != null ? this.formElement.description : "") : null;
   // this.item.status !== undefined ? this.agregarStatus() : null;
   this.formElement.title !== undefined ? this.addTextInput('title', this.formElement.title != null ? this.formElement.title : "") : null;

    this.formElement.displayName != undefined ? this.addTextInput('displayName',
      this.formElement.displayName != null ? this.formElement.displayName : '') : null;
  }
  }
  //ADDING FIELDS
  
  addTextInput(field: string, value: string) {
    this.forma.setControl(field, this.fb.control(value, [Validators.required, Validators.minLength(5)]));
  }
  addTextInputOp(field: string, value: string) {
    this.forma.setControl(field, this.fb.control(value));
  }
  addNumberInput(field: string, value: number) {
    this.forma.setControl(field, this.fb.control(value, [Validators.required, Validators.min(0), Validators.max(1000000000000000)]));
  }
  agregarName() {
    let enabled = this.formElement.name !== '' ? true : false;
    this.forma.setControl('name', this.fb.control({ value: this.formElement.name, disabled: enabled }, [Validators.required, Validators.minLength(6)]));
  }
  formReset() {
    this.forma.reset();
  }

  //DELETINGS CONTROLS
  deleteControl(element: string) {
    this.forma.removeControl(element);
  }

  get codeNoValido() {
    return this.forma.get('code')!.invalid && this.forma.get('code')!.touched
  }
  
  get descriptionNoValido() {
    return this.forma.get('description')!.invalid && this.forma.get('description')!.touched
  }
  get indexInitNoValido() {
    return this.forma.get('indexInit')!.invalid && this.forma.get('indexInit')!.touched
  }
  get displayNameNoValido() {
    return this.forma.get('displayName')!.invalid && this.forma.get('displayName')!.touched
  }
  get correoNoValido() {
    return this.forma.get('email')!.invalid && this.forma.get('email')!.touched
  }
  get nombreNoValido() {
    return this.forma.get('name')!.invalid && this.forma.get('name')!.touched
  }
  get titleNoValido() {
    return this.forma.get('title')!.invalid && this.forma.get('title')!.touched
  }
  get ownerNoValido() {
    return this.forma.get('owner')!.invalid && this.forma.get('owner')!.touched
  }
  get autorNoValido() {
    return this.forma.get('autor')!.invalid && this.forma.get('autor')!.touched
  }
  get linkNoValido() {
    return this.forma.get('link')!.invalid && this.forma.get('link')!.touched
  }

  guardar() {
   // console.log(this.forma);
    if (this.forma.invalid) {
      console.log( "invalid form" );
      return Object.values(this.forma.controls).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });

    }
   // this.forma.setControl("images",this.item.images);
      this.images = this.item.images!;
      
    Object.assign(this.item,this.forma.value);
    //this.item = this.forma.value;
       //console.log("FORMELEMENT: "+JSON.stringify(this.formElement));
       //console.log("ITEM: "+JSON.stringify(this.item));
       let userId:string = localStorage.getItem("userId") !== null ? localStorage.getItem("userId")!:"";
       //ADDING NORMALIZED NAMES
       this.formElement.description !== undefined ? this.item.description = this.formElement.description : null;
       this.formElement.name !== undefined ? this.item.name = this.formElement.name : null;
       //AADDING OWNER
       //this.item.owner = userId;
       //adding defaults
       
      /* if(this.element === "grupo"){
         this.item.navBarItems = [{name:"Grupos", normalizedName:"grupo",url:`grupo/${this.item.uid}`},{name:"Usuarios", normalizedName:"usuario"}] as ElementId[];
         this.item.users = this.item.users === undefined || this.item.users === null ? [] : this.item.users;
         this.item.users.push(userId);
       }else{
        let grupo:string = localStorage.getItem("selectedGroup") === null 
             || localStorage.getItem("selectedGroup") === undefined ? "{}": "{}";//localStorage.getItem("selectedGroup");
         let currentGroup = JSON.parse(grupo )as ElementId;
         this.item.group = currentGroup.id;
       }*/
       //this.item.date = this.afsService.serverDate().toString();
       this.item.dateCreated = this.afsService.getTimeStamp();
       this.item.images = this.images;
       this.item.codes = this.hastags;
       this.item.id = "id"+this.item.id;
       console.log("ITEM: "+JSON.stringify(this.item.id));
    this.afsService.set(this.item.url!,this.item).then(res =>{//this.item.url
        console.log("EDITADO: ",JSON.stringify(res))
      }).catch(error=>{
        console.log("ERROR DE EDICION: ");
      }).finally(()=>{
        (<HTMLInputElement> document.getElementById("dismissModal")).click(); 
        this.item = {} as ElementId;
        this.formReset();
      });
        

    
  }
  deleteImage(image: ElementId,type:string = "image", indexElem:number = 0) {
    if(type === "image"){
      this.item.images?.splice(this.item.images?.indexOf(image),1);
      /*firebase.default.storage().refFromURL(image.url!).delete().then(() => {
        console.log('File Successfully deleted');
         // File deleted successfully
       }).catch(function(error) {
         console.log('File UNSuccessfully deleted'+JSON.stringify(error));
         // Uh-oh, an error occurred!
       });
       firebase.default.storage.bucket().file(imagePath).delete().catch((err) => console.error(err));*/

       console.log("borrando: "+image.id+'/'+image.name);
    }
    else{
    this.item.images![this.item.images?.indexOf(image)!].elements?.splice(indexElem,1);
  }
   
   
   
  }
  regresarPerfil(){
    this.backProfile.emit(true);
  }
  onItemSelectChange(event: string){
    this.item.normalizedName = event;
    this.item.url = event+'/'+this.item.id;
    console.log("VALOR DE event: "+JSON.stringify(this.item));
  }
  addHastag(){
    this.hastags.push(this.code);
    this.code = "";
  }
  deleteHashtag(){
    this.hastags.pop();
  }
}
