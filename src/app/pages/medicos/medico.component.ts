import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';  // Importar el NgForm para el empleo de formularios
import { ActivatedRoute, Router } from '@angular/router';  // Importar el Router para usar con el navigate y el ActivatedRoute para poder usar el params y poder obtener los parámetros pasados por la url

import { Medico } from 'src/app/models/medico.model';  //Importar el modelo de médico
import { Hospital } from '../../models/hospital.model';  // Importar el modelo de hospital
import { HospitalService } from '../../services/hospital/hospital.service';  // Importar el servicio de hospital
import { MedicoService } from '../../services/medico/medico.service';  // Importar el servicio de médico
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';  // Importar servicio del modal para subir imágenes

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[];  // Propiedad para almacenar los hospitales y poder mostrarlos en el select de la vista html

  medico: Medico = new Medico('', '', '', '', '');  // Propiedad de tipo Medico (modelo de médico) instanciada (inicializada) con la clase Medico (modelo Medico pero vacío recuerda que Medico( nombre, img, usuario, hospital, _id)) que almacenará el nombre (medico.nombre) y el hospital (medico.hospital) insertado en el formulario de la vista html y enlazado con el código mediante [(ngModel)] con databinding (doble enlace de datos)
  
  hospital: Hospital = new Hospital(''); // Propiedad de tipo Hospital (modelo Hospital) inicializado vacío el primer campo que es obligatorio (nombre: '') el resto son campos opcionales y no hece falta inicializarlos que almacenará los datos del hospital devuelto por el método obtenerHospital(id) del servicio hospital para rellenar los datos del hospital seleccionado asociado al médico en la vista

  constructor(public medicoService: MedicoService, public hospitalService: HospitalService, public router: Router, public activatedRoute: ActivatedRoute, public modalUploadService: ModalUploadService) {

          this.activatedRoute.params  // Esto es un observable de angular
              .subscribe(params => {  // Me suscribo al observable que devolverá todos los parámetros pasados por la url en este caso ( params = {id: "6064bcdb35455c0ac4928684"} ) ya que solo envío un parámetro a través de la url que es el id del médico y está declarado en el archivo de rutas 'pages.routes.ts' en la ruta 'medico/:id'
                  let id = params['id'];  // Almaceno en la variable id el id del médico en cuestión pasado en el url que devuelve este observable dentro de un arreglo con todos los parámetros que vengan en la url

                  if(id !== 'nuevo'){  // Si let id es diferente de nuevo significa que hemos pasado un id como parámetro a través de la url (o sea que hemos hecho click en el botón de actualizar y no en el de crear médico)
                    this.medicoService.cargarMedico(id)  // Ejecuta el método cargarMedico del servicio médico y pasa en el argumento el id que viene en la url y está almacenado en let id
                      .subscribe(medico => {  // Suscríbete a este método que es un observable que devolverá todos los datos del médico cuyo id pasamos por url
                        this.medico = medico;  // Almacena en la propiedad médico el médico entregado por el observable
                        this.medico.hospital = medico.hospital._id;  // Almacena en la propiedad medico.hospital el id del hospital al que está asociado dicho médico
                        this.cambioHospital(this.medico.hospital);  // Ejecuta el método cambioHospital y pasa en el argumento el id del hospital al que está asociado dicho médico para obtener el hospital (todos sus datos) y poder mostrarlos en la vista de actualizar médico
                      })
                  }
              });
  }

  ngOnInit(): void {

          this.hospitalService.cargarHospitales(0)  // Ejecuta este método en cuanto inicie el componente y suscríbete a el
              .subscribe((hospitales: any) => {
                this.hospitales = hospitales;  // Guarda en la propiedad hospitales el arreglo de hospitales devuelto por el método anterior
              });

          this.modalUploadService.notificacion  // Al cargar el componente me suscribo al observable notificación del servicio modalUploadService para que me notifique cuando sea subida una imagen correctamente
              .subscribe(resp => {
                  this.medico.img = resp.medico.img;  // Almacena en la propiedad medico.imagen el nombre de la imagen subida emitida por el observable
              })
              
  }

  guardarMedico(fMedico: NgForm){

          if(fMedico.invalid){  // Si el formulario es inválido retorna y no hagas nada
            return
          }
              // Si el formulario es válido haz lo sgte
          this.medicoService.guardarMedico(this.medico)  // Ejecuta el método guardarMedico del servicio médico, en el argumento del método se pasa la propiedad (this.medico) que almacena (todos los datos del médico) el nombre del médico (medico.nombre) y el hospital (medico.hospital) al que pertenece mediante los [(ngModel)] de los input del html que hace un databinding (doble enlace de datos entre la vista y el código)
            .subscribe((medico: Medico) => {    // suscribete al método anterior para obtener la respuesta entregada por este (recuerda que es un observable) que será un médico (ya sea un nuevo médico creado o uno ya existente actualizado)
              this.medico._id = medico._id  // Almacena en la propiedad medico._id el id del médico guardado
              this.router.navigate(['/medico', medico._id]);  // Navega a la ruta '/medico/:id' donde el id será el del médico creado o actualizado
            })
  }

  cambioHospital(id: string){  // El id lo obtengo pasándolo por parámetro de la vista html id = $event.target.value

          this.hospitalService.obtenerHospital(id)  // Ejecuta el método obtenerHospital del servicio de hospital que es un observable
              .subscribe(hospital => {  // Suscríbete al observable para obtener la respuesta entregada por este (en este caso es un hospital)
                  this.hospital = hospital;  // Almacena en la propiedad hospital los datos del hospital entregados por el observable
              })
  }

  cambiarFoto(){

          this.modalUploadService.mostrarModal('medicos', this.medico._id)  // Ejecuta el método mostrarModal del servicio modalUploadService que mostrará el modal de subir imagen, se pasa como argumento el tipo: 'medicos' y el id del médico que queremos subir su foto

  }

}
