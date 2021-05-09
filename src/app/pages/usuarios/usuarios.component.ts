import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import Swal from 'sweetalert2';  // SweetAlert2

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  desde: number = 0;

  totalUsuarios: number = 0;

  cargando: boolean;

  constructor( public usuarioService: UsuarioService, public modalUploadService: ModalUploadService) { }

  ngOnInit(): void {

    this.cargarUsuarios(this.desde);

    this.modalUploadService.notificacion  // Me suscribo al observable notificación para que me avise cuando se ha subido una imagen
      .subscribe(resp => {
        this.cargarUsuarios(this.desde);  // Cuando se suba una imagen actualiza el html y se mostrará el susuario con la nueva imagen subida
      });
  }

  cargarUsuarios(desde: number){

    this.cargando = true;  // Para que se muestre el alert de cargando en el html (se utiliza en el *ngIf)

    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {  // Recibe la respuesta entregada por la función cargarUsuarios del servicio usuarioService, se especifica el tipo: any para que no de error más abajo

        this.totalUsuarios = resp.total;
        this.usuarios = resp.usuarios;

        this.cargando = false;  // Para que se muestre la tabla con los usuarios en el html (se utiliza en el *ngIf)

      })
  }

  cambiarDesde(valor: number){

    let desde = this.desde + valor;

    if(desde >= this.totalUsuarios){  // Si es mayor o igual que totalUsuarios no tiene sentido por lo tanto retorna sin hacer nada
      return;
    }

    if(desde < 0){  // Si es menor que 0 no tiene sentido por lo tanto retorna sin hacer nada
      return;
    }

    this.desde += valor;  // Si let desde está entre 0 y el totalUsuarios súmale el valor de let desde a la propiedad this.desde

    this.cargarUsuarios(this.desde);  // Ejecuta la función cargaUsuarios con el nuevo valor de la propiedad this.desde

  }

  buscarUsuario(termino: string){

    if(termino.length <= 0){  // Si el término de búsqueda está vacío entonces llama a ala función cargarUsuarios para que muestre todos los usuarios paginados

      this.cargarUsuarios(this.desde);
      return;
    }

    this.cargando = true;  // Para que mustre el alert de cargando con el *ngIf del html mientras realiza la búsqueda

    this.usuarioService.buscarUsuarios(termino)  // Llama a la función buscarUsuarios del usuarioService y suscríbete para obtener la respuesta del arreglo de usuarios entregada por esta
      .subscribe((usuarios: Usuario[]) => {

        this.usuarios = usuarios;  // Guarda en la propiedad usuarios el arreglo de usuarios entregado por el usuarioService al que nos suscribimos para que lo mustre en la tabla del html
        this.cargando = false;  // Para que mustre la tabla con los usuarios encontrados en la b'squeda y no muestre el alert de Cargando del html
        console.log(this.usuarios);
      });
  }

  borrarUsuario(usuario: Usuario){

    if(usuario._id === this.usuarioService.usuario._id){  //Si el usuario es el que está logueado ejecuta un SweetAlert2 impidiendo borrarlo y retorna

      Swal.fire('No puede eliminar este usuario', 'No se puede borrer a si mismo', 'error');
      return;
    }

    Swal.fire({  // Si el usuarioa borrar no es el logueado entonces ejecuta el SweetAlert2
      title: '¿Desea borrar este usuario?',
      text: 'Está a punto de eliminar a: ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then(borrar => {
      if (borrar.isConfirmed) {  // Si confirma eliminar el usuario entonces ejecuta la función borrarUsuario del usuarioService

        this.usuarioService.borrarUsuario(usuario._id)  // ejecuta la función borrarUsuario del usuarioService
          .subscribe( borrado => {  // Suscríbete al observable para obtener la respuesta devuelta por la función borrarUsuario del usuarioService

            console.log(borrado);
            this.cargarUsuarios(this.desde = 0);  // Ejecuta cargarUsuarios para refrescar la vista del html
          });

      }
    });

  }


  actualizarRole(usuario: Usuario){

    this.usuarioService.actualizarUsuario(usuario)  // Me suscribo al método actualizarUsuario del usuarioService que es un observable para obtener la respuesta que en este caso es un booleano true
      .subscribe(resp => {
    
        console.log(resp);  // Imprimo en consola el true que envía el observable como respuesta
      })
  }

  mostrarModal(id: string){

    this.modalUploadService.mostrarModal('usuarios', id)  // Muestra el modal de subir imagen cuando se haga click en la imagen del usuario en cuestión
  }

}
