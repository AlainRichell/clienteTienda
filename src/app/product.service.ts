import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiRoot } from './finals';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = apiRoot + 'productos'; // Cambia esta URL por la de tu API real

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getProductById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`; // Construir la URL con el ID del producto
    return this.http.get<any>(url);
  }
}
