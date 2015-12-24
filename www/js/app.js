(function(){

  /**
   * @module MainApp
   */
  angular
    .module('MainApp', ['ionic','MainApp.controllers','MainApp.services'/*,'MainApp.directives'*/])

    /* Codova/ionic stuff... */
    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    });

})();
