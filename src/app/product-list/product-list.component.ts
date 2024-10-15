import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service'; // Importa el servicio

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = []; // Los productos ahora son cargados dinámicamente

  constructor(private productService: ProductService) {} // Inyecta el servicio ProductService

  // Implementa OnInit para cargar los productos cuando el componente se inicialice
  ngOnInit(): void {
    this.loadProducts();
  }

  // Método para obtener los productos desde la API
  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error al cargar los productos', error);
      }
    );
  }

  // Método para compartir un producto
  share() {
    window.alert('The product has been shared!');
  }

  // Método para manejar la notificación de oferta
  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/