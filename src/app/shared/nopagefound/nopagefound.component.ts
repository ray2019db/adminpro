import { Component, OnInit } from '@angular/core';

declare function init_plugings();  //Carga el componente correctamente de lo contrario nunca cargaría porque llama la función init_plugings() del archivo "assets/js/custom.js" que es donde se ubican todos los pluggins js de la página


@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: [
  ]
})
export class NopagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    init_plugings();  //Llama a la función cuando carga el componente para que se muestre correctamente

  }

}
