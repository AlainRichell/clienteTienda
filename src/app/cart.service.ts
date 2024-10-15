import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: any[] = [];

  constructor(
    private http:HttpClient,
  ) {
    // Cargar los productos almacenados en sessionStorage al iniciar el servicio
    const storedItems = sessionStorage.getItem('cartItems');
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }
  }

  addToCart(product: any) {
    this.items.push(product);
    this.updateSessionStorage();
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.updateSessionStorage();
    return this.items;
  }

  // Actualiza el sessionStorage cada vez que se modifica el carrito
  private updateSessionStorage() {
    sessionStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  getShippingPrices() {
    return this.http.get<{type: string, price: number}[]>('/assets/shipping.json');
  }
}

