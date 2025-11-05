import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradoresService } from '../../services/administradores';
import { CommonModule } from '@angular/common';
import { Administradores } from '../../interfaces/administradores';

@Component({
  selector: 'app-eliminar-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eliminar.html',
  styleUrls: ['./eliminar.css']
})
export class EliminarAdminComponent implements OnInit {

  id: number = 0;
  administrador?: Administradores;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdministradoresService
  ) {}

  ngOnInit(): void {
    // Obtenemos el ID desde la ruta
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // Cargamos los datos del administrador para mostrar su nombre
    this.adminService.obtenerAdministradorPorId(this.id).subscribe({
      next: (data) => {
        this.administrador = data;
      },
      error: (err) => {
        console.error('Error al obtener administrador:', err);
        alert('No se encontró el administrador.');
        this.router.navigate(['/administradores/listar']);
      }
    });
  }

  eliminarAdministrador(): void {
    if (!this.administrador) return;

    const confirmar = confirm(
      `¿Estás seguro de eliminar al administrador "${this.administrador.nombre}"?`
    );

    if (confirmar) {
      this.adminService.eliminarAdministrador(this.id).subscribe({
        next: () => {
          alert('Administrador eliminado correctamente.');
          this.router.navigate(['/administradores/listar']);
        },
        error: (err) => {
          console.error('Error al eliminar administrador:', err);
          alert('Ocurrió un error al intentar eliminar el administrador.');
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/administradores/listar']);
  }
}
