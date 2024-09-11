import { Component, OnInit, Input} from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  
  products: any[] = [];

  cart: any[] = [];

  id: number = 0

  newCartOrder = {
    id: '',
    userId: 1,
    items: [
      {
        productId: 1,
        quantity: 1
      }
    ]
  };

  filteredData: any[] = []; // Data to be displayed after filtering
  selectedCategory: string = 'all'; // Default to 'all' to show all items

  quantity: number = 1;  // Initialize quantity

  @Input() product: any; // Product object passed from the parent component
  quantityOrder: number = 1;  // Default quantity is 1

  constructor(private productService: ProductService, private cartService: CartService) { }


  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredData = data;
    });
  }

  // Filter data based on the selected category
  onCategoryChange(event: any): void {
    if (this.selectedCategory === 'all') {
      this.filteredData = this.products; // Show all items
    } else {
      this.filteredData = this.products.filter(item => item.category === this.selectedCategory);
    }
  }

  // Decrease the quantity by 1, ensuring it doesn't go below 1
  decreaseQuantity() {
    if (this.quantityOrder > 1) {
      this.quantityOrder--;
    }
  }

  // Increase the quantity by 1
  increaseQuantity() {
    this.quantityOrder++;
  }

  loadCart(): void {
    this.cartService.getCart(this.id).subscribe(data => {
      this.cart = data;
    });
  }

  addToCart(): void {
    this.cartService.addToCart(this.newCartOrder).subscribe(() => {
      this.loadCart();
    })
  }

}