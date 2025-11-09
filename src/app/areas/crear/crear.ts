import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

import { AreasService } from '../../services/areas';
import { Areas } from '../../interfaces/areas';

@Component({
  selector: 'app-crear-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear.html',
  styleUrls: ['./crear.css'],
})
export class CrearAreaComponent {
  area: Areas = {
    id: 0,
    nombre: '',
    descripcion: '',
    estado: 1,
  };

  error: string | null = null;   // 👈 reemplaza errorMessage por “error”
  isSubmitting = false;

  constructor(
    private areasService: AreasService,
    private router: Router
  ) {}

  crearArea(): void {
    if (!this.validarFormulario()) return;

    this.error = null;
    this.isSubmitting = true;

    this.areasService.crearArea(this.area)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: (response) => {
          console.log('✅ Área creada correctamente:', response);
          alert('✨ Área creada exitosamente.');
          this.router.navigate(['/areas']);
        },
        error: (err) => {
          console.error('❌ Error al crear el área:', err);
          this.error = err?.error?.mensaje || 'Ocurrió un error al crear el área.';
        },
      });
  }

  private validarFormulario(): boolean {
    if (!this.area.nombre.trim()) {
      this.error = 'El nombre del área es obligatorio.';
      return false;
    }
    if (!this.area.descripcion.trim()) {
      this.error = 'La descripción del área es obligatoria.';
      return false;
    }
    return true;
  }
}
