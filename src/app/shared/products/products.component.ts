import { Component, OnInit } from '@angular/core';
import { FotosService } from '../services/fotos.service';
import { ElementId } from 'src/app/collections/element';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  items: ElementId[];
  constructor(private fotosService: FotosService,private router: Router) { }

  ngOnInit(): void {
    this.fotosService
    .getCollection('producto', 50, '', '', 'codes', 'publicar')
    .subscribe((data) => {
      if (data !== undefined)
        this.items = data.filter((obj) => {
          return obj.normalizedName != 'general';
        });
      

      //console.log("GETTING products: "+JSON.stringify(this.items));
    });

  //this.serviceRecognition.init()
}
goToHome(){
  this.router.navigateByUrl('/home');

}
  }


