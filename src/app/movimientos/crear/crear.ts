import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movimientos } from '../../interfaces/movimientos';
import { MovimientosService } from '../../services/movimientos';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear.html',
  styleUrls: ['./crear.css'],
})
export class Crear {
  // Interfaz Movimientos ahora acepta string o Date en fecha
  movimiento: Movimientos = {
    id: 0,
    voluntario_id: 0,
    tipo: '',
    cantidad_kg: 0,
    fecha: new Date(), // inicializamos con Date
    descripcion: ''
  };

  constructor(private movimientosService: MovimientosService) {}

  crearMovimiento(): void {
    // Convertimos fecha a string ISO antes de enviar
    const movimientoEnviar: Movimientos = {
      ...this.movimiento,
      fecha: this.movimiento.fecha instanceof Date 
             ? this.movimiento.fecha.toISOString() 
             : this.movimiento.fecha
    };

    console.log('Movimiento creado para enviar:', movimientoEnviar);

    this.movimientosService.crearMovimiento(movimientoEnviar).subscribe({
      next: res => {
        console.log('Guardado correctamente:', res);
        // Opcional: reiniciar el formulario
        this.movimiento = {
          id: 0,
          voluntario_id: 0,
          tipo: '',
          cantidad_kg: 0,
          fecha: new Date(),
          descripcion: ''
        };
      },
      error: err => console.error('Error al guardar movimiento:', err)
    });
  }
}
