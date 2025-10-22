import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-listar',
  imports: [CommonModule, RouterLink],
  templateUrl: './listar.html',
  styleUrls: ['./listar.css'],
  standalone: true
})
export class Listar {
  voluntarios = [
    { id: '68ec2f24f915ba1810cebea5', nombre: 'Brenda Aguayo', correo: 'brenda.aguayo@bamx.org', telefono: '3322151489', rol: 'voluntario', area_asignada: 'Entrega a Comunidades', horas_trabajadas: 32, fecha_ingreso: '2025-10-01' },
    { id: '68ec2f24f915ba1810cebeb1', nombre: 'Pablo Morales', correo: 'pablo.morales@bamx.org', telefono: '3345218754', rol: 'voluntario', area_asignada: 'Clasificación de Alimentos', horas_trabajadas: 28, fecha_ingreso: '2025-10-02' },
    { id: '68ec2f24f915ba1810cebea6', nombre: 'Abraham', correo: 'abraham@bamx.org', telefono: '3322151489', rol: 'voluntario', area_asignada: 'Entrega a Comunidades', horas_trabajadas: 40, fecha_ingreso: '2025-10-05' },


  ];
}
