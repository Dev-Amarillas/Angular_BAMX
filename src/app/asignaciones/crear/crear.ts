import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Asignaciones } from '../../interfaces/asignaciones';
import { AsignacionesService } from '../../services/asignaciones';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear.html',
  styleUrls: ['./crear.css']
})
export class Crear {
  asignacion: Partial<Asignaciones> = {
    voluntario_id: 0,
    area_id: 0,
    estado: true
  };
  
  error = '';

  constructor(
    private asignacionesService: AsignacionesService,
    private router: Router 
  ) {}

  crearAsignacion() {
    
    this.error = '';

    this.asignacionesService.crearAsignacion(this.asignacion as Asignaciones).subscribe({
      next: (response) => {
        console.log('Asignación creada:', response);
        alert('✨ Asignación creada exitosamente.');
        this.router.navigate(['/asignaciones']);
      },
      error: (err) => {
        console.error('Error al crear asignación:', err);
        this.error = 'Error al crear asignación.';
      }
    });
  }
}
