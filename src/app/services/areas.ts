import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Areas} from '../interfaces/areas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreasService {
  private apiURLAreas = 'http://localhost:3000/areas';

  constructor(private http: HttpClient) { }

  obtenerAreas(): Observable<Areas[]> {
    return this.http.get<Areas[]>(this.apiURLAreas);
  }

  crearArea(area: Areas): Observable<Areas> {
    return this.http.post<Areas>(this.apiURLAreas, area);
  }
}