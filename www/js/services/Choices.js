/**
 * @module MainApp.services
 */
angular
  .module('MainApp.services')
  .factory('Choices',Choices);

Choices.$inject = [];

function Choices () {
  return {
    all:'All',
    country: 'Country',
    city: 'City',
    location: 'Location',   
  };
}