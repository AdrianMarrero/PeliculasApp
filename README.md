# PeliculasApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.6.

# JSON Server

PeliculasAPP/Server/db.json

Run json-server --watch db.json --delay 1000  --port 3000

## Development server

Usa `ng serve -o` para levantar el server de develop. Se abrirá: `http://localhost:4200/`. La app se actualiza automaticamente en cada cambio de ficheros.

Levantar previamente json-server en el puerto 3000

## Estructura General

Se ha usado la siguiente estructura de ficheros:

1. **scss**: Estilos globales. Se usa [SCSS] (https://sass-lang.com/documentation/syntax). También usamos [Bootstrap](https://getbootstrap.com/docs/5.1/getting-started/introduction/) para generar una misma linea grafica. 

2. **environments**: Variables globales que controlan la aplicacion.

3. **assets**: Imagenes y ficheros de traducción. 
    1. **i18n**: Contiene en formato JSON la traduccion de la app. Está en ES.

4. **app**: Contiene la aplicación.
    1. **components**:  Contiene los componentes reutilizables.
        **card-movie**
        **loading**
        **navbar** 
    2. **helpers**: Funciones de apoyo, reutilizables.
        **arr-helper**
        **sleep-helper**
    3. **Interfaces**: Tipado de datos.
        **movie-response**
    4. **Pages**: Páginas de la aplicación
        **movies**
        **add-movie**
        **edit-movie**
        **list** 
    5. **pipes**: Pipes
        **poster.pipe**
        **time-format.pipe**
    6. **services**: Servicios
        **pelicula.service**   

## Librerías externas

1. [PrimeNG] (https://www.primefaces.org/primeng/showcase/#/)
2. [ng-starrating] (https://github.com/riteshgandhi/ng-star-rating#readme)
3. [ngx-translate] (http://www.ngx-translate.com/)

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
