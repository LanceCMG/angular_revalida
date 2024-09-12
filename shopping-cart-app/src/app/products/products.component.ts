// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../product.service';

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css'],
//   providers: [ProductService]
// })
// export class ProductsComponent  {
//   products: any = [];
//   constructor(private ProductService: ProductService) { }

//   ngOnInit() {
//   this.ProductService.getProducts().subscribe(data=>{
//     this.products=data;
//   })

 
// }
// }

// products.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  currentProduct: any = {};
  isEditing = false;
  isAdding = false;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  startAddProduct() {
    this.isAdding = true;
    this.currentProduct = {}; // Reset the form
  }

  startEditProduct(product: any) {
    this.isEditing = true;
    this.currentProduct = { ...product }; // Clone the product to edit
  }

  addProduct() {
    this.productService.addProduct(this.currentProduct).subscribe(() => {
      this.loadProducts();
      this.cancel();
    });
  }

  updateProduct() {
    this.productService.updateProduct(this.currentProduct).subscribe(() => {
      this.loadProducts();
      this.cancel();
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  cancel() {
    this.isEditing = false;
    this.isAdding = false;
  }
}
