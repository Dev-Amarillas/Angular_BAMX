import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AreasService } from '../../services/areas';
import { Areas } from '../../interfaces/areas';

@Component({
  selector: 'app-editar-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar.html',
  styleUrls: ['./editar.css']
})
export class Editar implements OnInit {

  area: Areas = {
    nombre: '',
    descripcion: '',
    estado: 1
  } as Areas;

  error: string = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router, // 👈 público para usar en el HTML
    private areasService: AreasService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.areasService.obtenerAreaPorId(id).subscribe({
        next: (data: Areas) => this.area = data,
        error: () => this.error = 'Error al cargar el área.'
      });
    }
  }

  guardarCambios(): void {
    if (!this.area.id) {
      this.error = 'El ID del área no es válido.';
      return;
    }

    this.areasService.actualizarArea(this.area.id, this.area).subscribe({
      next: () => {
        this.error = '';
        alert('✅ El área se modificó con éxito.');
        this.router.navigate(['/areas']);
      },
      error: () => {
        this.error = ' No se pudo guardar los cambios.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/areas']);
  }
}
