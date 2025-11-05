import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AreasService } from '../../services/areas';
import { Areas } from '../../interfaces/areas';

@Component({
  selector: 'app-eliminar-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eliminar.html',
  styleUrls: ['./eliminar.css']
})
export class EliminarAreaComponent implements OnInit {

  id: number = 0;
  area?: Areas;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private areasService: AreasService
  ) {}

  ngOnInit(): void {
    // Obtener el ID desde la ruta
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // Cargar los datos del área para mostrar su nombre
    this.areasService.obtenerAreaPorId(this.id).subscribe({
      next: (data) => {
        this.area = data;
      },
      error: (err) => {
        console.error('Error al obtener área:', err);
        alert('No se encontró el área.');
        this.router.navigate(['/areas']);
      }
    });
  }

  eliminarArea(): void {
    if (!this.area) return;

    const confirmar = confirm(
      `¿Estás seguro de eliminar el área "${this.area.nombre}"?`
    );

    if (confirmar) {
      this.areasService.eliminarArea(this.id).subscribe({
        next: () => {
          alert('Área eliminada correctamente.');
          this.router.navigate(['/areas']);
        },
        error: (err) => {
          console.error('Error al eliminar área:', err);
          alert('Ocurrió un error al intentar eliminar el área.');
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/areas']);
  }
}
