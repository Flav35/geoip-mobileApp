(function() {

  /**
   * @module MainApp.controllers
   */
  angular
    .module('MainApp.controllers')
    .controller('SubmitController', SubmitController);

  /**
   * DI
   * @type {Dependencies}
   */
  SubmitController.$inject = ['$http', '$location', 'MapFactory', 'DataParser','Choices'];

  /**
   * Submit Controller, handle IP or Host and does Ajax call
   *
   * @Class SubmitController
   * @param {Object} $http Module for Ajax calls
   * @param {Object} $location Module for window location
   * @param {Object} MapFactory
   * @param {Object} DataParser
   */
  function SubmitController($http, $location, MapFactory, DataParser, Choices) {
    var vm = this;
    vm.IP = '';
    vm.map = {};
    vm.choices = [{
      id: 1,
      name: Choices.all,
      urlPart: '/',
    }, {
      id: 2,
      name: Choices.country,
      urlPart: '/country/',
    }, {
      id: 3,
      name: Choices.city,
      urlPart: '/city/',
    }, {
      id: 4,
      name: Choices.location,
      urlPart: '/location/',
    }];
    vm.choice = vm.choices[3].name; //Default
    vm.showMap = true;
    vm.showInfo = false;
    vm.data = {};

    vm.getChoiceByName = getChoiceByName;
    vm.goTop = goTop;
    vm.submitForm = submitForm;
    vm.resizeMap = resizeMap;
    vm.getLatitude = getLatitude;
    vm.getLongitude = getLongitude;

    /**
     * Get Choice by name
     *
     * @method getChoiceByName
     * @param {String} name Name of the choice
     * @return {Object} the choice
     */
    function getChoiceByName(name) {
      var objReturn;
      angular.forEach(vm.choices, function(obj, key) {
        if (obj.name == name) {
          objReturn = obj;
        }
      });
      return objReturn;
    }

    /**
     * Submit IP and Construct map
     *
     * @method submitForm
     */
    function submitForm() {
      $http.jsonp(
        'http://api.flavien-hardy.me/api/geoip' + vm.getChoiceByName(vm.choice).urlPart + vm.IP + '?callback=JSON_CALLBACK', {
          responseType: 'jsonp'
        }).then(function(response) {
          vm.showInfo = true;
          vm.data = response.data;
          if(vm.choice === Choices.all ||
            vm.choice === Choices.city ||
            vm.choice === Choices.location){
              vm.map = MapFactory.drawMap('map', vm.getLatitude(), vm.getLongitude(), 12);
          }
        },
        function(error) {});
    }


    /**
     * Go to top
     *
     * @method goTop
     */
    function goTop() {
      $location.hash('formPrincipal');
    }


    /**
     * Resize map
     *
     * @method resizeMap
     */
    function resizeMap() {
      if (!angular.equals(vm.map, {}))
        setTimeout(function() {
          var center = vm.map.getCenter();
          google.maps.event.trigger(vm.map, 'resize');
          vm.map.setCenter(center);
        }, 200); // Timeout : let some time to the div to show, then resize

    }

    /**
     * Get latitude
     * @return {float}
     */
    function getLatitude () {
      return DataParser.getLatitude(vm.choice,vm.data);
    }

    /**
     * Get Longitude
     * @return {float}
     */
    function getLongitude () {
      return DataParser.getLongitude(vm.choice,vm.data);
    }

    /**
     * Get City name
     * @return {String}
     */
    function getCityName () {
      return DataParser.getCityName(vm.choice,vm.data);
    }

    /**
     * Get Country name
     * @return {String}
     */
    function getCountryName () {
      return DataParser.getCountryName(vm.choice,vm.data);
    }

    /**
     * Get Country code
     * @return {String}
     */
    function getCountryCode () {
      return DataParser.getCountryCode(vm.choice,vm.data);
    }

    /**
     * Get Postal
     * @return {String}
     */
    function getPostal () {
      return DataParser.getPostal(vm.choice,vm.data);
    }

  }
})();
