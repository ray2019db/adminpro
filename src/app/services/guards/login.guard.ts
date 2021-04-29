import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( public usuarioService: UsuarioService, public router: Router) {}

  canActivate(){

    if( this.usuarioService.estaLogueado() ){
      console.log('Pasó el Guard');
      return true;
    } else{
      console.log('Protegido por el Guard');
      this.router.navigate(['/login']);
      return false;
    }

  }
  
}
