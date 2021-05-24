import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';  //Importar el Router para poder emplear el 'navigate' a la ruta especificada

import { UsuarioService } from '../usuario/usuario.service';  // Importar el servicio de usuario

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( public usuarioService: UsuarioService, public router: Router) {}

  canActivate(){  // Método que se inyecta el las rutas, este devolverá un booleano que si es 'true' permite navegar a la ruta donde se aplique, si es 'false' bloquea la ruta

          if( this.usuarioService.estaLogueado() ){  // Si el usuario está logueado muestra el sgte mensaje y retorna un true (el método 'usuarioService.estaLogueado()' retornará un 'true' si el usuario está logueado correctamente de lo contrario retornará un 'false')
            console.log('Pasó el Login Guard');
            return true;
          } else{  // Si el usuario no está logueado muestra el sgte mensaje, navega a la sgte ruta '/login' y retorna un 'false' para que el método 'canActivate()' del guard proteja la ruta donde este a sido insertado (el guard en el archivo de rutas) y el usuario no pueda navegar a la ruta (si el usuario no está logueado el método .usuarioService.estaLogueado() retornará un 'false')
            console.log('Protegido por el Login Guard');
            this.router.navigate(['/login']);  // Navega a la ruta '/login'
            return false;
          }      
  }
  
}
