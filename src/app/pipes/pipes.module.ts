import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  // Este módulo es quien permite usar los pipes de la aplicación además del *ngIf, *ngFor, etc

// Pipes
import {ImagenPipe} from './imagen.pipe';  // Importar el pipe imagen



@NgModule({
  declarations: [
    ImagenPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImagenPipe  // Se exporta este pipe para que pueda ser utilizado en los componentes de la aplicación que lo necesiten
  ]
})
export class PipesModule { }  // Se exporta este módulo para que pueda ser importado por otros módulos que sus componentes necesiten de los pipes incluidos aquí
