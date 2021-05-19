import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import { URL_SERVICIOS } from '../../config/config';

import Swal from 'sweetalert2';  // Importar SweetAlert2
import { Usuario } from '../../models/usuario.model';  // Importar el modelo de usuario
import { Hospital } from '../../models/hospital.model';  // Importar el modelo de hospital

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token: string;

  usuario: Usuario;

  hospital: Hospital;

  totalHospitales: number;

  constructor(public http: HttpClient) {

        this.cargarStorage();  //Ejecuta este método en cuanto se carga el servicio
  }

  cargarStorage(){
    
        if(localStorage.getItem('token')){  // Si existe la clave token en el LocalStorege
          this.token = localStorage.getItem('token');  // Guarda el contenido de la clave token en la propiedad token
          this.usuario = JSON.parse(localStorage.getItem('usuario'));  // Guarda el contenido de la clave usuario en la propiedad usuario se pasa por el JSON.parse para convertirlo a un objeto nuevamente ya que en el LocalStorage se almenena en forma de texto plano
        } else{
          this.token = '';  // Si no existe la clave token en el LocalStorage deja la propiedad token vacía o null
          this.usuario = null;  // Si no existe la clave token en el LocalStorage deja la propiedad usuario null
        }
  }


  cargarHospitales(desde: number, limite?: number){

        let url = URL_SERVICIOS + '/hospital?desde=' + desde + '&limite='+ limite;  // url = 'http://localhost:3000/hospital?desde=desde&limite=limite' (desde es un valor numérico a partir de que hospital de la DB será mostrado en la vista html y limite seré la cantidad de hospitales que serán mostradoe en la vista)
    
        this.cargarStorage();  // Recarga los valores de las propiedades token y usuario almacenados en el LocalStorage para actualizarlos

        return this.http.get(url)
            .pipe(map((resp: any) => {
              this.totalHospitales = resp.total;
              return resp.hospitales;
            }));    
  }

  obtenerHospital( id: string ){
    
        let url = URL_SERVICIOS + '/hospital/' + id;  // url = 'http://localhost:3000/hospital/id_del_hospital_que_desea_obtener'
    
        return this.http.get(url)  // Hacer petición http a esa url y esta nos devolverá una respuesta con todos los detalles del hospital cuyo id le pasamos como parámetro por la url
          .pipe(map( (resp: any) => {  // Pasar por el map la respuesta devuelta y obtener solo el hospital
              return resp.hospital;
          }));    
  }

  borrarHospital( id: string ){

        let url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this.token;  // url = 'http://localhost:3000/hospital/6064ad5465fe8126cc832c9b?token=xxxxxxxxxxx'
    
        this.cargarStorage();  // Recarga los valores de las propiedades token y usuario almacenados en el LocalStorage para actualizarlos

        return this.http.delete(url)
          .pipe(map((resp: any) => {
            console.log(resp.hospital);
            Swal.fire('Hospital Eliminado', 'Hospital ' + resp.hospital.nombre + ' eliminado correctamente', 'success');  //SweetAlert2
            return true
          }));    
  }

  crearHospital( nombre: Hospital ){

        let url = URL_SERVICIOS + '/hospital?token=' + this.token;   // url = 'http://localhost:3000/hospital?token=token_usuario_que_crea_hospital'
    
        return this.http.post(url, nombre);
  }

  buscarHospitales( termino: string ){
    
        let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;  // url = 'http://localhost:3000/busqueda/coleccion/hospitales/termino_de_busqueda'
    
        return this.http.get(url)  // Devuelve la busqueda realizada con los hospitales que coincidan con el término de búsqueda en la colección de hospitales de mongoDB
          .pipe(map( (resp: any) => resp.hospitales));  // Pasa la respuesta con el resultado de la búsqueda por el operador map y devuelve solo el array de hospitales
    
  }

  actualizarHospital( hospital: Hospital ){

        let url = `${URL_SERVICIOS}/hospital/${hospital._id}?token=${this.token}`;  //url 'http://localhost:3000/hospital/:id?token=xxxxxxxxxxxx' a la cual haremos la petición
    
        this.cargarStorage();  // Recarga los valores de las propiedades token y usuario almacenados en el LocalStorage para actualizarlos

        return this.http.put(url, hospital)  //La respueta a esta petición será entregada (retornada) a quien esté suscrito (esto es un observable)
                .pipe(map( (resp: any) => {  // Pasa por el operador map la respuesta    
    
                  Swal.fire('Hospital Actualizado', resp.hospital.nombre, 'success');  //Alerta de SweetAlert2 para hospital actualizado
                  return true;  // Retorna un true si todo OK, si retornara false sabríamos que hubo problemas y no actualizó
                }));
    

  }


}
