import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrl: './product-alerts.component.css'
})
export class ProductAlertsComponent {
  @Input() product: any | undefined;
  @Output() notify = new EventEmitter();
}
