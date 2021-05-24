import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importar el Router para poder utilizar el método (navigate)

import { Usuario } from 'src/app/models/usuario.model';

import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(public usuarioService: UsuarioService, public router: Router) {}

  ngOnInit(): void {

          this.usuario = this.usuarioService.usuario;
        }

  buscar(termino: string){

          this.router.navigate(['/busqueda', termino]);
  }

}
