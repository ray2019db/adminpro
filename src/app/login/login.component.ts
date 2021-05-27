import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from '../services/usuario/usuario.service';  //Importar el servicio de usuario

import {Usuario} from '../models/usuario.model';  //Importa el modelo de usuario

declare function init_plugings();  //Carga el componente correctamente de lo contrario nunca cargaría porque llama la función init_plugings() del archivo "assets/js/custom.js" que es donde se ubican todos los pluggins js de la página

// declare const gapi: any;  //Declarar la constante gapi de la libreria de google importada en el index.html para el logueo con google

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;

  email: string;

  // auth2: any;  //Objeto de signIn que contendrá el perfil de usuario, el token etc.

  constructor(private router: Router, public usuarioService: UsuarioService) { }

  ngOnInit(): void {
      
    init_plugings();  //Llama a la función cuando carga el componente para que se muestre correctamente

    
    this.email = localStorage.getItem('email') || '';  //Guarda en email el valor (correo) almacenado en la clave email del LocalStorage si no existe la clave dejalo vacío
    
    if(this.email.length > 0){  //Si en la propiedad email existe algún valor
      this.recuerdame = true;  //Activa el checkmark de recuérdame en la vista html
    }
   
    // this.googleInit();  //llama la función googleInit
    
  }

  // ====================================================================================================
  // INICIO DE GOOGLE SIGNIN 
  // ====================================================================================================
  
  // googleInit(){
  //   gapi.load('auth2', () => {
  //     this.auth2 = gapi.auth2.init({
  //       client_id: '908215014748-vnj1rgs9f3rfgk6uusprs06t7pftjk3m.apps.googleusercontent.com',  //Es el clien_id del usuario en google
  //       cookiepolicy: 'single_host_origin',
  //       scope: 'profile email'
  //     });

  //     this.attachSignin(document.getElementById('btnGoogle'));  //'btnGoogle' es el id del botón de google signin
  //   });
  // }

  // attachSignin(element){
  //   this.auth2.attachClickHandler(element, {}, (googleUser) => {
  //     // let profile = googleUser.getBasicProfile();
  //     let token = googleUser.getAuthResponse().id_token;  //Devuelve el token de google
  //     console.log(token);
  //   });
  // }

// =======================================================================================================
// FIN DE GOOGLE SIGNIN
// ======================================================================================================= 

// =======================================================================================================
// INICIO DEL LOGIN NORMAL
// ======================================================================================================= 

  ingresar(formLogin: NgForm){

        if(formLogin.invalid){  //Si el formulario no es válido sal sin hacer nada más
          return;
        }

        let usuario = new Usuario(      //Variable usuario de tipo Usuario (modelo usuario) con los valores que vienen del formulario (html) el nombre es null porque no lo necesito en este caso
                      null,   // Nombre de usuario, en este caso es null porque no necesito el nombre del usuario para loguearme (solo necesito el email y el password)
                      formLogin.value.email,   // Email del usuario que quiere autenticarse obtenido del input del email del formulario de la vista html
                      formLogin.value.password  // Password del usuario que quiere autenticarse obtenido del input del password del formulario de la vista html
                      );

        this.usuarioService.login(usuario, formLogin.value.recuerdame)  //Ejecuta el método login del servicio usuarioService se pasa como parámetros el usuario 'let usuario' y el valor del recuérdame que es el estado del checkmark
          .subscribe(resp => {  //Me suscribo para escuchar la respuesta que devuelve el método login que es un observable (devuelve un true si el usuario se autentica correctamente en el backend server) o un error si existe
            console.log(resp);  //Imprime en consola la respuesta enviada por el método login
            this.router.navigate(['/dashboard']);  //Navega a la sgte ruta '/dashboard' o sea al componente Dashboard cuando el usuario se loguea en la aplicación
          });
  }

}
