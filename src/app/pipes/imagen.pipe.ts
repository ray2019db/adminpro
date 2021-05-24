import { Pipe, PipeTransform } from '@angular/core';

import { URL_SERVICIOS } from '../config/config';  // Importar la url base 'http://localhost:3000'

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario') {  //El valor del pipe será 'img' (el nombre de la imagen) y el argumento será el 'tipo' (usuario, médico o hospital). Si no se especifíca el argumento del pipe (usuario, hospital o medico) por defecto toma el tipo 'usuario'
    
    let url = URL_SERVICIOS + '/img';  //url base 'http://localhost:3000/img' ====> 'http://localhost:3000/img/:tipo/:img'

    if( !img ){
      return url + '/usuarios/abc'  //Si no existe una imagen retorna la ruta de 'no-image.png' del backend
    }

    if( img.indexOf('https') >= 0){
      return img;  //Si la ruta de la img contiene un 'https' entoces es una imagen de google y retorna la img del usuario logueado con google
    }

    switch(tipo){

      case 'usuario':  //Si la imagen existe y es de tipo usuario retorna 'http://localhost:3000/img/usuarios/img'
        url += '/usuarios' + '/' + img;
      break;

      case 'medico':  //Si la imagen existe y es de tipo medico retorna 'http://localhost:3000/img/medicos/img'
        url += '/medicos' + '/' + img;
      break;

      case 'hospital':  //Si la imagen existe y es de tipo hospital retorna 'http://localhost:3000/img/hospitales/img'
        url += '/hospitales' + '/' + img;
      break;

      default:  //Si no es ninguno de los 3 tipos anteriores retorna la ruta de 'no-image.png' del backend
        console.log('Tipo de imagen no existe');
        url += '/usuarios/abc';
    }

    return url;  //Si la imagen existe y es de alguno de los 3 tipos anteriores retorna la ruta almacenada en url

  }

}
