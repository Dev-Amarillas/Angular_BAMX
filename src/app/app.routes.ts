import { Routes } from '@angular/router';

// === Componentes principales ===
import { Home } from './home/home';
import { Administradores } from './administradores/administradores';
import { Voluntarios } from './voluntarios/voluntarios';
import { Areas } from './areas/areas';
import { Movimientos } from './movimientos/movimientos';
import { Asignaciones } from './asignaciones/asignaciones';

// === ADMINISTRADORES ===
import { EditarAdministradorComponent } from './administradores/editar/editar';
import { EliminarAdminComponent } from './administradores/eliminar/eliminar';
// === ÁREAS ===
import { Editar as EditarArea } from './areas/editar/editar';
import { EliminarAreaComponent } from './areas/eliminar/eliminar';
// === ASIGNACIONES ===
import { EditarAsignacionComponent } from './asignaciones/editar/editar';
import { EliminarAsignacionComponent } from './asignaciones/eliminar/eliminar';

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
  { path: 'areas/editar/:id', component: EditarArea },
  { path: 'areas/eliminar/:id', component: EliminarAreaComponent },

  // --- MOVIMIENTOS ---
  { path: 'movimientos', component: Movimientos },
  
  // --- ASIGNACIONES ---
  { path: 'asignaciones', component: Asignaciones },
  { path: 'asignaciones/editar/:id', component: EditarAsignacionComponent },
  { path: 'asignaciones/eliminar/:id', component: EliminarAsignacionComponent },

  // --- RUTA POR DEFECTO ---
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
