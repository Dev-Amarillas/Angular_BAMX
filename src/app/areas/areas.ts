import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Listar } from './listar/listar'; // importa tu componente standalone
import { CrearAreaComponent } from './crear/crear';    // importa el otro

@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [CommonModule, Listar, CrearAreaComponent],
  templateUrl: './areas.html',
  styleUrls: ['./areas.css']
})
export class Areas {
  mostrar: 'listar' | 'crear' = 'listar';
}
