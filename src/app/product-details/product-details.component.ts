import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  product: any | undefined;

  constructor(private route: ActivatedRoute,
              private cartService: CartService,
              private productService: ProductService
  ) { }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));

    // Find the product that correspond with the id provided in route.
    // Find the product that corresponds with the id provided in route.
    this.productService.getProductById(productIdFromRoute).subscribe(
      (data) => {
        this.product = data; // Asigna los datos del producto a this.product
        console.log(this.product); // Ahora debería mostrar el producto correctamente
      },
      (error) => {
        console.error('Error al obtener el producto:', error); // Manejo de errores
      }
    );
  }

}

