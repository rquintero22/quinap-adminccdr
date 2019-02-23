import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AlumnoComponent } from './alumnos/alumno.component';
import { AsistenciasComponent } from './asistencias/asistencias.component';

const APP_ROUTES: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: { titulo: 'Dashboard' }
    },
    { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios' } },
    { path: 'alumnos', component: AlumnosComponent, data: { titulo: 'Mantenimiento de alumnos' } },
    { path: 'alumnos/:id', component: AlumnoComponent, data: { titulo: 'Alumno' } },
    { path: 'asistencia', component: AsistenciasComponent, data: { titulo: 'Asistencias' } },
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PAGES_ROUTES = RouterModule.forChild( APP_ROUTES );
