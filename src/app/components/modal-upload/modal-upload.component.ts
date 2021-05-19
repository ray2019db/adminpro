import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';   // SweetAlet2
import { SubirArchivoService } from '../../services/subirArchivo/subir-archivo.service';  // Servicio de subir archivo importado
import { ModalUploadService } from './modal-upload.service';  // Servicio de modal upload importado

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;  // Almacenará la imagen que será subida al servidor

  imagenTemporal: any;  // Almacenará la imagen temporal que se mostrará en el modal para poder visualizarla antes de subirla al servidor


  constructor(public subirArchivoService: SubirArchivoService, public modalUploadService: ModalUploadService) {}

  ngOnInit(): void {
  }

  cerrarModal(){

          this.imagenSubir = null;  // Inicializar a null (vacío) la imagen a subir para que esté vacía cuando sea llamado el modal nuevamente
          this.imagenTemporal = null;  // Inicializar a null (vacío) la imagen temporal para que esté vacía cuando sea llamado el modal nuevamente
      
          this.modalUploadService.ocultarModal();  // Ejecuta el método ocultarModal del servicio modalUploadService para ocultar el modal
  }

  seleccionImagen(archivo: File){

          if(!archivo){  // Si no existe o no hay ningún archivo seleccionado la propiedad imagenSubir ponla a null y retorna sin hacer nada
            this.imagenSubir = null;
            return;
          }
      
          if(archivo.type.indexOf('image') < 0){  // Si el archivo seleccionado no es de tipo imagen (type: image)
      
            Swal.fire('No es una imagen', 'El archivo debe ser de tipo imagen', 'error');  //Alerta de SweetAlert2 para notificar que el archivo no es una imagen
            this.imagenSubir = null;  // La propiedad imagenSubir se le asigna un null
            return;
          }  // Si existe un archi y es de tipo imagen haz lo que sigue
      
          this.imagenSubir = archivo;  // Si el archivo existe guardalo en imagenSubir
      
          let reader = new FileReader();  // Declaración de un reader para leer el archivo (JavaScript puro)
      
          let urlImagenTemporal = reader.readAsDataURL(archivo);  // url de la imagen temporal
      
          reader.onloadend = () => this.imagenTemporal = reader.result;  // Guarda en imagenTemporal la imagen y muéstrala
              
  }

  subirImagen(){

          this.subirArchivoService.subirArchivo(this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id)  // Llamada al método subirArchivo del servicio subirArchivo que devolverá una promesa
            .then(resp => {  // Si la respuesta de la promesa es satisfactoria enviara en la respuesta el resolve de la promesa (imagen subida correctamente)
      
              this.modalUploadService.notificacion.emit(resp);  // Emite la respuesta satisfactoria a través del observable notificación del servicio modalUpload para quienes estén suscritos a este puedan saber que la imagen fue subida correctamente
              this.cerrarModal()  // Cierra el modal y borra los valores de imagenSubir e imagenTemporal para cuando sea llamado nuevamente el modal esté vacío
            })
            .catch(err => {  // Si la respuesta de la promesa es un error enviara en la respuesta el request de la promesa (error al subir la imagen)
              console.log('Error al subir imagen');
            });
  }

}
