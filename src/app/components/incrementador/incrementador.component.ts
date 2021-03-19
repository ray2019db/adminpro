import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @Input() progreso: number = 50;

  @Input('nombre') leyenda: string = 'Leyenda'

  @Output() cambiaValor: EventEmitter<number> = new EventEmitter();

  @ViewChild('input') input: ElementRef;

  constructor() {}

  ngOnInit(): void {
  }

  cambiarValor(valor: number){

      if(this.progreso <= 0 && valor < 0){
          this.progreso = 0;
          return;
      }
      if(this.progreso >= 100 && valor > 0){
          this.progreso = 100
          return;
      }
      this.progreso += valor;
      this.cambiaValor.emit(this.progreso);
      this.input.nativeElement.focus();  
  }

  cambioDeValor(nuevoValor: number){
    
        if(nuevoValor <=0){
            this.progreso = 0;
        }else if(nuevoValor >=100){
            this.progreso = 100;
        }else{
            this.progreso = nuevoValor;
        }

        this.input.nativeElement.value = this.progreso;

        this.cambiaValor.emit(this.progreso);
  }

}
