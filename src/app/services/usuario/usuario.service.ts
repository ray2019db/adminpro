import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';  //importar map

import Swal from 'sweetalert2'  //Importar SweetAlert2

import { Usuario } from 'src/app/models/usuario.model';  //Importar el modelo de Usuario
import { URL_SERVICIOS } from 'src/app/config/config';  //Importar la url base 'http://localhost:3000' para cualquier petición al backend-server

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;

  token: string;

  constructor(public http: HttpClient, public router: Router) {

    this.cargarStorage();
  }

  estaLogueado(){

    return (this.token.length > 1) ? true : false; //Si el token existe retorna un true sino un false (Operador ternario)
  }

  guardarStorage(id: string, token: string, usuario: Usuario){

    localStorage.setItem('id', id);  //Guarda el id del usuario logeado en el LocalStorage en una clave id
    localStorage.setItem('token', token);  //Guarda el token del usuario logeado en el LocalStorage en una clave token
    localStorage.setItem('usuario', JSON.stringify(usuario)); //Guarda el usuario del usuario logeado en el LocalStorage en una clave usuario como es un JSON pásalo por el stringify para convertirlo a texto plano que es el formato en que almacena los datos el LocalStorage

    this.usuario = usuario;
    this.token = token;

  }

  cargarStorage(){
    
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else{
      this.token = '';
      this.usuario = null;
    }
  }

  logout(){

    this.usuario = null;
    this.token = '';
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }

  login(usuario: Usuario, recuerdame: boolean = false){

    if(recuerdame){  //Si recuerdame es true (el checkmark de recordar contraseña está marcado)
      localStorage.setItem('email', usuario.email)  //Guarda el email del usuario en el LocalStorage en una clave llamada email
    }else{
      localStorage.removeItem('email');  //Si el checkmark no está activado borra del LocalStorage la clave email si existe
    }

    let url = URL_SERVICIOS + '/login';  //url http://localhost:3000/login a la cual haremos la petición

    return this.http.post(url, usuario)  //La respueta a esta petición será entregada (retornada) a quien esté suscrito (esto es un observable)
    .pipe(map( (resp: any) => {  //Pasa por el map la respuesta
        // localStorage.setItem('id', resp.id);  //Guarda el id del usuario logeado en el LocalStorage en una clave id
        // localStorage.setItem('token', resp.token);  //Guarda el token del usuario logeado en el LocalStorage en una clave token
        // localStorage.setItem('usuario', JSON.stringify(resp.usuario)); //Guarda el usuario del usuario logeado en el LocalStorage en una clave usuario como es un JSON pásalo por el stringify para convertirlo a texto plano que es el formato en que almacena los datos el LocalStorage
        
        this.guardarStorage(resp.id, resp.token, resp.usuario);

        // this.usuario = resp.usuario;
        // this.token = resp.token;
        
        return true;  //Devuelve un true si se almacenan los datos en el LocalStorage correctamente
    }));
  }

  crearUsuario(usuario: Usuario){
  
    let url = URL_SERVICIOS + '/usuario';  //url http://localhost:3000/usuario a la cual haremos la petición

    return this.http.post(url, usuario)  //La respueta a esta petición será entregada (retornada) a quien esté suscrito (esto es un observable)
            .pipe(map((resp: any) => {  //La respuesta se pasa por el operador map para obtener solo el usuario dentro de toda la respuesta
              Swal.fire('Usuario creado', usuario.email, 'success');  //Alerta de SweetAlert2 para usuario creado
              return resp.usuario;  //Entrega solo el usuario dentro de toda la respuesta a quién esté suscrito
            }));
  }

}
