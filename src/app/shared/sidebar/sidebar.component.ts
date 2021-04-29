import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(public sideService: SidebarService, public usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

}
