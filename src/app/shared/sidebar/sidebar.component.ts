import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../services/sidebar.service';
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

  constructor(public sideService: SidebarService, public usuarioService: UsuarioService) { }

  ngOnInit(): void {

    this.usuario = this.usuarioService.usuario;  //Asignarle a la propiedad usuario el valor de usuario del servicio usuarioService al cargar el componente y poder emplearlo en el html
  }

}
