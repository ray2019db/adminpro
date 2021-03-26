import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscription: Subscription;

  constructor() {

  this.suscription = this.regresaObservable().subscribe( 
        num => console.log('Suscrito a: ', num),      
        err => console.error('ocurrio un error: ', err),
        () => console.log('Observer terminó')
  );


  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.suscription.unsubscribe()   ;
  }

  regresaObservable(): Observable<any>{
    return new Observable( observer => {
      let contador = 0;
      let intervalo = setInterval( () => {
            contador += 1;
            observer.next(contador);
            // if(contador ===2){
            //     clearInterval(contador);
            //     observer.error('Error Fatal')
            // }
            // if(contador === 3){
            //     clearInterval(contador);
            //     observer.complete();
            }, 500);
    }).pipe(filter((valor: any) => {
          if(valor%2 === 1){
            console.log('Filter: ', valor);
            return true;
          }
          return false;
    }));

  }

}
