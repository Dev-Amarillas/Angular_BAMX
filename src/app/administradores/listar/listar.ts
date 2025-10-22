import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 
import { Administradores } from '../../interfaces/administradores';
import { AdministradoresService } from '../../services/administradores';

@Component({
  selector: 'app-listar',
  imports: [CommonModule, RouterLink],
  templateUrl: './listar.html',
  styleUrls: ['./listar.css'],
  standalone: true
})
export class Listar {
  administradores: Administradores[] = [];
  
  constructor(private administradoresService: AdministradoresService) {}

  ngOnInit(): void{
    this.cargarAdministradores();
  }
  cargarAdministradores() {
    this.administradoresService.obtenerAdministradores().subscribe(
      (registros: Administradores[]) => {
        console.log('Registros obtenidos:', registros);
        this.administradores = registros;
      }
    );

  }

// { id: '68ec2f24f915ba1810cebea8', nombre: 'María González', correo: 'maria.gonzalez@bamx.org', rol: 'SuperAdmin', telefono: '33221513426', area_asignada: 'Entrega a Comunidades', fecha_registro: '2025-10-10' },
// { id: '68ec2f24f915ba1810cebea9', nombre: 'Luis Hernández', correo: 'luis.hernandez@bamx.org', rol: 'SuperAdmin', telefono: '3334233212', area_asignada: 'Clasificación de Alimentos', fecha_registro: '2025-10-12' },
// { id: '68ec2f24f915ba1810cebeaa', nombre: 'Fernanda Torres', correo: 'fernanda.torres@bamx.org', rol: 'SuperAdmin', telefono: '3322151489', area_asignada: 'Entrega a Comunidades', fecha_registro: '2025-10-15' }

}
