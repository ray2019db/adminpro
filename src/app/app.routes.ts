import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from "./pages/pages.component";
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

//Guards
import { LoginGuard } from "./services/guards/login.guard";    // Importar el Guard LoginGuard para proteger el acceso a las rutas si el usuario no esta logueado correctamente

const appRoutes: Routes = [    // La constante 'appRoutes' de tipo Routes almacena un arreglo de objetos con las rutas de la aplicación
    {path: 'login', component: LoginComponent},    // En el 'path' se coloca el nombre de la ruta en este caso sería http://localhost:4200/#/login y en 'component' se coloca el componente que llama esa ruta
    {path: 'register', component: RegisterComponent},
    {path: '', component: PagesComponent, canActivate: [LoginGuard], loadChildren: './pages/pages.module#PagesModule'},    // Con el 'loginGuard' de canActivate protejo todas las rutas hijas del componente 'PagesComponent' especificadas en el archivo 'pagesRoutes.ts', es un array donde se pueden incluir más guards. El 'loadChildren' es para utilizar el (Lazy Load) y el string declarado en su interior './pages/pages.module#PagesModule' se conforma por dos partes, la primera especifica la ruta del módulo que contiene los componentes que se cargarán con el Lazy Load y la segunda contiene el nombre del módulo que contiene los componentes antecedido de un HashTag '#' (o sea para configurar el Lazy Load se declara lo sgte "loadChildren: 'ruta/del/modulo#NombreDelModulo'" ) en este caso se cargara el 'PagesModule' con el Lazy Load. El path vacio ( path: '' ) indica que cuando se llame a la ruta base o sea 'http://localhost:4200/#/' cargará el componente 'PagesComponent' y este a su vez cargará los componentes que están anidados en él    
    {path: '**', component: NopagefoundComponent}    // El path '**' indica que para cualquier ruta que no esté especificada cargará el componente 'NopagefoundComponent'
]

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});    // La constante 'APP_ROUTES' se tiene que importar en el módulo principal de la aplicación 'app.module'. El 'forRoot' indica que la constante 'appRoutes' de tipo Routes contendrá el arreglo de rutas principales de la aplicación. El {useHash: true} se emplea para mejorar la compatibilidad entre los navegadores y para publicar la aplicación en un server no es necesario que esté en la carpeta raiz de este. Cuando se emplea el usehash se muestra un hashtag '#' en la ruta base como este http://localhost:4200/#/dashboard