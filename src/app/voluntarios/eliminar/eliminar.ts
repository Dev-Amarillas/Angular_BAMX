import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoluntariosService } from '../../services/voluntarios';
import { Voluntarios } from '../../interfaces/voluntarios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eliminar-voluntario',
  standalone: true,
  templateUrl: './eliminar.html',
  imports: [CommonModule]
})
export class EliminarVoluntarioComponent implements OnInit {
  voluntario: Voluntarios | null = null;
  cargando = true;
  mensaje = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voluntariosService: VoluntariosService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.voluntariosService.obtenerVoluntarioPorId(id).subscribe({
        next: (res) => {
          this.voluntario = res;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al cargar voluntario:', err);
          this.mensaje = 'No se pudo cargar el voluntario.';
          this.cargando = false;
        }
      });
    }
  }

  eliminarVoluntario(): void {
    if (this.voluntario) {
      this.voluntariosService.eliminarVoluntario(this.voluntario.id).subscribe({
        next: () => {
          this.mensaje = 'Voluntario eliminado correctamente.';
          setTimeout(() => this.router.navigate(['/voluntarios']), 1200);
        },
        error: (err) => {
          console.error('Error al eliminar voluntario:', err);
          this.mensaje = 'No se pudo eliminar el voluntario.';
        }
      });
    }
  }
}
