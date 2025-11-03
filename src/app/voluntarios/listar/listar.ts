import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoluntariosService } from '../../services/voluntarios';
import { Voluntarios  } from '../../interfaces/voluntarios';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar.html',
  styleUrls: ['./listar.css']
})
export class Listar {
  voluntarios: Voluntarios[] = [];

  constructor(private voluntarioServicio: VoluntariosService) {}

  ngOnInit(): void {
    this.cargarVoluntarios();
  }

  cargarVoluntarios(): void {
    this.voluntarioServicio.obtenerVoluntarios().subscribe({
      next: (registros: any) => {
        console.log('Voluntarios recibidos:', registros);

        const datos = Array.isArray(registros.datos)
          ? registros.datos
          : [registros.datos];

         // Convertir fecha al formato legible para Angular
        this.voluntarios = datos.map((voluntario: any) => ({
          id: voluntario.id,
          nombre: voluntario.nombre,
          apellido_pat: voluntario.apellido_pat,
          apellido_mat: voluntario.apellido_mat,
          telefono: voluntario.telefono,
          direccion: voluntario.direccion,
          fecha_registro: voluntario.fecha_registro ? new Date(voluntario.fecha_registro) : null,
          estado: voluntario.estado,
          foto: voluntario.foto || ''
        }));

        console.log('Voluntarios procesados:', this.voluntarios);
      },
      error: (error: any) => {
        console.error('Error al obtener los voluntarios:', error);
      }
    });
  }
}
