import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Administradores } from './administradores/administradores';
import { Voluntarios } from './voluntarios/voluntarios';
import { Areas } from './areas/areas';
import { Movimientos } from './movimientos/movimientos';
import { Asignaciones } from './asignaciones/asignaciones';

export const appRoutes: Routes = [
  { path: '', component: Home },
  { path: 'administradores', component: Administradores },
  { path: 'administradores/editar/:id',loadComponent: () => import('./administradores/editar/editar').then(m => m.EditarAdministradorComponent)},
  { path: 'voluntarios', component: Voluntarios },
  { path: 'areas', component: Areas },
  { path: 'movimientos', component: Movimientos },
  { path: 'asignaciones', component: Asignaciones },
  { path: '**', redirectTo: '' } // ruta principal para rutas no encontradas
];

