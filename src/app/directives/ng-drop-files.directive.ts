
import { Directive, EventEmitter, ElementRef,
         HostListener, Input, Output } from '@angular/core';
import { FileModel } from '../collections/file.model';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  constructor() { }
  @Input() archivos: FileModel[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any) {
      this.mouseSobre.emit( true );
      this._prevenirDEtener( event );
  }
  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any) {
      this.mouseSobre.emit( false );
  }

  @HostListener('drop', ['$event'])
  public onDrop( event: any) {
    console.log(event);
      const transferencia = this._getTransferencia( event );

      if ( !transferencia ) {
        return;
      }

      this._extraerArchivos( transferencia.files );

      this._prevenirDEtener( event );
      this.mouseSobre.emit( false );
  }
  @HostListener('change', ['$event'])
  public onChange( event: any) {
    console.log(event.target.files);
    

      this._extraerArchivos( event.target.files );

      this._prevenirDEtener( event );
      this.mouseSobre.emit( false );
  }

  private _getTransferencia( event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos( archivosLista: FileList) {

    console.log( "archivos lista" +archivosLista );

// tslint:disable-next-line: forin
    for (const propiedad in Object.getOwnPropertyNames( archivosLista ) ){

      const archivoTemporal = archivosLista[propiedad];

      if ( this.archivoPuedeSerCargado( archivoTemporal )) {

        const nuevoArchivo = new FileModel( archivoTemporal );
        this.archivos.push( nuevoArchivo );
      }
    }
    console.log( this.archivos );
  }

  // validaciones
private archivoPuedeSerCargado( archivo: File ): boolean {
  if ( !this._archivoDropped( archivo.name ) && this._esImagen( archivo.type)) {
    return true;
  } else {
    return false;
  }

}
  private _prevenirDEtener( event: { preventDefault: () => void; stopPropagation: () => void; } ) {
    event.preventDefault();
    event.stopPropagation();
  }
private _archivoDropped( nombreArchivo: string): boolean {

  for ( const archivo of this.archivos ) {

    if ( archivo.nombreArchivo === nombreArchivo) {
      console.log('El archivo ' + nombreArchivo + ' ya esta agregado');
      return true;
    }
  }
return false;
}

private _esImagen( tipoArchivo: string ): boolean {
  return ( tipoArchivo === '' || tipoArchivo === undefined) ? false : true;
}

}
