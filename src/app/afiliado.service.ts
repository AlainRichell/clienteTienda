import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiRoot } from './finals';

@Injectable({
  providedIn: 'root'
})
export class AfiliadoService {

  constructor(private http: HttpClient) { }

  // Obtener el nombre del afiliado según el código
  getAfiliadoNombre(codigoAfiliado: string): Observable<{ nombre: string }> {
    // Llamada al endpoint personalizado de código
    const url = `${apiRoot}afiliados/codigo/${codigoAfiliado}/`;
    return this.http.get<{ nombre: string }>(url);
  }
}
