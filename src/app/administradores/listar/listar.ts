import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { Administradores } from '../../interfaces/administradores';
import { AdministradoresService } from '../../services/administradores';

@Component({
  selector: 'app-listar',
  imports: [CommonModule, RouterModule],
  templateUrl: './listar.html',
  styleUrls: ['./listar.css'],
  standalone: true
})
export class Listar {
  administradores: Administradores[] = [];
  
  constructor(private administradoresService: AdministradoresService) {}

  ngOnInit(): void {
    this.cargarAdministradores();
  }

  cargarAdministradores(): void {
    this.administradoresService.obtenerAdministradores().subscribe({
      next: (registros: any) => {
        console.log('Administradores recibidos:', registros);

        // Aseguramos que siempre sea un arreglo
        const datos = Array.isArray(registros.datos)
          ? registros.datos
          : [registros.datos];

        // Convertir fecha al formato legible para Angular
        this.administradores = datos.map((admin: any) => ({
          id: admin.id,
          nombre: admin.nombre,
          usuario: admin.usuario,
          correo: admin.correo,
          fecha_creacion: admin.fecha_creacion ? new Date(admin.fecha_creacion) : null,
          imagen: admin.imagen || ''
        }));

        console.log('Administradores procesados:', this.administradores);
      },
      error: (error: any) => {
        console.error('Error al obtener administradores:', error);
      }
    });
  }
}
