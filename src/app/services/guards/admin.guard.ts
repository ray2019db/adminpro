import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';  // Importar el servicio de usuario para utilizar su propiedad 'role' y su método 'logout()'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService){}  // Inyectar el servico de UsuarioService

  canActivate(){  // Este método retornará un booleano que si es true me permitirá navegar a la ruta donde dende se aplique este AdminGuard (en el archivo de rutas) y si retorna false no será posible navegar a la ruta donde se aplique este AdminGuard

          if(this.usuarioService.usuario.role === 'ADMIN_ROLE'){  // Si el usuario logueado posee el role 'ADMIN_ROLE' retorna un 'true' para que este usuario pueda navegar a la ruta protegida por este Admin Guard           
              return true;
          }
          else{  // Si el usuario logueado no posee el role de 'ADMIN_ROLE' muestra el sgte mensaje, ejecuta el método' usuarioService.logout()' (para desloguear al usuario) y retorna un 'false'
              console.log('Bloqueado por el Admin Guard');
              this.usuarioService.logout();  // Ejecuta el método 'usuarioService.logout()' del sevicio de usuario
              return false;
          }
  }
  
}
