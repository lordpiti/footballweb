# FootballWeb Reloaded Angular

This is an Angular app used as a sandbox to consume a REST api and test many of the features in the framework.

Architecture is pretty basic and it's all organised in modules representing each of the areas in the app.

## Some of the functionality the app provides include:
* Use of google maps service
* Authentication using Facebook and Google APIs
* Use of interceptors for HTTP requests to access the API and guards to protect routes in the app
* Real-time web functionality via sockets using the signalR npm package provided by Microsoft
* Use of Material UI components
* Display of graphics using components based on Chart.js
* Use of ngrx/store for redux approach in some areas of the app
* Available for android and iOS as PWA
* Basic e2e tests using protractor

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
