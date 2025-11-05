import { Routes } from '@angular/router';

// === Componentes principales ===
import { Home } from './home/home';
import { Administradores } from './administradores/administradores';
import { Voluntarios } from './voluntarios/voluntarios';
import { Areas } from './areas/areas';
import { Movimientos } from './movimientos/movimientos';
import { Asignaciones } from './asignaciones/asignaciones';

// === Componentes secundarios (acciones REST) ===
import { EditarAdministradorComponent } from './administradores/editar/editar';
import { EliminarAdminComponent } from './administradores/eliminar/eliminar';

// === Rutas RESTful ===
export const appRoutes: Routes = [
  // Página principal
  { path: '', component: Home },

  // --- ADMINISTRADORES ---
  { path: 'administradores', component: Administradores },               // GET (lista)
  { path: 'administradores/editar/:id', component: EditarAdministradorComponent },  // PUT (editar)
  { path: 'administradores/eliminar/:id', component: EliminarAdminComponent },      // DELETE (eliminar)

  // --- VOLUNTARIOS ---
  { path: 'voluntarios', component: Voluntarios },

  // --- ÁREAS ---
  { path: 'areas', component: Areas },

  // --- MOVIMIENTOS ---
  { path: 'movimientos', component: Movimientos },

  // --- ASIGNACIONES ---
  { path: 'asignaciones', component: Asignaciones },

  // --- RUTA POR DEFECTO ---
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
