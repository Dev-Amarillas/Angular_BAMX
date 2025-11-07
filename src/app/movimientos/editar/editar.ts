import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovimientosService } from '../../services/movimientos';
import { Movimientos } from '../../interfaces/movimientos';
import { VoluntariosService } from '../../services/voluntarios';

@Component({
  selector: 'app-editar-movimiento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar.html',
  styleUrls: ['./editar.css']
})
export class EditarMovimientoComponent implements OnInit {

  movimiento: Movimientos = {
    id: 0,
    voluntario_id: 0,
    tipo: '',
    cantidad: 0,
    descripcion: ''
  };

  voluntarios: any[] = [];
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private movimientosService: MovimientosService,
    private voluntariosService: VoluntariosService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.cargarMovimiento(id);
    }
    this.cargarVoluntarios();
  }

  cargarMovimiento(id: number): void {
    this.movimientosService.obtenerMovimientos().subscribe({
      next: (res) => {
        const datos = res.datos.find((m) => m.id === id);
        if (datos) {
          this.movimiento = { ...datos };
        } else {
          this.error = 'Movimiento no encontrado.';
        }
      },
      error: () => this.error = 'Error al cargar el movimiento.'
    });
  }

  cargarVoluntarios(): void {
    this.voluntariosService.obtenerVoluntarios().subscribe({
      next: (res: any) => {
        this.voluntarios = Array.isArray(res.datos) ? res.datos : [];
      },
      error: () => this.error = 'Error al cargar los voluntarios.'
    });
  }

  guardarCambios(): void {
    if (!this.movimiento.id) {
      this.error = 'El ID del movimiento no es válido.';
      return;
    }

    const datosActualizados = { ...this.movimiento };
    delete datosActualizados.fecha; // ✅ que MySQL la maneje automáticamente

    this.movimientosService.crearMovimiento(datosActualizados).subscribe({
      next: () => {
        alert('✅ Movimiento actualizado correctamente.');
        this.router.navigate(['/movimientos']);
      },
      error: () => this.error = 'No se pudo actualizar el movimiento.'
    });
  }

  cancelar(): void {
    this.router.navigate(['/movimientos']);
  }
}
