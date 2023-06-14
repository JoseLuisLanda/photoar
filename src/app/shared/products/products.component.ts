import { Component, OnInit } from '@angular/core';
import { FotosService } from '../services/fotos.service';
import { ElementId } from 'src/app/collections/element';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  items: ElementId[];
  constructor(private fotosService: FotosService) { }

  ngOnInit(): void {
    this.fotosService
    .getCollection('producto', 50, '', '', 'codes', 'publicar')
    .subscribe((data) => {
      if (data !== undefined)
        this.items = data.filter((obj) => {
          return obj.normalizedName != 'general';
        });
      

      console.log("GETTING products: "+JSON.stringify(this.items));
    });

  //this.serviceRecognition.init()
}
  }


