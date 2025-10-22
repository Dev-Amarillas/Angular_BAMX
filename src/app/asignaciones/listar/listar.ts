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
  asignaciones = [
    { id: '68ec2f24f915ba1810cebea5', voluntario_id: '68ec2f2ff915ba1810cebea7', area_id: '68ec2f36f915ba1810cebea9', fecha_asignacion: '2025-10-01', turno: 'vespertino', supervisor: 'Jose martinez' },
    { id: '78ec2f24f915ba1810cebea6', voluntario_id: '78ec2f2ff915ba1810cebea8', area_id: '78ec2f36f915ba1810cebeaa', fecha_asignacion: '2025-10-02', turno: 'matutino', supervisor: 'Ana lopez' },
    { id: '88ec2f24f915ba1810cebea7', voluntario_id: '88ec2f2ff915ba1810cebea9', area_id: '88ec2f36f915ba1810cebeab', fecha_asignacion: '2025-10-03', turno: 'vespertino', supervisor: 'Luis garcia' },
  ];
    
}
