import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Elemento } from 'src/app/collections/element';
@Component({
  selector: 'app-arheader',
  templateUrl: './arheader.component.html',
  styleUrls: ['./arheader.component.css']
})
export class ARHeaderComponent implements OnInit, OnChanges {
  @Output() changeModel: EventEmitter<string> = new EventEmitter<string>();
  @Input() modelos: Elemento[] = [];
  localModels:Elemento[]=[{name:"back",url:"../../../assets/models/delorean__dmc-12.glb"},{name:"back",url:"../../../assets/models/hover_board_low_poly.glb"}];
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    //console.log("onchanges arheader", JSON.stringify(this.modelos));

  }

  ngOnInit(): void {
    this.localModels = this.modelos;
  }
  sendModel(modelName: any) {
    //console.log("arheader models", JSON.stringify(this.modelos));
    //console.log("sending modelo: " + modelName);

    this.changeModel.emit(modelName);

  }

}
