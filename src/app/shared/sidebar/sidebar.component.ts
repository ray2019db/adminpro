import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  menu: any[] = [];

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit(): void {

          this.usuario = this.usuarioService.usuario;  //Asignarle a la propiedad usuario de tipo Usuario (modelo de Usuario) el valor de la propiedad usuario del servicio usuarioService al cargar el componente y poder emplearlo en el html
          
          this.menu = this.usuarioService.menu;  // Al inicializar el componente (observa que está dentro del 'ngOnInit') almacena en la propiedad menu los datos que posee la propiedad menu del servicio usuarioService (de esta manera se garantiza que el menu del sidebar se cargue correctamente según el role del usuario que se autentique)
  }

}
