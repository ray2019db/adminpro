import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: string){

            return new Promise( (resolve, reject) => {  // Declaración de una promesa
        
              let formData = new FormData();  //Es lo que tengo que enviar en la petición por AJAX es el Payload que quiero subir
              let xhr = new XMLHttpRequest();// Inicializar la petición AJAX
              
              formData.append('imagen', archivo, archivo.name);// Configuración del formData 'imagen' es el nombre que se pone al key de postman para enviar el archivo por el req.body.imagen (es el cuerpo de la petición), archivo es el archivo completo a subir (viene como argumento de la función) y archivo.name es el nombre del archivo
              
              xhr.onreadystatechange = function() {// Configurar la petición AJAX para ser notificado con cualquier cambio de estado dentro de la función
              
                  if( xhr.readyState === 4){  // Cuando xhr.readyState es igual a 4 me indica que el proceso de subida del archivo a terminado
                      
                    if(xhr.status === 200){  // Si xhr.status es 200 indica que el archivo se ha subido correctamente envía el resolve
                      console.log('Imagen Subida correctamente');
                      resolve( JSON.parse(xhr.response));  //La respuesta se pasa por el JSON.parse para que se envíe en forma de objeto y no como texto plano
                    } else {  // Si el xhr.status no es 200 envía el reject de la promesa con el mensaje y el error
                      console.log('Fallo en la subida del archivo');
                      reject(xhr.response);
                    }
                  }
              };
        
              let url = `${URL_SERVICIOS}/upload/${tipo}/${id}`;  // url donde voy a hacer la petición
        
              xhr.open('PUT', url, true);  // Empleamos el método PUT como en la petición con Postman, la url a donde haremos la petición y el true para indicar que es una petición asíncrona
        
              xhr.send(formData);  // Envío del archivo con el método y url anterior
            });        
  }

}
