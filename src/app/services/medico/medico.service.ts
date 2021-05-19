import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';  // Importar el orador map

import { UsuarioService } from '../usuario/usuario.service';  // Importar el servicio de UsuarioService
import { URL_SERVICIOS } from '../../config/config';  // Importar la ruta 'http://localhost:3000'
import Swal from 'sweetalert2';  // Importar SweetAlert2
import { Medico } from '../../models/medico.model';  // importar el Modelo de médico

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  
  constructor(public http: HttpClient, public usuarioService: UsuarioService) {

          this.usuarioService.cargarStorage();  //Ejecuta este método en cuanto se carga el servicio para cargar los datos almacenados en el LocalStorage
  }

  cargarMedicos(desde: number){

          let url = URL_SERVICIOS + '/medico?desde=' + desde;  // url = 'http://localhost:3000/medico?desde=desde' (desde es un valor numérico a partir de que médico de la DB será mostrado en la vista html)
      
          this.usuarioService.cargarStorage()  // Recarga los valores de las propiedades token y usuario almacenados en el LocalStorage para actualizarlos
      
          return this.http.get(url);    
  }

  cargarMedico(id: string){

          let url = URL_SERVICIOS + '/medico/' + id;  // url = 'http://localhost:3000/medico/id_del_medico'

          return this.http.get(url)  // Hacer una petición get a la url anterior
                    .pipe(map((resp: any) => resp.medico));  // De la respuesta obtenida solo retornar el medico
  }

  borrarMedico( id: string ){

          let url = URL_SERVICIOS + '/medico/' + id + '?token=' + this.usuarioService.token;  // url = 'http://localhost:3000/medico/6064c945ee2fca2a10ec4ea6?token=xxxxxxxxxxx'
      
          this.usuarioService.cargarStorage();  // Recarga los valores de las propiedades token y usuario almacenados en el LocalStorage para actualizarlos
      
          return this.http.delete(url)
            .pipe(map((resp: any) => {
              console.log(resp.hospital);
              Swal.fire('Médico Eliminado', 'Médico ' + resp.medico.nombre + ' eliminado correctamente', 'success');  //SweetAlert2
              return true
            }));    
  }

  buscarMedicos( termino: string ){
    
          let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;  // url = 'http://localhost:3000/busqueda/coleccion/medicos/termino_de_busqueda'
      
          return this.http.get(url)  // Devuelve la busqueda realizada con los Médicos que coincidan con el término de búsqueda en la colección de medicos de mongoDB
            .pipe(map( (resp: any) => resp.medicos));  // Pasa la respuesta con el resultado de la búsqueda por el operador map y devuelve solo el array de médicos      
  }

  guardarMedico(medico: Medico){

          if(medico._id){  // Si existe la propiedad medico.id significa que el médico existe por lo tanto en este caso vamos a actualizar

                let url = URL_SERVICIOS + '/medico/' + medico._id + '?token=' + this.usuarioService.token; // url = 'http://localhost:3000/medico/id_medico_actualizar?token=xxxxxx'

                return this.http.put(url, medico)  // A este método PUT le pasamos en el argumento la url y los datos del médico que queremos actualizar
                  .pipe(map((resp: any) => {  // Pasa por el map la respuesta devuelta por el método
                      Swal.fire('Médico Actualizado', resp.medico.nombre, 'success');  //SweetAlert2
                      return resp.medico  // Retorna de la respuesta solo el medico
                }))
                        
          } else {  // Si no existe la propiedad medico.id entonces el médico no existe en la DB de médicos por lo tanto en este caso vamos a crear
            
                let url = URL_SERVICIOS + '/medico?token=' + this.usuarioService.token; // url = 'http://localhost:3000/medico?token=xxxxxxx'
    
                return this.http.post(url, medico)  // A este método POST le pasamos en el argumento la url y los datos del nuevo médico que queremos crear
                  .pipe(map((resp: any) => {  // Pasa por el map la respuesta devuelta por el método
                      Swal.fire('Médico Creado', resp.medico.nombre, 'success');  //SweetAlert2
                      return resp.medico  // Retorna de la respuesta solo el medico
                  }))
          }
  }

}
