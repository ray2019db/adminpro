import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from "./profile/profile.component";
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from "./medicos/medico.component";
import { BusquedaComponent } from './busqueda/busqueda.component';

// Guards
// import { LoginGuard } from "../services/guards/login.guard";    // Importar el Guard LoginGuard para proteger el acceso a las rutas si el usuario no esta logueado correctamente
import { AdminGuard } from '../services/guards/admin.guard';    // Importar el Guard AdminGuard para proteger el acceso a la ruta de usuarios '/usuarios' si el usuario autenticado no tiene el role de 'ADMIN_ROLE'
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';        // Importar el Guard que verifica si el token no ha expirado aún, si ya expiró protegerá la ruta donde se aplique


const pagesRoutes: Routes = [
        {path: 'dashboard', component: DashboardComponent, canActivate: [VerificaTokenGuard], data: {titulo: 'Dashboard'}},    //'data' permite dar un título o nombre a las migajas 'breadcrumbs', ver componente 'breadcrumbs.Component.ts'. El 'canActivate: [VerificaTokenGuard]' protegerá esta ruta para que el usuario no pueda navegar si el token no es válido o expiró
        {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress Bar'}},
        {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas'}},
        {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
        {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}},
        {path: 'account-settings', component: AccoutSettingsComponent, data: {titulo: 'Ajustes del Tema'}},
        {path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'}},
        {path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'}},
        {path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard], data: {titulo: 'Mantenimiento de Usuarios'}},    // Mantenimiento de los usuarios (Actualización del perfil de los usuarios). El AdminGuard protegerá esta ruta y el usuario logueado no podrá navegar a esta si no posee el role de 'ADMIN_ROLE'
        {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales'}},    // Mantenimiento (Actualización del perfil de cada hospital)
        {path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Médicos'}},    // Mantenimiento (Actualización del perfil de los médico)
        {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Crear o Actualizar un Médico'}},    // Mantenimiento (Actualización del perfil un solo médico)
        {path: '', pathMatch: 'full', redirectTo: 'dashboard'}
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);    // La constante 'PAGES_ROUTES' almacena el arreglo de rutas de la constante 'pagesRoutes' de tipo Routes y se tiene que importar en el módulo 'pages.module.ts'. El forChild es para indicar que son rutas hijas en este caso del componente 'pagesComponent'