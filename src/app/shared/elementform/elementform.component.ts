import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import firebase from 'firebase/compat';
import { ElementId } from 'src/app/collections/element';
import { UserModel } from 'src/app/collections/user.model';
import { AfsService } from '../services/afs.service';
@Component({
  selector: 'app-elementform',
  templateUrl: './elementform.component.html',
  styleUrls: ['./elementform.component.css']
})
export class ElementformComponent implements OnInit {
  @Input() isform: boolean = false;
  @Input() type: string = "form";
  forma: FormGroup = this.fb.group({name:""} as ElementId);
  @Input() isNewElement: boolean = false;
  @Input() item: ElementId = {uid:"",id:"",name:"yo",description:"hola",images:[]} as ElementId;
  @Input() profile: UserModel = {} as UserModel;
  @Input() editingProfile: boolean = false;
  @Input() element: string = "default";
  @Output() addItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output() itemSaved: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() backProfile: EventEmitter<boolean> = new EventEmitter<boolean>();
  formElement : any;
  uploadImage = false;
  constructor(private fb: FormBuilder,private afsService : AfsService) { 
  
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.crearFormulario();
    //this.crearFormulario();
  }
  uploadImgToggle(){
    this.uploadImage = !this.uploadImage;
  }
  crearFormulario() {
    this.formElement = this.item;
    
    if(this.item!== undefined)
    {
    this.formReset();
    
   console.log("newel: "+"item: "+JSON.stringify(this.item))
    
      this.formElement = this.item;
  
    //}
    this.item.url = this.element+'/'+this.item.id;
    //console.log("form datebirth: "+JSON.stringify(this.formElement.dateBirth))
    this.forma = this.fb.group(this.item);
    //this.forma.setControl("name", this.fb.control("name", [Validators.required, Validators.minLength(5)]));
    //ading default fields to form name and description
    this.formElement.displayName !== undefined ? this.addTextInput('name', this.formElement.displayName != null ? this.formElement.displayName : "") : null;
    this.formElement.name !== undefined ? this.addTextInput('name', this.formElement.name != null ? this.formElement.name : "") : null;
    this.formElement.owner !== undefined ? this.addTextInput('owner', this.formElement.owner != null ? this.formElement.owner : "") : null;
    this.formElement.autor !== undefined ? this.addTextInput('autor', this.formElement.autor != null ? this.formElement.autor : "") : null;
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

  get descriptionNoValido() {
    return this.forma.get('description')!.invalid && this.forma.get('description')!.touched
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
    Object.assign(this.item,this.forma.value);
    //this.item = this.forma.value;
       console.log("FORMELEMENT: "+JSON.stringify(this.formElement));
       console.log("ITEM: "+JSON.stringify(this.item));
       let userId:string = localStorage.getItem("userId") !== null ? localStorage.getItem("userId")!:"";
       //ADDING NORMALIZED NAMES
       this.formElement.displayName !== undefined ? this.item.normalizedName = this.formElement.displayName.toLowerCase() : null;
       this.formElement.name !== undefined ? this.item.normalizedName = this.formElement.name.toLowerCase() : null;
       //AADDING OWNER
       this.item.owner = userId;
       //adding defaults
       if(this.element === "grupo"){
         this.item.navBarItems = [{name:"Grupos", normalizedName:"grupo",url:`grupo/${this.item.uid}`},{name:"Usuarios", normalizedName:"usuario"}] as ElementId[];
         this.item.users = this.item.users === undefined || this.item.users === null ? [] : this.item.users;
         this.item.users.push(userId);
       }else{
        let grupo:string = localStorage.getItem("selectedGroup") === null 
             || localStorage.getItem("selectedGroup") === undefined ? "{}": localStorage.getItem("selectedGroup")!;
         let currentGroup = JSON.parse(grupo )as ElementId;
         this.item.group = currentGroup.id;
       }
       //this.item.date = this.afsService.serverDate().toString();
       this.item.dateCreated = this.afsService.getTimeStamp();
    this.afsService.set(this.item.url!,this.item).then(res =>{
        console.log("EDITADO: ",JSON.stringify(res))
      }).catch(error=>{
        console.log("ERROR DE EDICION: ");
      }).finally(()=>{
        (<HTMLInputElement> document.getElementById("dismissModal")).click(); 
        this.item = {} as ElementId;
        this.formReset();
      });
        

    
  }
  deleteImage(image: ElementId) {
    this.item.images?.splice(this.item.images?.indexOf(image),1);
    console.log("borrando: "+image.id+'/'+image.name)
    /*refFromURL(image.url!).delete().then(() => {
      console.log('File Successfully deleted');
       // File deleted successfully
     }).catch(function(error) {
       console.log('File UNSuccessfully deleted'+JSON.stringify(error));
       // Uh-oh, an error occurred!
     });;*/
   
  }
  regresarPerfil(){
    this.backProfile.emit(true);
  }
}
