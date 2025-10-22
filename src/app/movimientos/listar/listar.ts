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
  movimientos = [
    {  tipo: 'Entrada', descripcion: 'Entrada de alimentos no perecederos', cantidad_kg: 100, fecha: '2025-10-01', registrado_por: 'José Martínez', area_id: '68ec2f24f915ba1810cebea5' },
    {  tipo: 'Salida', descripcion: 'Salida de alimentos perecederos', cantidad_kg: 50, fecha: '2025-10-02', registrado_por: 'María López', area_id: '68ec2f24f915ba1810cebeb1' },
    {  tipo: 'Entrada', descripcion: 'Entrada de productos de limpieza', cantidad_kg: 30, fecha: '2025-10-05', registrado_por: 'Ana López', area_id: '68ec2f24f915ba1810cebea6' },
    {  tipo: 'Salida', descripcion: 'Salida de ropa usada', cantidad_kg: 20, fecha: '2025-10-08', registrado_por: 'Miguel Amarillas', area_id: '68ec2f24f915ba1810cebea7' },
    {  tipo: 'Entrada', descripcion: 'Entrada de juguetes', cantidad_kg: 10, fecha: '2025-10-10', registrado_por: 'María González', area_id: '68ec2f24f915ba1810cebea8' },
    {  tipo: 'Entrada', descripcion: 'Entrada de productos electrónicos', cantidad_kg: 5, fecha: '2025-10-12', registrado_por: 'Luis Hernández', area_id: '68ec2f24f915ba1810cebea9' },
    {  tipo: 'Salida', descripcion: 'Salida de muebles', cantidad_kg: 15, fecha: '2025-10-15', registrado_por: 'Fernanda Torres', area_id: '68ec2f24f915ba1810cebeaa' }

  ];
}
