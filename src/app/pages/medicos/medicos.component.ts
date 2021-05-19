import { Component, OnInit } from '@angular/core';

import { Medico } from 'src/app/models/medico.model';  // Importar el modelo de médico
import { MedicoService } from '../../services/medico/medico.service';  // Importar el servicio de médico
import Swal from 'sweetalert2';  // Importar SweetAlert2

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  medicos: Medico[];

  token: string;

  cargando: boolean = false;

  totalMedicos: number;

  desde: number = 0;

  constructor(public medicoService: MedicoService) { }

  ngOnInit(): void {

          this.cargarMedicos(this.desde);
  }

  cargarMedicos(desde: number){

          this.medicoService.cargarMedicos(this.desde)
            .subscribe((resp: any) => {
        
              this.medicos = resp.medicos;
              this.totalMedicos = resp.total;
            })      
    }

  cambiarDesde(valor: number){

          let desde = this.desde + valor;
      
          if(desde >= this.totalMedicos){  // Si es mayor o igual que totalMedicos no tiene sentido por lo tanto retorna sin hacer nada
            return;
          }
      
          if(desde < 0){  // Si es menor que 0 no tiene sentido por lo tanto retorna sin hacer nada
            return;
          }
      
          this.desde += valor;  // Si let desde está entre 0 y el totalMedicos súmale el valor de let desde a la propiedad this.desde
      
          this.cargarMedicos(this.desde);  // Ejecuta la función cargaMedicos con el nuevo valor de la propiedad this.desde
  }

  borrarMedico(medico: Medico){

          Swal.fire({                                                       //========SweetAlert2====================
            title: '¿Desea borrar este Médico?',                          //
            text: 'Está a punto de eliminar el médico: ' + medico.nombre,        // Todo es parte del SweetAlert2
            icon: 'warning',                                                // para que muestre la ventana
            showCancelButton: true,                                         // de confirmación para eliminar
            confirmButtonColor: '#3085d6',                                  // un médico o cancelar el borrado
            cancelButtonColor: '#d33',                                      // del mismo
            confirmButtonText: 'Eliminar'                                   //
          }).then(borrar => {  // Si confirma eliminar el médico
            if (borrar.isConfirmed) {  // Si confirma eliminar el médico entonces ejecuta la función borrarMedico del medicoService
      
              this.medicoService.borrarMedico(medico._id) // ejecuta la función borrarMedico del medicoService
                .subscribe( borrado => {  // Suscríbete al observable para obtener la respuesta devuelta por la función borrarMedico del medicoService
      
                  this.cargarMedicos(this.desde);  // Ejecuta cargarMedicos para refrescar la vista del html y deje de mostrar el médico eliminado
                });
            }
          });
      
  }


  buscarMedico(termino: string){

          if(termino.length <= 0){  // Si el término de búsqueda está vacío entonces llama a a la función cargarMedicos para que muestre todos los médicos paginados y retorna para no continuar
          
            this.cargarMedicos(this.desde);
            return;
          }
      
          this.cargando = true;  // Para que mustre el alert de cargando con el *ngIf del html mientras realiza la búsqueda
      
          this.medicoService.buscarMedicos(termino)  // Llama al método buscarMedicos del medicoService y suscríbete para obtener la respuesta del arreglo de médicos entregado por este
            .subscribe((medicos: Medico[]) => {
      
              this.medicos = medicos;  // Guarda en la propiedad medicos el arreglo de medicos entregado por el medicoService al que nos suscribimos para que lo muestre en la tabla del html
              this.cargando = false;  // Para que mustre la tabla con los médicos encontrados en la búsqueda y no muestre el alert de Cargando del html
            });   
  }

  crearMedico(){


  }



}
