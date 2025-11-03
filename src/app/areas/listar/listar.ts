import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 
import { Areas } from '../../interfaces/areas';
import { AreasService } from '../../services/areas';



@Component({
  selector: 'app-listar',
  imports: [CommonModule, RouterLink],
  templateUrl: './listar.html',
  styleUrls: ['./listar.css'],
  standalone: true
})
export class Listar {
  areas: Areas[] = [];
  
  constructor(private areasService: AreasService) {}

  ngOnInit(): void{
    this.cargarAreas();
  }
  cargarAreas(): void {
    this.areasService.obtenerAreas().subscribe({
      next: (registros: any) => {
        console.log('Áreas recibidas:', registros);

        if (Array.isArray(registros.datos)) {
          this.areas = registros.datos;
        } else {
          this.areas = [registros.datos]; // envolvemos en arreglo
        }},
      error: (error: any) => {
        console.error('Error al obtener áreas:', error);
      }
    });
  }

}

