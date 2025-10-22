import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Listar } from './listar/listar'; // importa tu componente standalone
import { Crear } from './crear/crear';    // importa el otro

@Component({
  selector: 'app-asignaciones',
  standalone: true,
  imports: [CommonModule, Listar, Crear],
  templateUrl: './asignaciones.html',
  styleUrls: ['./asignaciones.css']
})
export class Asignaciones {
  mostrar: 'listar' | 'crear' = 'listar';
}
