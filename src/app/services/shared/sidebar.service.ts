import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];

  constructor( public _usuarioService: UsuarioService ) { }

  cargarMenu() {
    // this.menu = this._usuarioService.menu;
    this.menu = [
      { titulo: 'Principal',
        icono: 'fas fa-fw fa-folder',
        submenu: [
          { titulo: 'Perfil', url: '/perfil' }
        ]
      },
      {
        titulo: 'Mantenimientos',
        icono: 'fas fa-fw fa-folder',
        submenu: [
          { titulo: 'Profesores', url: '/profesores' },
          { titulo: 'Alumnos', url: '/alumnos' },
          { titulo: 'Eventos', url: '/eventos' }
        ]
      },
      {
        titulo: 'Procesos',
        icono: 'mdi mdi-folder-lock-open',
        submenu: [
          { titulo: 'Asistencia', url: '/asistencia' },
          { titulo: 'Cuota', url: '/cuota', icono: 'fas fa-fw fa-chart-area' }
        ]
      }
    ];
  }

}
