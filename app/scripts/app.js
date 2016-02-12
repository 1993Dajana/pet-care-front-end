'use strict';

/**
 * @ngdoc overview
 * @name petCareFrontEndApp
 * @description
 * # petCareFrontEndApp
 *
 * Main module of the application.
 */
var petcareApp = angular.module('petCareFrontEndApp', 
  [ 'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'satellizer'
  ])
  .constant('BASE_URL', 'http://localhost:8000/api/');
  