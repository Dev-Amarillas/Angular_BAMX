import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Voluntarios } from '../interfaces/voluntarios';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoluntariosService {
  private apiURLVoluntarios = 'http://localhost:3000/voluntarios'; 

  constructor(private http: HttpClient) {}

  // Obtener lista de voluntarios
  obtenerVoluntarios(): Observable<Voluntarios[]> {
    return this.http.get<Voluntarios[]>(this.apiURLVoluntarios);
  }

  // Guardar nuevo voluntario (usado por tu componente Crear)
  guardarVoluntario(voluntario: FormData): Observable<Voluntarios> {
    return this.http.post<Voluntarios>(this.apiURLVoluntarios, voluntario);
  }

  // Obtener un voluntario por ID (opcional)
  obtenerVoluntarioPorId(id: number) {
  return this.http.get<any>(`${this.apiURLVoluntarios}/${id}`).pipe(
    map(res => res.datos)
  );
}

  // Actualizar voluntario (opcional)
  actualizarVoluntario(id: number, formData: FormData): Observable<Voluntarios> {
    return this.http.put<Voluntarios>(`${this.apiURLVoluntarios}/${id}`, formData);
  }

  // Eliminar voluntario (opcional)
  eliminarVoluntario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURLVoluntarios}/${id}`);
  }
}



