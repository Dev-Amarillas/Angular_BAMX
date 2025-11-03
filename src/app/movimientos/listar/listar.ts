import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovimientosService } from '../../services/movimientos';
import { Movimientos } from '../../interfaces/movimientos';

@Component({
  selector: 'app-listar',
  imports: [CommonModule],
  templateUrl: './listar.html',
  styleUrls: ['./listar.css'],
  standalone: true
})
export class Listar {
  movimientos: Movimientos[] = []; // mejor nombre plural

  constructor(private movimientosService: MovimientosService) {}

  ngOnInit(): void {
    this.cargarMovimientos();
  }

  cargarMovimientos(): void {
    this.movimientosService.obtenerMovimientos().subscribe({
      next: (registros: any) => {
        console.log('Movimientos recibidos:', registros);

        if (Array.isArray(registros.datos)) {
          this.movimientos = registros.datos;
        } else {
          this.movimientos = [registros.datos]; // envolvemos en arreglo si viene un solo registro
        }
      },
      error: (error: any) => {
        console.error('Error al obtener movimientos:', error);
      }
    });
  }
}
