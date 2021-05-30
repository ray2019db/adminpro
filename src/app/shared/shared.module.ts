import { NgModule } from "@angular/core";
import {CommonModule} from '@angular/common';    // Este módulo es quien permite usar el *ngIf, *ngFor, etc

// Rutas
import { RouterModule } from "@angular/router";    // Este módulo es quien permite usar las rutas de la aplicación

//Componentes
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { ModalUploadComponent } from "../components/modal-upload/modal-upload.component";

// Pipes
import { PipesModule } from '../pipes/pipes.module';    // // Este módulo es quien permite usar los pipes de la aplicación

@NgModule({
    declarations: [
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
        NopagefoundComponent,
        ModalUploadComponent
    ],
    imports:[    // Se importan estos módulos para que puedan ser empleados por los componentes de este módulo
        RouterModule,    // El RouterModule se importa para que las rutas puedan ser utilizadas por los componentes que integran este módulo (por ejemplo el [routerLink])
        PipesModule,    // El PipesModule se importa para que los pipes puedan ser utilizados por los componentes que integran este módulo (por ejemplo el pipe 'imagen')
        CommonModule    // El CommonModule se importa para poder utilizar el *ngIf, *ngFor, etc por los componentes de este módulo
    ],
    exports: [    // Se exportan estos componentes para que puedan ser empleados por los componentes de otros módulos de la aplicación
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
        NopagefoundComponent,
        ModalUploadComponent
    ]
})

export class SharedModule { }    // Se exporta este módulo para que pueda a su vez ser importado por otros módulos de la aplicación que necesiten emplear os componentes de este módulo

