import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-afiliado',
  templateUrl: './afiliado.component.html',
  styleUrl: './afiliado.component.css'
})
export class AfiliadoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener el parámetro codigoAfiliado de la URL
    this.route.paramMap.subscribe(params => {
      const codigoAfiliado = params.get('codigoAfiliado');
      if (codigoAfiliado) {
        // Guardar el código en sessionStorage
        sessionStorage.setItem('codigoAfiliado', codigoAfiliado);
        this.router.navigate(['']);
      }
    });
  }
}
