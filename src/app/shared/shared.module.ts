import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

// Rutas
import { RouterModule } from "@angular/router";


@NgModule({
    declarations: [
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
        NopagefoundComponent
    ],
    imports:[
        RouterModule,
        BrowserModule
    ],
    exports: [
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
        NopagefoundComponent
    ]
})

export class SharedModule { }

