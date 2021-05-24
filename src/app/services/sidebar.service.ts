import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  // menu: any[] = [  // Propiedad menu compuesta por un arreglo de objetos con diferentes menú y submenú que conforman el menú del sidebar
  //       {
  //         titulo: 'Principal',
  //         icono: 'mdi mdi-gauge',
  //         submenu:[
  //                 {titulo: 'Dashboard', url: '/dashboard'},
  //                 {titulo: 'ProgressBar', url: '/progress'},
  //                 {titulo: 'Gráficas', url: '/graficas1'},
  //                 {titulo: 'Promesas', url: '/promesas'},
  //                 {titulo: 'RxJs', url: '/rxjs'}
  //         ]
  //       },
  //       {
  //         titulo: 'Mantenimiento',
  //         icono: 'mdi mdi-folder-lock-open',
  //         submenu:[
  //                 {titulo: 'Usuarios', url: '/usuarios'},
  //                 {titulo: 'Hospitales', url: '/hospitales'},
  //                 {titulo: 'Médicos', url: '/medicos'}
  //         ]
  //       }
  // ];

  constructor() {}

}
