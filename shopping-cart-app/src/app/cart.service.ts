import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/carts';

  constructor(private http: HttpClient) { }

  getCart(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?userId=${userId}`);
  }

  addToCart(cartItem: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cartItem);
  }

  updateCart(id: number, cartItem: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cartItem);
  }

  deleteFromCart(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
