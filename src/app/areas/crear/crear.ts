import { Component } from '@angular/core';
import { AreasService } from '../../services/areas';
import { Areas } from '../../interfaces/areas';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear.html',
  styleUrls: ['./crear.css']
})
export class Crear {
  area: Areas = {
  id: 0,
  nombre: '',
  descripcion: '',
  estado: true,
};

error = '';


constructor(
  private areasService: AreasService,
  private router: Router 
) {}
crearArea() {
   this.error = '';

    this.areasService.crearArea(this.area).subscribe({
      next: (response) => {
          console.log('Área creada:', response);
          alert('Área creada exitosamente✨.');
          this.router.navigate(['/areas']);
        },
        error: (err) => {
          console.error('Error al crear área:', err);
          this.error = 'Error al crear área.';
        }
      });
  }
}