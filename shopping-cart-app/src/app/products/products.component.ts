import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent  {
  products: any = [];
  constructor(private ProductService: ProductService) { }

  //getProducts(): void {
  //  this.products = this.ProductService.getProducts();}ngOnInit(): void { this.getProducts();}
  ngOnInit() {
  this.ProductService.getProducts().subscribe(data=>{
    this.products=data;
  })

 
}
}
