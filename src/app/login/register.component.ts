import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from '../services/usuario/usuario.service';

import { Usuario } from '../models/usuario.model';

import Swal from 'sweetalert2'

declare function init_plugings();  //Carga el componente correctamente de lo contrario nunca cargaría porque llama la función init_plugings() del archivo "assets/js/custom.js" que es donde se ubican todos los pluggins js de la página

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public usuarioService: UsuarioService, public router: Router) { }

  sonIguales(campo1: string, campo2: string){

    return (group: FormGroup) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if(pass1 === pass2){
        return null  //Si las password son iguales devuelve nulo significa que pasó la validación
      }
      return {
        sonIguales: true  //Si los password son diferentes devuelve true o sea activa la validación
      };
    };
  }

  ngOnInit(): void {

    init_plugings();  //Llama a la función cuando carga el componente para que se muestre correctamente

    this.forma = new FormGroup({
      nombre: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required),
      condiciones: new FormControl(false)
     }, {validators: this.sonIguales('password', 'password2')}  //Validación personalizada para comparar los password
    );

    this.forma.setValue({
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

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    )

    this.usuarioService.crearUsuario(usuario)
    .subscribe(resp => {
        console.log(resp);
        this.router.navigate(['/login']);
    });

  }

}
