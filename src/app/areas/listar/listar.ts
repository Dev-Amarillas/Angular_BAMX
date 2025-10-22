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
  areas = [
    { id: '68ec2f24f915ba1810cebea5', nombre: 'Entrega a Comunidades', descripcion: 'Encargado de la logística y coordinación de actividades.', responsable: 'Brenda Aguayo' },
    { id: '68ec2f24f915ba1810cebeb1', nombre: 'Clasificación de Alimentos', descripcion: 'Responsable de la clasificación y organización de alimentos donados.', responsable: 'Pablo Morales' },
    { id: '68ec2f24f915ba1810cebea6', nombre: 'Atención a Beneficiarios', descripcion: 'Encargado de la atención directa a las personas beneficiarias.', responsable: 'Abraham' },
    
  ];
}
