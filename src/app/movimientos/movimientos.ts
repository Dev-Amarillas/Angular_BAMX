import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Listar } from './listar/listar'; // importa tu componente standalone
import { Crear } from './crear/crear';    // importa el otro

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [CommonModule, Listar, Crear],
  templateUrl: './movimientos.html',
  styleUrls: ['./movimientos.css']
})
export class Movimientos {
  mostrar: 'listar' | 'crear' = 'listar';
}
