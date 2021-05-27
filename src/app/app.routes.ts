import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

const appRoutes: Routes = [    // La constante 'appRoutes' de tipo Routes almacena un arreglo de objetos con las rutas de la aplicación
    {path: 'login', component: LoginComponent},    // En el 'path' se coloca el nombre de la ruta en este caso sería http://localhost:4200/#/login y en 'component' se coloca el componente que llama esa ruta
    {path: 'register', component: RegisterComponent},    
    {path: '**', component: NopagefoundComponent}    // El path '**' indica que para cualquier ruta que no esté especificada cargará el componente 'NopagefoundComponent'
]

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});    // La constante 'APP_ROUTES' se tiene que importar en el módulo principal de la aplicación 'app.module'. El 'forRoot' indica que la constante 'appRoutes' de tipo Routes contendrá el arreglo de rutas principales de la aplicación. El {useHash: true} se emplea para mejorar la compatibilidad entre los navegadores y para publicar la aplicación en un server no es necesario que esté en la carpeta raiz de este. Cuando se emplea el usehash se muestra un hashtag '#' en la ruta base como este http://localhost:4200/#/dashboard