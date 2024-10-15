import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { FormBuilder } from '@angular/forms';
import { cellphone } from '../finals';
import { AfiliadoService } from '../afiliado.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  items = this.cartService.getItems();
  afiliadoNombre: string = '';

  checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private afiliadoService: AfiliadoService,
  ) { }

  ngOnInit(): void {
    // Obtener el codigoAfiliado desde sessionStorage
    const codigoAfiliado = sessionStorage.getItem('codigoAfiliado');
    if (codigoAfiliado) {
      // Llamar al servicio para obtener el nombre del afiliado
      this.afiliadoService.getAfiliadoNombre(codigoAfiliado).subscribe(response => {
        this.afiliadoNombre = response.nombre;
      });
    }
  }

  get total(): number {
    return this.items.reduce((acc, item) => acc + item.precio, 0);
  }

  currencyFormatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD', // Puedes cambiar esto por la moneda que necesites, como 'USD' o 'MXN'
    minimumFractionDigits: 2
  });

  formatPrice(price: number): string {
    return `$${price.toFixed(2)}`; // Devuelve el precio con dos decimales y el signo de dólar
  }

  removeItem(index: number): void {
    this.items.splice(index, 1); // Eliminar el item en el índice especificado
  }

  onSubmit(): void {
    // Crear un mensaje con la lista de items y el nombre del afiliado
    const itemList = this.items.map(item => `${item.nombre}: ${this.formatPrice(item.precio)}`).join('\n');
    const totalAmount = this.formatPrice(this.total);
    const message = `*Mi pedido:*\n${itemList}\n*Total:* ${totalAmount}\n*Afiliado:* ${this.afiliadoNombre}`;

    // URL para enviar el mensaje por WhatsApp con el texto ya prellenado
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${cellphone}&text=${encodeURIComponent(message)}`;

    // Abrir WhatsApp con el mensaje
    window.open(whatsappUrl, '_blank');

    // Limpiar el carrito después de enviar
    this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }


}
