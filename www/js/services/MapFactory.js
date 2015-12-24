(function(){

  angular
  	.module('MainApp.services',[])
  	.factory('MapFactory',MapFactory);

  function MapFactory(){

    var service = {
      drawMap     : drawMap, 
    };

    return service;
    /**
    * Draw google map
    *
    * @method drawMap
    * @param {String} divId <div>'s id where map is drawn
    * @param {Float} latitude Latitude
    * @param {Float} longitude Longitude
    * @param {Integer} zoom Zoom
    * @return {Object} map
    */
    function drawMap(divId,latitude,longitude,zoom){
      var map = new google.maps.Map(document.getElementById(divId), {
        center: {lat: latitude, lng: longitude},
        zoom: zoom
      });
      var marker = new google.maps.Marker({
        position: {lat: latitude, lng: longitude},
        map: map,
        title: 'Approximative location'
      });
      return map;
    }

  }
})();