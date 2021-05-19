import { Component, OnInit } from '@angular/core';

import { HospitalService } from '../../services/hospital/hospital.service';  // Servicio de hospital
import { Hospital } from '../../models/hospital.model';  // Modelo de hospital
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';  // Servicio del modal upload

import Swal from 'sweetalert2';  // Importar SweetAlet2

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[];  // Arreglo de hospitales para guardar los hospitales devuelto por el observable (servicio de hospital) y poder mostrarlos en la vista mediante un *ngFor

  hospital: Hospital;

  desde: number = 0;  // Guarda el número a partir del cual se mostrarán los hospitales de la propiedad hospitales[] en la vista html

  cargando: boolean = false;  // Booleano que permitirá mostrar o no el Alert de Cargando ... mientras se hace una solicitud y se espera la respuesta del servidor

  limite: number = 5;  // Guarda el número de hospitales que serán mostrados en la vista

  limiteHospitalesMostrados: number[] = [5, 10, 15, 20, 25, 50];  // Arreglo de valores numéricos para confeccionar el select mediante un *ngFor de la cantidad de hospitales mostrados por página en la vista

  constructor(public hospitalService: HospitalService, public modalUploadService: ModalUploadService) { }

  ngOnInit(): void {

        this.cargarHospitales(this.desde);

        this.modalUploadService.notificacion  // Me suscribo al observable notificación para que me avise cuando se ha subido una imagen
          .subscribe(resp => {
            this.cargarHospitales(this.desde);  // Cuando se suba una imagen actualiza el html y se mostrará el hospital con la nueva imagen subida
          });
  
  }

  cantidadHospitalesMostrados(){  // Permite cargar a partir de que hospital y cuantos hospitales por página serán mostrados en la vista
        this.cargarHospitales(this.desde, this.limite);
  }

  cargarHospitales(desde: number, limite?: number){
    
        this.hospitalService.cargarHospitales(this.desde, this.limite)
          .subscribe((hospitales: Hospital[]) => {
    
            this.hospitales = hospitales;  // Almacena en la propiedad hospitales el arreglo de hospitales entregado por el método cargarHospitales del servicio hospital al que nos suscribimos
          })    
  }

  cambiarDesde(valor: number){

        let desde = this.desde + valor;
    
        if(desde >= this.hospitalService.totalHospitales){  // Si es mayor o igual que totalHospitales no tiene sentido por lo tanto retorna sin hacer nada
          return;
        }
    
        if(desde < 0){  // Si es menor que 0 no tiene sentido por lo tanto retorna sin hacer nada
          return;
        }
    
        this.desde += valor;  // Si let desde está entre 0 y el totalHospitales súmale el valor de let desde a la propiedad this.desde
    
        this.cargarHospitales(this.desde);  // Ejecuta la función cargaHospitales con el nuevo valor de la propiedad this.desde
    
  }

  obtenerHospital( id: string ){

        this.hospitalService.obtenerHospital(id)
          .subscribe();
  }

  borrarHospital(id: string, nombre: string){
          Swal.fire({                                                       //========SweetAlert2====================
            title: '¿Desea borrar este Hospital?',                          //
            text: 'Está a punto de eliminar el hospital: ' + nombre,        // Todo es parte del SweetAlert2
            icon: 'warning',                                                // para que muestre la ventana
            showCancelButton: true,                                         // de confirmación para eliminar
            confirmButtonColor: '#3085d6',                                  // un hospital o cancelar el borrado
            cancelButtonColor: '#d33',                                      //  del mismo
            confirmButtonText: 'Eliminar'                                   //
          }).then(borrar => {  // Si confirma eliminar el hospital
            if (borrar.isConfirmed) {  // Si confirma eliminar el hospital entonces ejecuta la función borrarHospital del hospitalService
      
              this.hospitalService.borrarHospital(id)  // ejecuta la función borrarHospital del hospitalService
                .subscribe( borrado => {  // Suscríbete al observable para obtener la respuesta devuelta por la función borrarHospital del hospitalService
      
                  this.cargarHospitales(this.desde);  // Ejecuta cargarHospitales para refrescar la vista del html y deje de mostrar el hospital eliminado
                });
            }
          });
    }

  crearHospital(){

        Swal.fire({                        //==========SWEETALERT2==============================
          title: 'Crear Nuevo Hospital',   //
          input: 'text',                   //
          inputAttributes: {               //
            autocapitalize: 'off'          // Todo esto es parte de SweetAlert2 para mostrar la ventana 
          },                               // cuando se hace click en el botón Crear Hospital de la vista
          showCancelButton: true,          // html y nos mustra el modal con el input para insertar el
          confirmButtonText: 'Crear',      // nombre del hospital a crear
          showLoaderOnConfirm: true,       //
          preConfirm: (nombreHospital) => {// (nombreHospital) es el nombre del hospital insertado en la caja de texto
    
            let hospital = new Hospital(  // Declaro la variable hostiptal de tipo Hospital como el modelo
            nombreHospital  // El primer valor o key del modelo Hospital sería {nombre: nombreHospital, img?: ..., _id?: ...} los ? del 2do y 3er valor del modelo Hospital es porque son opcionales
            );
    
            this.hospitalService.crearHospital(hospital)  // Me suscribo al método crearHospital del servicio hospitalService y obtengo la respuesta que este entrega
              .subscribe((resp: any) => {
    
                Swal.fire({
                  title: 'Hospital ' + resp.hospital.nombre + ' creado correctamente'  // SweetAlert2 con el mensaje de confirmación del hospital creado
                })
            
                this.cargarHospitales(this.desde);  // Ejecuta el método cargarHospitales para refrescar la vista html y mostrar el nuevo hospital creado
              })
          },
          allowOutsideClick: () => !Swal.isLoading()  //Esto es parte del SweetAlert2 de arriba
        })  
    
  }

  buscarHospital( termino: string ){

        if(termino.length <= 0){  // Si el término de búsqueda está vacío entonces llama a a la función cargarHospitales para que muestre todos los hospitales paginados
    
          this.cargarHospitales(this.desde);
          return;
        }
    
        this.cargando = true;  // Para que mustre el alert de cargando con el *ngIf del html mientras realiza la búsqueda
    
        this.hospitalService.buscarHospitales(termino)  // Llama al método buscarHospitales del hospitalService y suscríbete para obtener la respuesta del arreglo de hospitales entregado por este
          .subscribe((hospitales: Hospital[]) => {
    
            this.hospitales = hospitales;  // Guarda en la propiedad hospitales el arreglo de hospitales entregado por el hospitalService al que nos suscribimos para que lo muestre en la tabla del html
            this.cargando = false;  // Para que mustre la tabla con los hospitales encontrados en la búsqueda y no muestre el alert de Cargando del html
          });   

  }

  actualizarNombreHospital( hospital: Hospital ){

        this.hospitalService.actualizarHospital(hospital)
          .subscribe(resp => {
              this.cargarHospitales(this.desde);  // Ejecuta cargarHospitales para refrescar la vista del html
          })
  }

  mostrarModal(id: string){

        this.modalUploadService.mostrarModal('hospitales', id)  // Muestra el modal de subir imagen cuando se haga click en la imagen del usuario en cuestión
    
  }

}
