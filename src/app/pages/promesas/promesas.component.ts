import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() {     

      this.contarHastaTres().then(        
        (mensaje) => {
              console.log('Terminó Correctamente', mensaje);
        })
        .catch(
          (err) => {
              console.error('Error en la promesa', err);
        });

  }

  ngOnInit(): void {
  }

  contarHastaTres(){
        return new Promise<any>( (resolve, reject) => {
          let contador = 0;
          let intervalo = setInterval( () => {
              contador += 1;
              console.log(contador);
              if( contador === 3){
                  resolve('OKKK');
                  clearInterval(intervalo);
              }
          }, 1000);
      });
    
  }

}
