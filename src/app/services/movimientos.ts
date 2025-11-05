import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movimientos } from '../interfaces/movimientos';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  private apiURLMovimientos = 'http://localhost:3000/movimientos';

  constructor(private http: HttpClient) {}

  // Obtener todos los movimientos
  obtenerMovimientos(): Observable<{ datos: Movimientos[] }> {
    return this.http.get<{ datos: Movimientos[] }>(this.apiURLMovimientos);
  }

  // Crear nuevo movimiento
  crearMovimiento(movimiento: Partial<Movimientos>): Observable<Movimientos> {
    return this.http.post<Movimientos>(this.apiURLMovimientos, movimiento);
  }
}
