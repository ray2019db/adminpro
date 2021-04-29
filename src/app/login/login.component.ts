import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from '../services/usuario/usuario.service';  //Importar el servicio

import {Usuario} from '../models/usuario.model';  //Importa el modelo de usuario

declare function init_plugings();  //Carga el componente correctamente de lo contrario nunca cargaría porque llama la función init_plugings() del archivo "assets/js/custom.js" que es donde se ubican todos los pluggins js de la página

declare const gapi: any;  //Declarar la constante gapi de la libreria de google importada en el index.html

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;

  email: string;

  auth2: any;  //Objeto de signIn que contendrá el perfil de usuario, el token etc.

  constructor(private router: Router, public usuarioService: UsuarioService) { }

  ngOnInit(): void {
      
    init_plugings();  //Llama a la función cuando carga el componente para que se muestre correctamente

    
    this.email = localStorage.getItem('email') || '';  //Guarda en email el valor (correo) almacenado en la clave email del LocalStorage si no existe la clave dejalo vacío
    
    if(this.email.length > 0){  //Si en email existe algún valor
      this.recuerdame = true;  //Activa el checkmark de recuérdame
    }
   
    this.googleInit();  //llama la función googleInit
    
  }

  // ====================================================================================================
  // INICIO DE GOOGLE SIGNIN 
  // ====================================================================================================
  
  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '908215014748-vnj1rgs9f3rfgk6uusprs06t7pftjk3m.apps.googleusercontent.com',  //Es el clien_id del usuario en google
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));  //'btnGoogle' es el id del botón de google signin
    });
  }

  attachSignin(element){
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;  //Devuelve el token de google
      console.log(token);
    });
  }

// =======================================================================================================
// FIN DE GOOGLE SIGNIN
// ======================================================================================================= 

  ingresar(formLogin: NgForm){

        if(formLogin.invalid){  //Si el formulario no es válido sal sin hacer nada más
          return;
        }

        let usuario = new Usuario(null, formLogin.value.email, formLogin.value.password);  //Variable usuario de tipo Usuario (modelo usuario) con los valores que vienen del formulario (html) el nombre es null porque no lo necesito en este caso

        this.usuarioService.login(usuario, formLogin.value.recuerdame)  //Ejecuta el método login del servicio usuarioService
        .subscribe(resp => {  //Me suscribo para escuchar la respuesta que devuelve el método login
          console.log(resp);  //Imprime en consola la respuesta enviada por el método login
          this.router.navigate(['/dashboard']);  //Navega al Dashboard
        });

        // console.log('Formulario válido: ', formLogin.valid);
        // console.log(formLogin.value);
        // console.log('Ingresando');
        // this.router.navigate(['/dashboard']);
  }

}
