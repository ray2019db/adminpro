import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';  //importar el operador map (para transformar la respuesta de una petición) y el catchError (para capturar el error de una petición)
import { throwError } from 'rxjs';  // Importar el objeto throwError

import Swal from 'sweetalert2'  //Importar SweetAlert2

import { Usuario } from 'src/app/models/usuario.model';  //Importar el modelo de Usuario
import { URL_SERVICIOS } from 'src/app/config/config';  //Importar la url base 'http://localhost:3000' para cualquier petición al backend-server
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;

  token: string;  // Propiedad token que almacenará el token del usuario logueado en la aplicación

  menu: any[] = [];  // Propiedad menu que almacenará (en un arreglo de objetos) el menú del SideBar

  constructor(public http: HttpClient, public router: Router, public subirArchivo: SubirArchivoService) {

        this.cargarStorage();  //Ejecuta este método en cuanto se carga el servicio
  }

  renuevaToken(){

        let url = URL_SERVICIOS + '/login/renuevatoken';  // url = http://localhost:3000/login/renuevatoken?token=xxxxxxx 
        url += '?token=' + this.token;

        return this.http.get(url)  // Retorna la respuesta de esta petición http a la url indicada. El server puede retornar dos cosas, la respuesta si todo está OK o un error si existe algún problema
              .pipe(map((resp: any) => {  // Pasa por el operador map la respuesta retornada por el server si todo está OK
                  this.token = resp.token;  // Almacena en la propiedad token el nuevo token que retorna en la respuesta el server si todo está OK al hacerle la petición http 
                  localStorage.setItem('token', this.token);  //Guarda el nuevo token del usuario logeado en el LocalStorage en una clave token
                  return true; // Si todo sale bien retorna un true
              }), 
              catchError(err => {  // Con catchError capturo el error que envía como respuesta el server de la petición http si no es posible renovar el token
                  this.router.navigate(['/login']);  // Si la petición http no puede renovar el token y retorna un error entonces redirecciona el usuario a la ruta del login '/login'
                  Swal.fire('Error al renovar token', 'No fue posible renovar el token', 'error');  //Alerta de SweetAlert2 para mostrar el error si no se puede renovar el token
                  return throwError(err);  // El throwError es el objeto (importado desde 'rxjs') que devuelve el catchError (recuerda que es un observable) como notificación de un error  
              })
              )
  }

  estaLogueado(){

        return (this.token.length > 1) ? true : false; //Si el token existe retorna un booleano 'true' sino un 'false' (Operador ternario) (si retorna un 'true' significa que existe un token y que el usuario está logueado correctamente de lo contrario retornará un 'false' porque el usuario no está logueado)
      }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any){

        localStorage.setItem('id', id);  //Guarda el id del usuario logeado en el LocalStorage en una clave id
        localStorage.setItem('token', token);  //Guarda el token del usuario logeado en el LocalStorage en una clave token
        localStorage.setItem('usuario', JSON.stringify(usuario)); //Guarda el usuario del usuario logeado en el LocalStorage en una clave usuario como es un JSON (o sea un objeto) pásalo por el método 'JSON.stringify' para convertirlo a texto plano que es el formato en que almacena los datos el LocalStorage
        localStorage.setItem('menu', JSON.stringify(menu));  //Guarda el menu del usuario logeado (este menú variará según el role del usuario logueado) en el LocalStorage en una clave 'menu'. Como es un JSON (o sea un arreglo de objetos) pásalo por el método 'JSON.stringify' para convertirlo a texto plano que es el formato en que almacena los datos el LocalStorage
    
        this.usuario = usuario;  // Almacena en la propiedad usuario los datos del usuario pasado en el argumento de la función
        this.token = token;  // Almacena en la propiedad token el valor del token pasado en el argumento de la función    
        this.menu = menu; // Almacena en la propiedad menu el valor de menu pasado en el argumento de la función
  }

  cargarStorage(){
    
        if(localStorage.getItem('token')){  // Si existe la clave token en el LocalStorage (o sea que hay un usuario logueado)
          this.token = localStorage.getItem('token');  // Guarda el contenido de la clave token en la propiedad token
          this.usuario = JSON.parse(localStorage.getItem('usuario'));  // Guarda el contenido de la clave usuario en la propiedad usuario se pasa por el JSON.parse para convertirlo a un objeto nuevamente ya que en el LocalStorage se almenena en forma de texto plano
          this.menu = JSON.parse(localStorage.getItem('menu'));  // Guarda el contenido de la clave menu en la propiedad menu se pasa por el 'JSON.parse' para convertirlo a un arreglo de objetos nuevamente ya que en el LocalStorage se almenena en forma de texto plano
        } else{  // De lo contrario si no existe la clave token en el LocalStorage haz lo sgte
          this.token = '';  // Deja la propiedad token vacía o null
          this.usuario = null;  // Deja la propiedad usuario en null
          this.menu = null;  // Deja la propiedad menu en null
        }
  }

  logout(){

        this.usuario = null;  // Pon la propiedad usuario a null
        this.token = '';  // Pon la propiedad token a vacío
        this.menu = null;  // Pon la propiedad menu a null
        localStorage.removeItem('usuario');  // Borra la clave usuario del LocalStorage
        localStorage.removeItem('menu');  // Borra la clave menu del LocalStorage
        localStorage.removeItem('token');  // Borra la clave token del LocalStorage
        localStorage.removeItem('id');  // Borra la clave id del LocalStorage
        this.router.navigate(['/login']);  // Navega a la ruta 'http://localhost:4200/login' del componente login 
  }

  login(usuario: Usuario, recuerdame: boolean = false){

        if(recuerdame){  //Si recuerdame es true (el checkmark de recordar correo está marcado)
          localStorage.setItem('email', usuario.email)  //Guarda el email del usuario en el LocalStorage en una clave llamada email
        }else{
          localStorage.removeItem('email');  // Si el checkmark no está activado borra del LocalStorage la clave email si existe
        }
    
        let url = URL_SERVICIOS + '/login';  // url = 'http://localhost:3000/login' a la cual haremos la petición http
    
        return this.http.post(url, usuario)  // La respuesta a esta petición será entregada (retornada) a quien esté suscrito (esto es un observable)
        .pipe(map( (resp: any) => {  // Si la petición http es realizada correctamente la respuesta será pasada por el operador map (este observable devolverá en la respuesta un id, un token, un usuario de tipo Usuario y un menu empleado en el sidebar)
            
            this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);  // Guarda en el LocalStorage el id, el token, el usuario y el menu en sus respectivas claves
            
            return true;  //Devuelve un true si el usuario se autentica correctamente en el backend server y se almacenan los datos en el LocalStorage correctamente
        }),
          catchError( err => {  // Método que se encarga de capturar el error ('err' de tipo HttpErrorResponse) devuelto por la petición http si existe un error (se importa del 'rxjs/operators'). Este método retornará un observable (el objeto 'throwError')
              console.log('Sucedió un Error');
              Swal.fire('Error de Login', err.error.mensaje, 'error');  //Alerta de SweetAlert2 para mostrar el error del login de usuario
              return throwError('Error Personalizado del throwError');  // El throwError es el objeto (importado desde 'rxjs') que devuelve el catchError (recuerda que es un observable) como notificación de un error
          })
        );
  }

  crearUsuario(usuario: Usuario){
  
        let url = URL_SERVICIOS + '/usuario';  // url 'http://localhost:3000/usuario' a la cual haremos la petición http
    
        return this.http.post(url, usuario)  // La respueta a esta petición http de tipo POST será entregada (retornada) a quien esté suscrito (esto es un observable). Como parámetros enviamos la url y el usuario (o sea los datos del usuario que queremos crear) que viene en el cuerpo (body) de la petición
                .pipe(map((resp: any) => {  // Si la respuesta es correcta se pasa por el operador map para obtener solo el usuario dentro de toda la respuesta
                  Swal.fire('Usuario creado', usuario.email, 'success');  //Alerta de SweetAlert2 para usuario creado
                  return resp.usuario;  // Entrega solo el usuario dentro de toda la respuesta obtenida (De toda la respuesta entragada por el observable solo retornaré el usuario)
                }),
                  catchError( err => {  // Método que se encarga de capturar el error ('err' de tipo HttpErrorResponse) devuelto por la petición http si existe un error (se importa del 'rxjs/operators'). Este método retornará un observable (el objeto 'throwError')
                  console.log('Sucedió un Error');
                  Swal.fire(err.error.mensaje, err.error.errors.message, 'error');  //Alerta de SweetAlert2 para mostrar el error de registro de usuario
                  return throwError('Error Personalizado del throwError');  // El throwError es el objeto (importado desde 'rxjs') que devuelve el catchError (recuerda que es un observable) como notificación de un error
                  })    
                );
  }

  actualizarUsuario(usuario: Usuario){

        let url = `${URL_SERVICIOS}/usuario/${usuario._id}?token=${this.token}`;  //url http://localhost:3000/usuario/:id?token=xxxxxxxxxxxx a la cual haremos la petición
    
        return this.http.put(url, usuario)  //La respueta a esta petición http será entregada (retornada) a quien esté suscrito (esto es un observable)
                .pipe(map( (resp: any) => {  // Pasa por el operador map la respuesta
    
                  if(usuario._id === this.usuario._id){  // Si el usuario que quiero actualizar es el mismo que el usuario logueado entonces guardalo en el LocalStorage
    
                    this.guardarStorage(resp.usuario._id, this.token, resp.usuario, this.menu);  //Guardar en el LocalStorage los datos del usuario actualizado que en este caso sería el usuario logueado
                  }
    
                  Swal.fire('Usuario Actualizado', resp.usuario.nombre, 'success');  //Alerta de SweetAlert2 para usuario actualizado
                  return true;  // Retorna un true si todo OK, si retornara false sabríamos que hubo problemas y no actualizó
                }));    
  }

  cambiarImagen(archivo: File, id: string){

        this.subirArchivo.subirArchivo(archivo, 'usuarios', id)
        .then((resp: any) => {  // El then de la promesa creada en el servicio subirArchivo
          
            this.usuario.img = resp.usuario.img;  // Almacena en la propiedad usuario el nuevo valor de usuario.img con la imagen actualizada
            Swal.fire('Imagen Actualizada', this.usuario.nombre, 'success');  //Alerta de SweetAlert2 para imagen actualizada
            this.guardarStorage(id, this.token, this.usuario, this.menu);  // Guarda en el LocalStorage los nuevos valores actualizados
      
        })
        .catch(resp => {  // El catch de la promesa creada en el servicio subirArchivo
          
            console.log(resp);  // Imprime en consola la respuesta con el error si existe
        });
  }

  cargarUsuarios(desde: number = 0){

        let url = URL_SERVICIOS + '/usuario?desde=' + desde;  // url = 'http://localhost:3000/usuario?desde=0' a la cual haremos la petición
    
        return this.http.get(url);  //La respueta a esta petición será entregada (retornada) a quien esté suscrito (esto es un observable)
    
  }

  buscarUsuarios(termino: string){

        let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;  // url = 'http://localhost:3000/busqueda/coleccion/usuarios/termino_de_busqueda'
    
        return this.http.get(url)  // Devuelve la busqueda realizada con los usuarios que coincidan con el término de búsqueda en la colección de usuarios de mongoDB
          .pipe(map( (resp: any) => resp.usuarios));  // Pasa la respuesta con el resultado de la búsqueda por el operador map y devuelve solo el array de usuarios
  }

  borrarUsuario(id: string){

        let url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token; // url = 'http://localhost:3000/usuario/6061f8fc782623174098b39c?token=token_de_usuaio_logueado'
    
        return this.http.delete(url)  // Petición para eliminar el usuario cuyo id va en la url
          .pipe(map( resp =>  {  // Pasa por el map la respuesta y retorna un true además del SweetAlert
            Swal.fire('Eliminado', 'Usuario eliminado correctamente', 'success');  //SweetAlert2
            return true;
          }));
  }

}
