import { RouterModule, Routes } from "@angular/router";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { LoginGuard } from "../services/guards/login.guard";


const pagesRoutes: Routes = [
    {path: '', component: PagesComponent, canActivate: [LoginGuard], children: [    //Con el loginGuard de canActivate protejo todas las rutas de abajo es un array donde se pueden incluir más guards
        {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},    //data permite dar un título o nombre a las migajas
        {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress Bar'}},
        {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas'}},
        {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
        {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}},
        {path: 'account-settings', component: AccoutSettingsComponent, data: {titulo: 'Ajustes del Tema'}},
        {path: '', pathMatch: 'full', redirectTo: 'dashboard'}
    ]}
];

export const PAGES_ROUTES  = RouterModule.forChild(pagesRoutes);