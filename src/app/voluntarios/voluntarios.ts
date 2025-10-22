import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Listar } from './listar/listar'; // importa tu componente standalone
import { Crear } from './crear/crear';    // importa el otro

@Component({
  selector: 'app-voluntarios',
  standalone: true,
  imports: [CommonModule, Listar, Crear],
  templateUrl: './voluntarios.html',
  styleUrls: ['./voluntarios.css']
})
export class Voluntarios {
  mostrar: 'listar' | 'crear' = 'listar';
}
