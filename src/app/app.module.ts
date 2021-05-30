import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';  // Estos módulos son los que permiten trabajar con los formularios y los formularios reactivos
import {HttpClientModule} from '@angular/common/http';  // Este módulo es quien permite trabajar con las peticiones http

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';

// RUTAS
import { APP_ROUTES } from './app.routes';  // Se importan estas rutas para que puedan ser empleadas por los componentes de este módulo

// Módulos
import { PagesModule } from './pages/pages.module';  // Este módulo ya no es necesario importarlo ya que será cargado por el Lazy Load de las rutas 'APP_ROUTES' cuando se necesite y de esta manera se hace más eficiente la aplicación
import { SharedModule } from './shared/shared.module';  // Se importa este módulo para que sus componentes puedan ser utilizados por los componentes de este módulo

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [  // Se importan estas rutas y módulos para que puedan ser empleados por los componentes de este módulo
    BrowserModule,
    APP_ROUTES,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }  // Se exporta este módulo (módulo principal) para que pueda ser utilizado por la aplicación
