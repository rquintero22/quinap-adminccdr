import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.route';


import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AlumnoComponent } from './alumnos/alumno.component';
import { AsistenciasComponent } from './asistencias/asistencias.component';
import { AsistenciaComponent } from './asistencias/asistencia.component';

@NgModule({
    declarations: [
        DashboardComponent,
        UsuariosComponent,
        AlumnosComponent,
        AlumnoComponent,
        AsistenciasComponent,
        AsistenciaComponent
    ],
    exports: [
        DashboardComponent,
        UsuariosComponent,
        AlumnosComponent,
        AlumnoComponent,
        AsistenciasComponent,
        AsistenciaComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule
    ]
})

export class PagesModule { }
