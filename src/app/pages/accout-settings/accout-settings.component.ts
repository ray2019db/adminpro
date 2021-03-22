// import { DOCUMENT } from '@angular/common';
// Inject
import { Component, OnInit } from '@angular/core'; 

import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: [
  ]
})
export class AccoutSettingsComponent implements OnInit {

  //  @Inject(DOCUMENT) private _document
  constructor(public sS: SettingsService) {}

  ngOnInit(): void {
        this.colocarCheck();
  }

  cambiarColor(tema: string, link: any){

        this.aplicarCheck(link);
        this.sS.aplicarTema(tema);
    
        // let url = `assets/css/colors/${tema}.css`;
        // console.log(tema);
        // this._document.getElementById('tema').setAttribute('href', url);
        // document.getElementById('tema').setAttribute('href', url);
        // this.sS.ajustes.tema = tema;
        // this.sS.ajustes.temaUrl = url;
        // this.sS.guardarAjustes();
  }

  aplicarCheck(link: any){
      
        let selectores: any = document.getElementsByClassName('selector');
        for(let ref of selectores){
          ref.classList.remove('working');
        }
        link.classList.add('working');
  }

  colocarCheck(){
        let selectores: any = document.getElementsByClassName('selector');
        let tema = this.sS.ajustes.tema;
        for(let selector of selectores){
            if(selector.getAttribute('data-theme') === tema){
                selector.classList.add('working');
                break;
            }
        }

  }

}
