import { Component, OnInit } from '@angular/core';

declare function init_plugings();  //Carga el componente correctamente de lo contrario nunca cargaría porque llama la función init_plugings() del archivo "assets/js/custom.js" que es donde se ubican todos los pluggins js de la página


@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['../../../assets/css/pages/error-pages.css']  // Esta es el path del archivo 'error-pages.css' de estilos para que el componente se muestre con todos sus estilos y clases en la vista html incluyendo la imagen del ratón
})
export class NopagefoundComponent implements OnInit {

  anio: number = new Date().getFullYear();  // Propiedad del año para que se muestre el año de forma dinámica en el pie de página de la vista html del componente

  constructor() { }

  ngOnInit(): void {

    init_plugings();  //Llama a la función para que cargue todos los pluggins de js cuando carga el componente para que se muestre correctamente

  }

}
