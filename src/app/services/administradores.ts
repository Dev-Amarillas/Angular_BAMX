import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Administradores} from '../interfaces/administradores';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresService {
  private apiURLAdministradores = 'https://localhost:3000/administradores';

  constructor(private http: HttpClient) { }

  obtenerAdministradores(): Observable<Administradores[]> {
    return this.http.get<Administradores[]>(this.apiURLAdministradores);
  }
}