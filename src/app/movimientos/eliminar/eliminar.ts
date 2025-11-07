import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovimientosService } from '../../services/movimientos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eliminar-movimiento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eliminar.html',
  styleUrls: ['./eliminar.css']
})
export class EliminarMovimientoComponent implements OnInit {
  movimiento: any = null;
  cargando = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movimientosService: MovimientosService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'ID de movimiento no válido.';
      this.cargando = false;
      return;
    }

    this.movimientosService.obtenerMovimientoPorId(id).subscribe({
      next: (res) => {
        this.movimiento = res?.datos; // 👈 importante: el backend devuelve { datos: {...} }
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener movimiento:', err);
        this.error = 'No se pudo cargar el movimiento.';
        this.cargando = false;
      }
    });
  }

  eliminarMovimiento() {
    if (!this.movimiento?.id) return;

    if (confirm(`¿Seguro que deseas eliminar el movimiento ID ${this.movimiento.id}?`)) {
      this.movimientosService.eliminarMovimiento(this.movimiento.id).subscribe({
        next: () => {
          alert('Movimiento eliminado correctamente.');
          this.router.navigate(['/movimientos']);
        },
        error: (err) => {
          console.error('Error al eliminar movimiento:', err);
          alert('Ocurrió un error al eliminar el movimiento.');
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/movimientos']);
  }
}
