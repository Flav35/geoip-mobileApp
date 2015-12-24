(function(){

  angular
    .module('MainApp.controllers',['MainApp.services'])
    .controller('SubmitController',['$http','$location','MapFactory',SubmitController]);

  /**
  * Submit Controller, handle IP or Host and does Ajax call
  *
  * @Class SubmitController
  * @param {Object} $http Module for Ajax calls
  * @param {Object} $location Module for window location
  */
  function SubmitController($http,$location,MapFactory){
    var vm = this;
    vm.IP = '';
    vm.map = {};
    vm.choices = [
      {
        name: 'All',
        urlPart: '/',
      },
      {
        name: 'Country',
        urlPart: '/country/',
      },
      {
        name: 'City',
        urlPart: '/city/',
      },
      {
        name: 'Location',
        urlPart: '/location/', 
      }
    ];
    vm.choice = vm.choices[3].name; //Default
    vm.showMap = true;
    vm.data = {};

    vm.getChoiceByName = getChoiceByName;
    vm.goTop = goTop;
    vm.submitForm = submitForm;
    vm.resizeMap = resizeMap;

    /**
    * Get Choice by name
    *
    * @method getChoiceByName
    * @param {String} name Name of the choice
    * @return {Object} the choice
    */
    function getChoiceByName(name){
      var objReturn;
      angular.forEach(vm.choices,function(obj,key){
        if(obj.name == name){
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
    function submitForm(){
      $http.jsonp(
        'http://api.flavien-hardy.me/api/geoip'+vm.getChoiceByName(vm.choice).urlPart+vm.IP+'?callback=JSON_CALLBACK',
        {
          responseType: 'jsonp'
        }).then(function(response){
          vm.data = response.data;
          vm.map = MapFactory.drawMap('map',parseFloat(response.data.latitude),parseFloat(response.data.longitude),12);
        },
        function(error){
        });
    }


    /**
    * Go to top
    *
    * @method goTop 
    */
    function goTop(){
      $location.hash('formPrincipal');
    }


    /**
    * Resize map
    *
    * @method resizeMap 
    */
    function resizeMap(){
      if(!angular.equals(vm.map,{}))
        setTimeout(function(){
          var center = vm.map.getCenter();
          google.maps.event.trigger(vm.map, 'resize');
          vm.map.setCenter(center);
        },200); // Timeout : let some time to the div to show, then resize
      
    }
  }

})();