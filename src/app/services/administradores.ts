import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Administradores } from '../interfaces/administradores';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresService {

  private apiURLAdministradores = 'http://localhost:3000/administradores'; 

  constructor(private http: HttpClient) {}

  // Obtener todos los administradores
  obtenerAdministradores(): Observable<Administradores[]> {
    return this.http.get<Administradores[]>(this.apiURLAdministradores);
  }

  // Guardar administrador con FormData (incluyendo imagen)
  guardarAdministrador(formData: FormData): Observable<Administradores> {
    return this.http.post<Administradores>(this.apiURLAdministradores, formData);
  }

  // Actualizar administrador
  actualizarAdministrador(id: number, formData: FormData): Observable<Administradores> {
    return this.http.put<Administradores>(`${this.apiURLAdministradores}/${id}`, formData);
  }

  // Eliminar administrador
  eliminarAdministrador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURLAdministradores}/${id}`);
  }
}
