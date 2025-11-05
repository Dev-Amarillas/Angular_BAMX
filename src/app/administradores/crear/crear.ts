import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdministradoresService } from '../../services/administradores';
import { Administradores } from '../../interfaces/administradores';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear.html',
  styleUrls: ['./crear.css']
})
export class Crear {
  administrador: Administradores = {
    id: 0,
    nombre: '',
    usuario: '',
    correo: '',
    contrasena: '',
    imagen: ''
  };

  confirmar_contrasena: string = '';
  error: string = '';
  archivoImagen?: File;

  constructor(
    private administradoresService: AdministradoresService,
    private router: Router
  ) {}

  // Captura el archivo seleccionado por el usuario
  onArchivoSeleccionado(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.archivoImagen = target.files[0];
    }
  }

  crearAdministrador(): void {
    this.error = '';

    // Validación de contraseñas
    if (this.administrador.contrasena.trim() !== this.confirmar_contrasena.trim()) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    // Crear FormData para enviar los datos al backend
    const formData = new FormData();
    formData.append('nombre', this.administrador.nombre);
    formData.append('usuario', this.administrador.usuario);
    formData.append('correo', this.administrador.correo);
    formData.append('contrasena', this.administrador.contrasena);

    if (this.archivoImagen) {
      formData.append('imagen', this.archivoImagen);
    }

    // Llamada al servicio
    this.administradoresService.guardarAdministrador(formData).subscribe({
      next: () => {
        alert('Administrador creado exitosamente✨.');
        this.router.navigate(['/administradores']);
      },
      error: (err) => {
        this.error = err?.error?.detalle || 'Error al crear administrador.';
      }
    });
  }
}
