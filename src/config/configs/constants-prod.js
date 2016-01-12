(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.config')
    
    // App version
    .constant('VERSION', '0.0.1')
    
    // The configured Firebase
    .constant('FIREBASE', 'https://birdyard.firebaseio.com/');
  
})(angular);