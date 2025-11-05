import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradoresService } from '../../services/administradores';
import { Administradores } from '../../interfaces/administradores';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-administrador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar.html',
  styleUrls: ['./editar.css']
})
export class EditarAdministradorComponent implements OnInit {

  admin!: Administradores;
  imagenFile?: File;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private adminService: AdministradoresService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.adminService.obtenerAdministradorPorId(id).subscribe(
        (data: any) => {
          // El backend devuelve { datos: {...} }
          this.admin = data.datos;
        },
        err => {
          console.error('Error al cargar administrador', err);
          alert('No se pudo cargar el administrador.');
          this.router.navigate(['/administradores']);
        }
      );
    }
  }

  seleccionarImagen(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.imagenFile = event.target.files[0];
    }
  }

  guardarCambios(): void {
    const formData = new FormData();
    formData.append('nombre', this.admin.nombre);
    formData.append('usuario', this.admin.usuario);
    formData.append('correo', this.admin.correo);
    formData.append('contrasena', this.admin.contrasena);

    if (this.imagenFile) {
      formData.append('imagen', this.imagenFile);
    }

    this.adminService.actualizarAdministrador(this.admin.id, formData).subscribe(
      (response) => {
        alert('Administrador actualizado correctamente');
        this.router.navigate(['/administradores']);
      },
      err => {
        console.error('Error al actualizar administrador', err);
        alert('Hubo un error al actualizar el administrador.');
      }
    );
  }
}
