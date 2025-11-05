import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignacionesService } from '../../services/asignaciones';
import { Asignaciones } from '../../interfaces/asignaciones';

@Component({
  selector: 'app-eliminar-asignacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eliminar.html',
  styleUrls: ['./eliminar.css']
})
export class EliminarAsignacionComponent implements OnInit {
  id: number = 0;
  asignacion?: Asignaciones;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private asignacionesService: AsignacionesService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.asignacionesService.obtenerAsignacionPorId(this.id).subscribe({
      next: (data) => (this.asignacion = data),
      error: () => {
        alert('No se encontró la asignación.');
        this.router.navigate(['/asignaciones']);
      }
    });
  }

  eliminarAsignacion(): void {
    if (!this.asignacion) return;

    const confirmar = confirm(`¿Estás seguro de eliminar la asignación #${this.asignacion.id}?`);

    if (confirmar) {
      this.asignacionesService.eliminarAsignacion(this.id).subscribe({
        next: () => {
          alert('Asignación eliminada correctamente.');
          this.router.navigate(['/asignaciones']);
        },
        error: () => alert('Ocurrió un error al eliminar la asignación.')
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/asignaciones']);
  }
}
