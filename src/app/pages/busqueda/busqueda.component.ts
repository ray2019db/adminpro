import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // importar el ActivatedRoute para poder utilizar los (params) y poder capturar los parámetros pasados por la url
import { HttpClient } from '@angular/common/http';  // Importar HttpClient para poder hacer peticiones http (o sea emplear los métodos http tales como 'get' 'post' 'put' 'delete', etc)

import { URL_SERVICIOS } from '../../config/config';  // Importar la url base 'http://localhost:3000'
import { Usuario } from '../../models/usuario.model';  // Importar el modelo de usuario
import { Medico } from '../../models/medico.model';  // Importar el modelo de médico
import { Hospital } from 'src/app/models/hospital.model';  // Importar el modelo de hospital

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];  // Propiedad usuarios de tipo Usuario que almacenará en un arreglo los usuarios que coincidan con el término de búsqueda para ser mostrados en la vista html
  medicos: Medico[] = [];  // Propiedad medicos de tipo Medico que almacenará en un arreglo los médicos que coincidan con el término de búsqueda para ser mostrados en la vista html
  hospitales: Hospital[] = [];  // Propiedad hospitales de tipo Hospital que almacenará en un arreglo los hospitales que coincidan con el término de búsqueda para ser mostrados en la vista html

  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) {

          this.activatedRoute.params  // Ejecuto el método 'activatedRoute.params' que es un observable que devuelve un arreglo con todos los parámetros pasados por url
              .subscribe(params => {  // me suscribo al observable que retorna un arreglo con todos los parámetros que hayan sido pasado por la url
                let termino = params['termino'] // Almacena en la variable 'let termino' el contenido del parámetro termino que viene por url. En este caso termino es el único parámetro pasado por url (ver el archivo de rutas 'pages.routes.ts' donde se declara la ruta '/busqueda/:termino') si la ruta en vez de '/busqueda/:termino' fuera '/busqueda/:otrapalabra' entonces a través de la url vendría el parámetro 'otrapalabra'
                console.log(termino);
                this.buscar(termino); // Ejecuta el método buscar y pásale como argumento el término que viene en la url como parámetro que se obtuvo mediante el observable 'ActivatedRote.params'
              })
  }

  ngOnInit(): void {
  }

  buscar(termino: string){

          let url = URL_SERVICIOS + '/busqueda/todo/' + termino //  url = http://localhost:3000/busqueda/todo/termino_busqueda // 

          this.http.get(url)  // Hacer una petición get a la url anterior (el método http es un observable que devolverá arreglos de usuarios, médicos y hospitales que coincidan con el término de búsqueda). Normalmente las llamadas a estas peticiones http se hacen desde un servicio pero en este caso como solo la haremos desde aquí la dejamos en el mismo componente
            .subscribe((resp: any) => {  // Me suscribo al método anterior para obtener la respuesta que serán arreglos de usuarios, médicos y hospitales. La respuesta se pone de tipo any (resp: any) para que no de error
                console.log(resp);
                this.usuarios = resp.usuarios;  // Almacena en la propiedad usuarios el arreglo de usuarios que coincidan con el término de búsqueda devuelto por el observable
                this.medicos = resp.medicos;  // Almacena en la propiedad médicos el arreglo de médicos que coincidan con el término de búsqueda devuelto por el observable
                this.hospitales = resp.hospitales;  // Almacena en la propiedad hospitaless el arreglo de hospitales que coincidan con el término de búsqueda devuelto por el observable
            })
  }

}
