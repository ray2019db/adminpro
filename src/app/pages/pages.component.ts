import { Component, OnInit } from '@angular/core';

declare function init_plugings();  //Carga el componente correctamente de lo contrario nunca cargaría porque llama la función 'init_plugings()' del archivo "assets/js/custom.js" que es donde se ubican todos los pluggins js de la página

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    init_plugings();  // Llama a la función 'init_plugings()' cuando carga el componente para que se muestre correctamente
  }

}
