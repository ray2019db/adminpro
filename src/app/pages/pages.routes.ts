import { RouterModule, Routes } from "@angular/router";

import { PagesComponent } from "./pages.component";
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
import { LoginGuard } from "../services/guards/login.guard";    // Importar el Guard LoginGuard para proteger el acceso a las rutas si el usuario no esta logueado correctamente
import { AdminGuard } from '../services/guards/admin.guard';    // Importar el Guard AdminGuard para proteger el acceso a la ruta de usuarios '/usuarios' si el usuario autenticado no tiene el role de 'ADMIN_ROLE'


const pagesRoutes: Routes = [
    {path: '', component: PagesComponent, canActivate: [LoginGuard], children: [    //Con el loginGuard de canActivate protejo todas las rutas de abajo es un array donde se pueden incluir más guards
        {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},    //data permite dar un título o nombre a las migajas
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
    ]}
];

export const PAGES_ROUTES  = RouterModule.forChild(pagesRoutes);