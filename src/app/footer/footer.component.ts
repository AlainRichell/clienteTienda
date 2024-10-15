import { Component } from '@angular/core';
import { nombreTienda } from '../finals';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  nombreTienda = nombreTienda;
}
