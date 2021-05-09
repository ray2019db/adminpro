import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;  // Propiedad publica para poder recibir el tipo (usuarios, medicos, hospitales) desde cualquier lugar

  public id: string;  // Propiedad publica para poder recibir el id (usuarios, medicos, hospitales) desde cualquier lugar

  public oculto: string = 'oculto';  // Propiedad para saber si está visible u oculto el modal (por defecto el modal estará oculto)

  public notificacion = new EventEmitter<any>();  //Observable que emitirá información cuando se suba la imagen para suscribirse a él los componentes que usen el modal de subir imagen (permite notificar del modal a las otras pantallas cuando se haya subido la imagen)

  constructor() {}

  ocultarModal(){

    this.oculto = 'oculto';  // Para aplicar la clase oculto y esta oculte el modal
    this.tipo = null;  // Inicializar a null (vacío) el tipo (usuarios, médicos u hospitales) para que esté vacía cuando sea llamado el modal nuevamente
    this.id = null  // Inicializar a null (vacío) el id (de usuarios, médicos u hospitales) para que esté vacío cuando sea llamado el modal nuevamente
  }

  mostrarModal(tipo: string, id: string){

    this.oculto = '';  // Para eliminar la clase oculto y se muetre el modal
    this.tipo = tipo;  // Asignarle el valor del parámetro tipo (usuarios, médicos u hospitales) a la propiedad tipo
    this.id = id;  // Asignarle el valor del parámetro id (de usuarios, médicos u hospitales) a la propiedad id
  }


}
