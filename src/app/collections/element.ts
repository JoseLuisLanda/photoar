import { Element } from "@angular/compiler";

export interface Elemento {
    name?: string;
    displayName?: string;
    normalizedName?: string;
    emailVerified?: boolean;
    refreshToken?: string;
    photoURL?: string;
    role?: string;
    duration?: number;
    dateCreated?: any;//Date;
    dateModified?: Date;
    title?: string;
    description?: string;
    type?: string;
    url?: string;
    email?: string;
    password?: string;
    tokn?: string;
    elements?: ElementId[];
    id?:string;
    owner?: string;
    idUser?: string;
    autor?: string;
    grupos?: ElementId[];
    insignias?: ElementId[];
    talleres?: ElementId[];
    images?: ElementId[];
    item?: ElementId;
    items?: string[];
    dateBirth?: string;
    pais?: string;
    genero?: string;
    facebook?:string;
    linkedin?: string;
    twitter?: string;
    github?: string;
    date?: any;//firebase.default.firestore.Timestamp;
    navBarItems?:ElementId[];
    template?:ElementId;
    users?:string[];
    options?:ElementId[];
    noCtrl?: string;
    organization?:string;
    phone?:string;
    group?:string;
    mine?: boolean;
    value?: string;
    areas?:ElementId[];
    baseUrlPat?: string;
    indexInit? :number;
    indexEnd? :number;
    status?: boolean;
    codes?: string[];
    code?: string;
    redirect?: boolean;
    externalUrls?:ElementId[];
}

export interface ElementId extends Elemento { uid?: string; }

export class Item implements Elemento{
    name:string;
    description: string;
    url: string;
    id:string;

    constructor() {
        this.name = "";
        this.description = "";
        this.url = "";
        this.id="";
    }
}
export class Grupo extends Item{
    owner:string;
    tags: string;
    constructor() {
        super();
        this.owner = "";
        this.tags = "";
        
    }
}
export class Evento extends Item{
    autor:string;
    link: string;
    constructor() {
        super();
        this.autor = "";
        this.link = "";
        
    }
   
}
export class Usuario extends Item{
    displayName:string;
    nick: string;
    email: string;
    photoURL: string;
    constructor() {
        super();
        this.displayName = "";
        this.nick = "";
        this.photoURL = "";
        this.email = "";
        
    }
}

export class ElementModel {

    id?: string;
    name: string;
    description: string;
    duration?: number;
    status: boolean;
    dateCreated: Date;



    constructor() {
        this.name = "",
        this.description = "";
         this.status = true;
         this.dateCreated = new Date();
    }
}
export class UserModel implements Elemento{

    name: string;
    description: string;
    password: string;
    confirmPassword: string;
    images: ElementId[];
    
    constructor() {
        this.name = "",
        this.description = "";
         this.password ="";
        this.confirmPassword = "";
        this.images = [];
    }
}