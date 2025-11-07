import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asignaciones } from '../interfaces/asignaciones';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignacionesService {
  private apiURLAsignaciones = 'http://localhost:3000/asignaciones';

  constructor(private http: HttpClient) {}

  // === OBTENER TODAS LAS ASIGNACIONES ===
  obtenerAsignaciones(): Observable<Asignaciones[]> {
    return this.http.get<Asignaciones[]>(this.apiURLAsignaciones);
  }

  // === OBTENER ASIGNACIÓN POR ID ===
  obtenerAsignacionPorId(id: number): Observable<Asignaciones> {
    return this.http.get<Asignaciones>(`${this.apiURLAsignaciones}/${id}`);
  }

  // === CREAR ASIGNACIÓN ===
  crearAsignacion(asignacion: Asignaciones): Observable<Asignaciones> {
    return this.http.post<Asignaciones>(this.apiURLAsignaciones, asignacion);
  }

  actualizarAsignacion(id: number, cuerpo: Partial<Asignaciones>): Observable<Asignaciones> {
  return this.http.put<Asignaciones>(`${this.apiURLAsignaciones}/${id}`, cuerpo);
}


  // === ELIMINAR ASIGNACIÓN ===
  eliminarAsignacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURLAsignaciones}/${id}`);
  }
}
