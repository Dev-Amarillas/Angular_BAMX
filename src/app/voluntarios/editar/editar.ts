import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VoluntariosService } from '../../services/voluntarios';
import { Voluntarios } from '../../interfaces/voluntarios';
import { FileUrlPipe } from '../../pipes/file-url-pipe';

@Component({
  selector: 'app-editar-voluntario',
  standalone: true,
  imports: [CommonModule, FormsModule, FileUrlPipe],
  templateUrl: './editar.html',
  styleUrls: ['./editar.css']
})
export class EditarVoluntarioComponent implements OnInit {
  voluntario: Voluntarios = {
    id: 0,
    nombre: '',
    apellido_pat: '',
    apellido_mat: '',
    telefono: '',
    direccion: '',
    estado: true,
    foto: '',
  };

  cargando = true;
  mensaje = '';
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voluntariosService: VoluntariosService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? parseInt(idParam, 10) : NaN;

    if (isNaN(id) || id <= 0) {
      this.mensaje = 'ID inválido del voluntario.';
      this.cargando = false;
      console.warn('⚠️ ID inválido detectado:', idParam);
      return;
    }

    // Cargar datos del voluntario
    this.voluntariosService.obtenerVoluntarioPorId(id).subscribe({
      next: (res: Voluntarios) => {
        this.voluntario = res;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener voluntario:', err);
        this.mensaje = 'Error al cargar los datos del voluntario.';
        this.cargando = false;
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  actualizarVoluntario(): void {
    if (!this.voluntario.id || isNaN(this.voluntario.id)) {
      this.mensaje = 'ID inválido del voluntario.';
      return;
    }

    const fd = new FormData();
    fd.append('nombre', this.voluntario.nombre ?? '');
    fd.append('apellido_pat', this.voluntario.apellido_pat ?? '');
    fd.append('apellido_mat', this.voluntario.apellido_mat ?? '');
    fd.append('telefono', this.voluntario.telefono ?? '');
    fd.append('direccion', this.voluntario.direccion ?? '');
    fd.append('estado', String(this.voluntario.estado ?? true));

    // si hay nueva foto, se reemplaza
    if (this.selectedFile) {
      fd.append('foto', this.selectedFile, this.selectedFile.name);
    } else if (this.voluntario.foto) {
      fd.append('foto_url', this.voluntario.foto);
    }

    this.voluntariosService.actualizarVoluntario(this.voluntario.id, fd).subscribe({
      next: () => {
        this.mensaje = 'Voluntario actualizado correctamente.';
        setTimeout(() => this.router.navigate(['/voluntarios']), 1200);
      },
      error: (err) => {
        console.error('Error al actualizar voluntario:', err);
        this.mensaje = 'No se pudo actualizar el voluntario.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/voluntarios']);
  }
}
