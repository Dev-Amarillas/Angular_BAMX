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

  obtenerAsignaciones(): Observable<any> {
    return this.http.get<any>(this.apiURLAsignaciones);
  }

  crearAsignacion(asignacion: Asignaciones): Observable<any> {
    return this.http.post<any>(this.apiURLAsignaciones, asignacion);
  }
}
