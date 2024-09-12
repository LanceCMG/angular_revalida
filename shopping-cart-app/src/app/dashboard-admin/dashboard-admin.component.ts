import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})


export class DashboardAdminComponent implements OnInit {
  products: Product[] = [];
  productsTop: Product[] = [];
  
  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts():void {
    this.productService.getProducts().subscribe(
      (products) => {
      this.products = products;
      this.productsTop = this.products.sort((a, b) => b.sales - a.sales);
      

      });
  }
}
 

   