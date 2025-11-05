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
  movimiento: Partial<Movimientos> = {
    voluntario_id: 0,
    cantidad: 0,
    descripcion: '',
    tipo: 'entrada',  // 🔹 Valor por defecto si el backend lo requiere
    fecha: new Date().toISOString(), // 🔹 Fecha actual ISO
  };

  constructor(private movimientosService: MovimientosService) {}

  crearMovimiento(): void {
    // Aseguramos que los datos se envíen correctamente formateados
    const movimientoEnviar: Movimientos = {
      voluntario_id: Number(this.movimiento.voluntario_id),
      cantidad: Number(this.movimiento.cantidad),
      descripcion: this.movimiento.descripcion?.trim() || 'Sin descripción',
      tipo: this.movimiento.tipo || 'entrada',
      fecha: this.movimiento.fecha instanceof Date
        ? this.movimiento.fecha.toISOString()
        : this.movimiento.fecha || new Date().toISOString()
    } as Movimientos;

    console.log('📦 Movimiento creado para enviar:', movimientoEnviar);

    this.movimientosService.crearMovimiento(movimientoEnviar).subscribe({
      next: (res) => {
        alert('✅ Movimiento registrado exitosamente');
        console.log('Guardado correctamente:', res);

        // Reiniciar formulario
        this.movimiento = {
          voluntario_id: 0,
          cantidad: 0,
          descripcion: '',
          tipo: 'entrada',
          fecha: new Date().toISOString(),
        };
      },
      error: (err) => {
        console.error('❌ Error al guardar movimiento:', err);
        alert('Hubo un error al registrar el movimiento. Revisa la consola.');
      }
    });
  }
}
