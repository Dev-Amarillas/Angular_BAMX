import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Areas } from '../interfaces/areas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreasService {
  private apiURLAreas = 'http://localhost:3000/areas';

  constructor(private http: HttpClient) { }

  // Obtener todas las áreas
  obtenerAreas(): Observable<Areas[]> {
    return this.http.get<Areas[]>(this.apiURLAreas);
  }

  // Obtener un área por ID
  obtenerAreaPorId(id: number): Observable<Areas> {
    return this.http.get<Areas>(`${this.apiURLAreas}/${id}`);
  }

  // Crear nueva área
  crearArea(area: Areas): Observable<Areas> {
    return this.http.post<Areas>(this.apiURLAreas, area);
  }

  // Actualizar área existente
  actualizarArea(id: number, area: Areas): Observable<Areas> {
    return this.http.put<Areas>(`${this.apiURLAreas}/${id}`, area);
  }

  // Eliminar área
  eliminarArea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURLAreas}/${id}`);
  }
}
