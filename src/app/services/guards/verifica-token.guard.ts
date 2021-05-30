import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';  // Importar el Router para usar el navigate

import { UsuarioService } from '../usuario/usuario.service';  // Importar el servico de usuario para obtener el 'token' del usuario y la función 'renuevaToken()'

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {  // Donde se implemente este Guard protegerá la ruta si el token no es válido o expiró
        
    constructor(public usuarioService: UsuarioService, public router: Router){}

    canActivate(): Promise<boolean> | boolean {  // Este canActivate puede regresar un boolean o una promesa que retorna un boolean
         
            let token = this.usuarioService.token;  // La variable token almacenará el token actual del usuario. Los token de JWT no son más que un string codificado en base-64 con la información del usuario
            let payload = JSON.parse( atob(token.split('.')[1])); // En la variable 'payload' se almacenará el contenido del token (datos del usuario decodificado incluyendo la fecha en que expira el token). El 'JSON.parse()' es para evaluar un string ya que el token es un string (convierte un string en un JSON). El 'atob()' es una función que decodifica una cadena de datos que ha sido codificada en base-64. El 'token.split('.')[1]' separará el string del token en pedazos utilizando el punto como separador '.' (donde exista un punto en el string del token lo dividirá y lo almacenará en un arreglo) y el [1] indica la segunda pocisión de ese arreglo (recuerda que la primera pocisión sería [0]) que es el objeto donde se almacena toda la información del usuario en ese token
    
            let expirado = this.expiro(payload.exp);  // Esta variable almacenará un booleano retornado por la función 'expiro()'. Se pasa como parámetro la fecha en que expira el token obtenida de la variable 'payload' concretamente en 'payload.exp'
    
            if(expirado){  // Si expirado es true significa que el token ha expirado
                      this.router.navigate(['/login']);  // Navega a la ruta indicada, en este caso '/login'
                      return false;  // Si el token expiró retorna un false para que el Guard no permita que el usuario navegue a la ruta donde esté aplicado
            }
            return this.verificaRenovarToken(payload.exp);  // Si no ha expirado el token ejecuta la función 'verificaRenovarToken()' para evaluar si es necesario o no renovar el token (recuerda que el token debe ser renovado 1 hora antes de que expire), pasa como parámetro la fecha de expiración del token 'payload.exp'
    }
          
    expiro(fechaExp: number){  // Función para determinar si la fecha del token ya expiró, se pasa como parámetro la fecha de expiración del token obtenida en la variable 'payload'

            let ahora = new Date().getTime() / 1000; // Almacena la hora actual del sistema, se divide entre 1000 ya que por defecto su valor es en milisegundos (mS) y se necesita en Segundos (S) ya que el valor de la fecha de expiración del token obtenida en el 'payload' es en Segundos
    
            if(fechaExp < ahora){  // Si se cumple esta condición significa que la fecha del token ha expirado
                return true;  // Si la fecha del token expiró retorna un true
            } else {                  
                return false;  // Si la fecha del token no ha expirado (o sea que el token aún es válido) retorna un false
            }
    }

    verificaRenovarToken(fechaExp: number): Promise<boolean>{  // Función que verifica si hay que renovar el token (el token debe ser renovado 1 hora antes de su fecha de expiración) esta retornará una promesa con un boolean que será 'true' si falta más de una hora para que expire el token o el token se renovo OK o un 'false' si ocurrio un error al renovar el token, se pasa como parámetro la fecha de expiración del token obtenida en la variable 'payload.exp'

            return new Promise( (resolve, reject) => {
                
                let tokenExp = new Date( fechaExp * 1000 );  // Almacenará la fecha en que expira el token, se multiplca por 1000 ya que este valor está en Segundos (recuerda que es el valor obtenido en el payload.exp) y el sistema trabaja las fechas en milisegundos
                let ahora = new Date();  // Almacenará la fecha actual del sistema o sea de la PC (esta está en milisegundos por defecto)

                ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000));  // Súmale a la hora actual del sistema una hora más. El '(1 * 60 * 60 * 1000)' proviene de (1 hora * 60 minutos * 60 segundos * 1000 milisegundos) recuerda que el sistema trabaja las fechas y las horas en milisegundos

                if(tokenExp.getTime() > ahora.getTime()){  // Si la fecha de expiración del token es mayor que la fecha actual del sistema incrementada en 1 hora (o sea falta más de una hora para que el token expire)
                    resolve(true);                    
                } else {  // Si el token no ha expirado pero falta menos de una hora para que expire
                    this.usuarioService.renuevaToken()  // Ejecuta el método 'renuevaToken()' del 'usuarioService' para renovar el token
                      .subscribe( () => {  // Nos suscribimos al método que es un observable que puede devolver un true si se renueva el token o un error si algo sale mal
                          resolve(true);  // Devuelve un true en el resolve de la promesa si todo sale bien (si se renovó el token)
                      }, () => {
                          reject(false);  // Devuelve un false en el reject de la promesa si existe un error y no se renueva el token
                          this.router.navigate(['/login']);  // Navega a la ruta indicada (Saca al usuario al login ya que el token no es válido)
                      }
                      )
                }
            });
    }
}
