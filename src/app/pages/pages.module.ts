import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";    // Este módulo es quien permite trabajar con formularios
import {CommonModule} from '@angular/common';    // Este módulo es quien permite usar el *ngIf, *ngFor, pipes, etc

import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { ProgressComponent } from "./progress/progress.component";
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

// Módulos
import { SharedModule } from '../shared/shared.module';    // Se importa el módulo 'SharedModule' para que los componentes que este agrupa puedan ser utilizados por los componentes de este módulo

// Rutas de pages
import { PAGES_ROUTES } from "./pages.routes";    // Se importan estas rutas 'PAGES_ROUTES' para que puedan ser empleads por los componentes de este módulo

// Gráficas
import { ChartsModule } from 'ng2-charts';    // Se importa este módulo para que pueda ser empleado por el componente 'Graficas1Component'

// Pipes
import { PipesModule } from '../pipes/pipes.module';    // Se importa este módulo para que los pipes que este contiene puedan ser empleados por los componentes de este módulo

// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from "../components/grafico-dona/grafico-dona.component";
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccoutSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent,
        BusquedaComponent   
    ],
    exports: [    // Se exportan estos componentes y módulos para que a su vez puedan ser utilizados por otros componentes que forman parte de otros módulos
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        SharedModule
    ],
    imports: [    // Se importan estas rutas y módulos para que puedan ser utilizadas por los componentes de este módulo
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule,
        CommonModule
    ]
})

export class PagesModule { }    // Se exporta este módulo para que pueda ser empleado en otros módulos de la aplicación
