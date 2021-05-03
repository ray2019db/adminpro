import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';  // SweetAlert2

import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  usuario: Usuario

  imagenSubir: File;

  imagenTemporal: any;

  constructor( public usuarioService: UsuarioService) { }

  ngOnInit(): void {

        this.usuario = this.usuarioService.usuario;  //Cargo el usuario del servicio en la propiedad usuario del componente en cuanto se carga el mismo
  }

  guardar(form: NgForm){
    
        this.usuario.nombre = form['nombre'];  //Le asigno el nombre que viene del formulario (html) a la propiedad nombre del usuario
        this.usuario.email = form['email'];  //Le asigno el email que viene del formulario (html) a la propiedad email del usuario
    
        this.usuarioService.actualizarUsuario(this.usuario)
        .subscribe();
    
  }

  seleccionImagen(archivo: File){

        if(!archivo){  // Si no existe o no hay ningún archivo seleccionado la propiedad imagenSubir ponla a null y retorna sin hacer nada
          this.imagenSubir = null;
          return;
        }

        if(archivo.type.indexOf('image') < 0){  // Si el archivo seleccionado no es de tipo imagen (type: image)

          Swal.fire('No es una imagen', 'El archivo debe ser de tipo imagen', 'error');  //Alerta de SweetAlert2 para notificar que el archivo no es una imagen
          this.imagenSubir = null;  // La propiedad imagenSubir se le asigna un null
          return;
        }
    
        this.imagenSubir = archivo;  // Si el archivo existe guardalo en imagenSubir

        let reader = new FileReader();  // Declaración de un reader para leer el archivo (JavaScript puro)

        let urlImagenTemporal = reader.readAsDataURL(archivo);  // url de la imagen temporal

        reader.onloadend = () => this.imagenTemporal = reader.result;
            
        console.log(this.imagenSubir);
  }

  cambiarImagen(){

        this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
