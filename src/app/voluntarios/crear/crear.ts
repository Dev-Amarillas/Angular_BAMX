import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Voluntarios } from '../../interfaces/voluntarios';
import { VoluntariosService } from '../../services/voluntarios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './crear.html',
  styleUrls: ['./crear.css']
})
export class Crear {
  voluntario: Voluntarios = {
    id: 0,
    nombre: '',
    apellido_pat: '',
    apellido_mat: '',
    telefono: '',
    direccion: '',
    estado: true,
    foto: ''
  };

  error: string = '';
  archivoImagen?: File;

  constructor(
    private voluntariosService: VoluntariosService,
    private router: Router
  ) {}

  // Captura el archivo seleccionado
   onArchivoSeleccionado(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.archivoImagen = target.files[0];
    }
  }


  crearVoluntario(): void {
    this.error = '';
    

    // Crear FormData para enviar los datos
    const formData = new FormData();
    formData.append('nombre', this.voluntario.nombre);
    formData.append('apellido_pat', this.voluntario.apellido_pat);
    formData.append('apellido_mat', this.voluntario.apellido_mat);
    formData.append('telefono', this.voluntario.telefono);
    formData.append('direccion', this.voluntario.direccion);
    formData.append('estado', String(this.voluntario.estado));

    if (this.archivoImagen) {
      formData.append('foto', this.archivoImagen);
    }

    // Llamada al servicio
    this.voluntariosService.guardarVoluntario(formData).subscribe({
      next: () => {
        this.router.navigate(['/voluntarios']);
      },
      error: (err) => {
        this.error = err?.error?.detalle || 'Error al crear el voluntario.';
      }
    });
  }
}
