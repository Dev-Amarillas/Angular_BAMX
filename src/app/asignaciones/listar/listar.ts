import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Asignaciones } from '../../interfaces/asignaciones';
import { AsignacionesService } from '../../services/asignaciones';

@Component({
  selector: 'app-listar',
  imports: [CommonModule, RouterModule],
  templateUrl: './listar.html',
  styleUrls: ['./listar.css'],
  standalone: true
})
export class Listar {
  asignaciones: Asignaciones[] = [];

  constructor(private asignacionesService: AsignacionesService) {}

  ngOnInit(): void {
    this.cargarAsignaciones();
  }

  cargarAsignaciones(): void {
    this.asignacionesService.obtenerAsignaciones().subscribe({
      next: (registros: any) => {
        console.log('Asignaciones recibidas:', registros);

        if (Array.isArray(registros.datos)) {
          this.asignaciones = registros.datos;
        } else {
          this.asignaciones = [registros.datos]; // envolvemos en arreglo
        }
      },
      error: (error: any) => {
        console.error('Error al obtener asignaciones:', error);
      }
    });
  }

}