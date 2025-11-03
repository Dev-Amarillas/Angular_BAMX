import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asignaciones} from '../interfaces/asignaciones';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignacionesService {
  private apiURLAsignaciones = 'http://localhost:3000/asignaciones';

  constructor(private http: HttpClient) { }

  obtenerAsignaciones(): Observable<Asignaciones[]> {
    return this.http.get<Asignaciones[]>(this.apiURLAsignaciones);
  }
  crearAsignacion(asignacion: Asignaciones): Observable<Asignaciones> {
    return this.http.post<Asignaciones>(this.apiURLAsignaciones, asignacion);
  }
}