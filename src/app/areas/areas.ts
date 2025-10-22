import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Listar } from './listar/listar'; // importa tu componente standalone
import { Crear } from './crear/crear';    // importa el otro

@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [CommonModule, Listar, Crear],
  templateUrl: './areas.html',
  styleUrls: ['./areas.css']
})
export class Areas {
  mostrar: 'listar' | 'crear' = 'listar';
}
