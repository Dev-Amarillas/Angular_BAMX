import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Movimientos } from '../interfaces/movimientos';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  private apiURLMovimientos = 'http://localhost:3000/movimientos';

  constructor(private http: HttpClient) {}

  obtenerMovimientos(): Observable<{ datos: Movimientos[] }> {
    return this.http.get<{ datos: Movimientos[] }>(this.apiURLMovimientos)
      .pipe(catchError(this.handleError));
  }

  obtenerMovimientoPorId(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiURLMovimientos}/${id}`);
}


  crearMovimiento(movimiento: Partial<Movimientos>): Observable<Movimientos> {
    return this.http.post<Movimientos>(this.apiURLMovimientos, movimiento)
      .pipe(catchError(this.handleError));
  }

  actualizarMovimiento(id: number, movimiento: Partial<Movimientos>): Observable<Movimientos> {
    return this.http.put<Movimientos>(`${this.apiURLMovimientos}/${id}`, movimiento)
      .pipe(catchError(this.handleError));
  }

  eliminarMovimiento(id: number): Observable<any> {
    return this.http.delete(`${this.apiURLMovimientos}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return throwError(() => new Error('Error en el servicio de movimientos.'));
  }
}
