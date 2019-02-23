import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from 'src/models/usuarios.model';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor( public http: HttpClient,
               public router: Router,
               public _subirArchivoService: SubirArchivoService ) {
    this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get( url )
        .pipe(
          map( (resp: any) => {
            this.token = resp.token;
            this.guardarStorage(this.usuario._id, this.token, this.usuario, this.menu);
            return true;
          }),
          catchError( err => {
            this.router.navigate(['/login']);
            swal('El token no se puede renovar', 'No fue posible renovar el token', 'error');
            return Observable.throw( err );
          })
        );
  }

  estaLogueado() {
    return (this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  /**
   * Cierra la sesión del usuario
   */
  logout() {
    this.usuario =  null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('toke');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  /**
   * Validación con usuario de Google
   * @param token Valida el usuario con Google
   */
  loginGoogle ( token: string ) {
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token} )
        .pipe(
          map( (resp: any ) => {
            this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
            return true;
          })
        );

  }

  /**
   * Validar usuario
   * Login
   */
  login( usuario: Usuario, recordar: boolean = false ) {
    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post( url, usuario )
        .pipe(
          map( (resp: any) => {
              this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );

              return true;
          } ),
          catchError( err => {
            return Observable.throw( err );
          } )
        );

  }

  /**
   * Crear usuario
   */
  crearUsuario( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
    .pipe(
      map( (resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }),
      catchError( err => {
        swal(err.error.mensaje, err.errors.message, 'error');
        return Observable.throw( err );
      }));
  }

  actualizarUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario)
    .pipe(
      map( (resp: any) => {

        if ( usuario._id === this.usuario._id ) {

          const usuarioDB: Usuario = resp.usuario;

          this.guardarStorage( usuarioDB._id, this.token, usuarioDB, this.menu );
        }

        swal('Usuario actualizado', usuario.nombre, 'success');

        return true;
      } ),
      catchError( err => {
        swal(err.error.mensaje, err.errors.message, 'error');
        return Observable.throw( err );
      }));
  }

  cambiarImagen( archivo: File, id: string) {

    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then( (resp: any) => {
        this.usuario.img = resp.usuario.img;

        // swal('Imágen actualizada satisfactoriamente!', this.usuario.nombre, 'success');

        this.guardarStorage( id, this.token, this.usuario, this.menu );
      })
      .catch( resp => {
          console.log(resp);
      });
  }

  cargarUsuarios( desde: number = 0 ) {

    let url = URL_SERVICIOS + '/usuario?desde=';
    url += desde;

    return this.http.get( url );

  }

  buscarUsuario( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/';
    url += termino;

    return this.http.get( url )
    .pipe(
      map( (resp: any) => resp.usuarios )
    );
  }

  borrarUsuario( id: string ) {
    const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;

   return  this.http.delete( url )
   .pipe(
     map( resp => {
        swal('Usuario eliminado', 'El usuario ha sido eliminado satisfactoriamente.', 'success');
       return true;
     })
   );
  }

}


