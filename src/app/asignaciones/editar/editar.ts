import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { AsignacionesService } from '../../services/asignaciones';
import { VoluntariosService } from '../../services/voluntarios';
import { AreasService } from '../../services/areas';
import { Asignaciones } from '../../interfaces/asignaciones';

@Component({
  selector: 'app-editar-asignacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar.html',
  styleUrls: ['./editar.css']
})
export class EditarAsignacionComponent implements OnInit {

  asignacion: {
    id: number;
    voluntario_id: number | '';
    area_id: number | '';
    estado: 'Activo' | 'Inactivo' | '';
  } = {
    id: 0,
    voluntario_id: '',
    area_id: '',
    estado: ''
  };

  voluntarios: any[] = [];
  areas: any[] = [];
  estados: string[] = ['Activo', 'Inactivo'];

  error: string = '';
  cargando: boolean = false;
  guardando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private asignacionesService: AsignacionesService,
    private voluntariosService: VoluntariosService,
    private areasService: AreasService
  ) {}

  ngOnInit(): void {
    // Obtener id desde la ruta
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;

    if (!id || isNaN(id) || id <= 0) {
      this.error = '❌ ID de asignación no válido.';
      return;
    }

    this.cargando = true;
    this.error = '';

    // Cargar listas (voluntarios y áreas) en paralelo (no bloqueante)
    this.voluntariosService.obtenerVoluntarios()
      .pipe(take(1))
      .subscribe({
        next: (data: any) => {
          // Acepta respuesta en formato directo o {mensaje, datos}
          this.voluntarios = Array.isArray(data) ? data : (data.datos ?? data);
        },
        error: () => {
          this.error = 'Error al cargar los voluntarios.';
        }
      });

    this.areasService.obtenerAreas()
      .pipe(take(1))
      .subscribe({
        next: (data: any) => {
          this.areas = Array.isArray(data) ? data : (data.datos ?? data);
        },
        error: () => {
          this.error = 'Error al cargar las áreas.';
        }
      });

    // Cargar la asignación por id (usar el método correcto del servicio)
    this.asignacionesService.obtenerAsignacionPorId(id)
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          // Acepta formatos: Asignaciones | {mensaje, datos} | {datos: {...}} | {datos: [...]}
          let payload: any;

          if (res === null || res === undefined) {
            payload = null;
          } else if (res.datos) {
            // puede venir { mensaje, datos: {...} } o { datos: [...] }
            if (Array.isArray(res.datos)) payload = res.datos[0] ?? null;
            else payload = res.datos;
          } else if (Array.isArray(res)) {
            payload = res[0] ?? null;
          } else {
            payload = res;
          }

          if (!payload) {
            this.error = 'No se encontró la asignación.';
            this.cargando = false;
            return;
          }

          // Normalizar datos y asignar al modelo del formulario
          this.asignacion = {
            id: payload.id,
            voluntario_id: payload.voluntario_id ?? '',
            area_id: payload.area_id ?? '',
            estado: payload.estado === true || payload.estado === 1 ? 'Activo' : 'Inactivo'
          };

          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al obtener asignación:', err);
          this.error = 'Error al cargar la asignación.';
          this.cargando = false;
        }
      });
  }

  guardarCambios(): void {
    // Limpiar errores previos
    this.error = '';

    // Validaciones básicas antes de enviar
    if (!this.asignacion.id || isNaN(this.asignacion.id) || this.asignacion.id <= 0) {
      this.error = 'El ID de la asignación no es válido.';
      return;
    }
    if (!this.asignacion.voluntario_id || this.asignacion.voluntario_id === '' as any) {
      this.error = 'Seleccione un voluntario.';
      return;
    }
    if (!this.asignacion.area_id || this.asignacion.area_id === ''as any) {
      this.error = 'Seleccione un área.';
      return;
    }
    if (!this.asignacion.estado || (this.asignacion.estado !== 'Activo' && this.asignacion.estado !== 'Inactivo')) {
      this.error = 'Seleccione un estado válido.';
      return;
    }

    // Preparar payload para el backend (estado en booleano)
    const cuerpo = {
      voluntario_id: Number(this.asignacion.voluntario_id),
      area_id: Number(this.asignacion.area_id),
      estado: this.asignacion.estado === 'Activo' ? true : false
    };

    this.guardando = true;

    this.asignacionesService.actualizarAsignacion(this.asignacion.id, cuerpo)
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          // Puedes verificar res.mensaje o el objeto retornado si lo deseas
          this.guardando = false;
          // Mensaje simple de confirmación y redirección
          alert('✅ Asignación actualizada correctamente.');
          this.router.navigate(['/asignaciones']);
        },
        error: (err) => {
          console.error('Error al actualizar asignación:', err);
          this.guardando = false;
          // Mostrar mensaje acorde a la respuesta del backend si existe
          if (err?.error?.mensaje) this.error = `❌ ${err.error.mensaje}`;
          else this.error = '❌ No se pudo actualizar la asignación.';
        }
      });
  }

  cancelar(): void {
    this.router.navigate(['/asignaciones']);
  }
}
