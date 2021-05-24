import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  // Importar el Router para poder utilizar el método 'navigate' y navegar a la ruta especificada

import { UsuarioService } from '../services/usuario/usuario.service';

import { Usuario } from '../models/usuario.model';

import Swal from 'sweetalert2'  //Importar el SweetAlert2 para mostrar ventanas de notifacación animadas (como los modales o los popup)

declare function init_plugings();  //Carga el componente correctamente de lo contrario nunca cargaría. Esta importación 'declare' llama la función 'init_plugings()' de la ruta "assets/js/custom.js" que es donde se ubican todos los pluggins js de la página

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;  // Esta propiedad almacenará el formulario de registro de tipo FormGroup con todas las validaciones ya incluidas del lado de js (Reactive Forms)

  constructor(public usuarioService: UsuarioService, public router: Router) { }

  sonIguales(campo1: string, campo2: string){  // Esta función comprueba que el password coincida en los dos campos del formulario (confirmar contraseña) no devolverá nada (null) si coinciden o devolverá un 'true' si no coincidel los password

          return (group: FormGroup) => {
      
            let pass1 = group.controls[campo1].value;  // Almacena en 'pass1' el password escrito en el campo 'contraseña' del formulario de registro
            let pass2 = group.controls[campo2].value;  // Almacena en 'pass2' el password escrito en el campo 'confirmar contraseña' del formulario de registro
      
            if(pass1 === pass2){
              return null  //Si las password son iguales devuelve nulo significa que pasó la validación
            }
            return {
              sonIguales: true  //Si los password son diferentes devuelve true o sea activa la validación
            };
          };
  }

  ngOnInit(): void {

          init_plugings();  //Llama a la función importada 'declare function init_plugings()' cuando carga el componente para que se muestre correctamente
      
          this.forma = new FormGroup({  // Almacena los datos insertados en el formulario de registro con las validaciones incluidas
            nombre: new FormControl('', Validators.required),
            correo: new FormControl('', [Validators.required, Validators.email]),  // Cuando un campo necesita más de una validación como es el caso se imcluyen dentro de un arreglo, pueden ser tantas como sea nesesario
            password: new FormControl('', Validators.required),
            password2: new FormControl('', Validators.required),
            condiciones: new FormControl(false)
           }, {validators: this.sonIguales('password', 'password2')}  //Validación personalizada para comparar los password
          );
      
          this.forma.setValue({  // Con este método 'setValue' re rellena el formulario de registro con estos valores por defecto
            nombre: 'Test',
            correo: 'test@gmail.com',
            password: '123',
            password2: '123',
            condiciones: true
          });      
  }

  registrarUsuario(){
    
          if(this.forma.invalid){  //Si el formulario es invalido retorna y no hagas nada
            return;
          }
          if(!this.forma.value.condiciones){  //Si las condiciones no son aceptadas imprime en consola este mensaje y retorna sin hacer nada más
            Swal.fire('Importante!', 'Debe de aceptar las condiciones', 'warning');
            return;
          }              
          let usuario = new Usuario(  // Si el formulario es válido almacena en la varible let 'usuario' de tipo Usuario (modelo Usuario) los datos insertados en el formulario
            this.forma.value.nombre,  // Quedaría algo como esto (nombre, email, password) los campos de 'img', 'role' e '_id' son opcionales por lo que no es obligatorio insertarlos en este momento (ver modelo de Usuario)
            this.forma.value.correo,
            this.forma.value.password
          )
      
          this.usuarioService.crearUsuario(usuario)  // Ejecuta el método crearUsuario del servicio usuarioService y pasa como parámetro los datos del usuario almacenado anteriormente en la variable let 'usuario'
            .subscribe(resp => {  // Me suscribo al método anterior que es un observable y obtengo la respuesta entregada por este que es un usuario (o sea los datos del nuevo usuario creado y almacenado en la colección usuarios)
                console.log(resp);
                this.router.navigate(['/login']);  // Navega a la sgte ruta '/login' del componente login para que el nuevo usuario creado se pueda autenticar si lo desea
            });      
  }

}
