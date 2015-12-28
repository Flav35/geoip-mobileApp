(function(){

  /**
   * @module MainApp.services
   */
  angular
    .module('MainApp.services')
    .factory('DataParser',DataParser);

  DataParser.$inject = ['Choices'];

  /**
   * Parse data and construct view
   */
  function DataParser(Choices) {
    var services = {
      getLatitude: getLatitude,
      getLongitude: getLongitude,
    };

    return services;


    function getLatitude(choiceName,data) {
      switch (choiceName){
        case Choices.all:
          return parseFloat(data.city.latitude);
        case Choices.city:
          return parseFloat(data.latitude);
        case Choices.location:
          return parseFloat(data.latitude);
        default:
          return parseFloat(0);
      }
    }


    function getLongitude(choiceName,data) {
      switch (choiceName){
        case Choices.all:
          return parseFloat(data.city.longitude);
        case Choices.city:
          return parseFloat(data.longitude);
        case Choices.location:
          return parseFloat(data.longitude);
        default:
          return parseFloat(0);
      }
    }

    function getCityNames(choiceName,data) {
      switch (choiceName){
        case Choices.all:
          return data.city.name1+' '+data.city.name2;
        case Choices.city:
          return data.city.name1+' '+data.city.name2;
        default:
          return '';
      }
    }

    function getCountryName(choiceName,data) {
      switch (choiceName){
        case Choices.all:
          return data.country.name;
        case Choices.country:
          return data.name;
        default:
          return '';
      }
    }

    function getCountryCode(choiceName,data) {
      switch (choiceName){
        case Choices.all:
          return data.country.code;
        case Choices.country:
          return data.code;
        default:
          return '';
      }
    }

    function getPostal(choiceName,data) {
      switch (choiceName){
        case Choices.all:
          return data.city.postal;
        case Choices.city:
          return data.postal;
        default:
          return '';
      }
    }
  }
})();
