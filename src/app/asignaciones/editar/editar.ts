import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignacionesService } from '../../services/asignaciones';
import { AreasService } from '../../services/areas';
import { VoluntariosService } from '../../services/voluntarios';
import { Asignaciones } from '../../interfaces/asignaciones';

@Component({
  selector: 'app-editar-asignacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar.html',
  styleUrls: ['./editar.css']
})
export class EditarAsignacionComponent implements OnInit {

  asignacion: Asignaciones = {
    id: 0,
    voluntario_id: 0,
    area_id: 0,
    estado: true
  };

  voluntarios: any[] = [];
  areas: any[] = [];

  mensaje: string = '';
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private asignacionesService: AsignacionesService,
    private areasService: AreasService,
    private voluntariosService: VoluntariosService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.asignacionesService.obtenerAsignacionPorId(id).subscribe({
        next: (data) => (this.asignacion = data),
        error: () => (this.error = 'Error al cargar la asignación.')
      });
    }

    // Cargar los select de voluntarios y áreas
    this.voluntariosService.obtenerVoluntarios().subscribe({
      next: (data) => (this.voluntarios = data),
      error: () => (this.error = 'Error al cargar voluntarios.')
    });

    this.areasService.obtenerAreas().subscribe({
      next: (data) => (this.areas = data),
      error: () => (this.error = 'Error al cargar áreas.')
    });
  }

  guardarCambios(): void {
    if (!this.asignacion.id) return;

    this.asignacionesService.actualizarAsignacion(this.asignacion.id, this.asignacion).subscribe({
      next: () => {
        this.mensaje = 'Asignación modificada con éxito ✅';
        this.error = '';
        // Mostrar el mensaje unos segundos antes de redirigir
        setTimeout(() => {
          this.mensaje = '';
          this.router.navigate(['/asignaciones']);
        }, 2000);
      },
      error: () => {
        this.error = 'No se pudo guardar los cambios.';
        this.mensaje = '';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/asignaciones']);
  }
}
