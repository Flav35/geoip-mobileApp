(function(){

  angular
    .module('MainApp.directives',[])
    .directive('ipCheck',ipCheck);

  function ipCheck(){
    var directive = {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attr, ctrl) {
        function ipValidator(ngModelValue) {
          if(/([0-9]+\.){3}([0-9]+){1}/.test(ngModelValue)) {
            ctrl.$setValidity('ipValidator', true);
          }else{
            ctrl.$setValidity('ipValidator', false);
          }
          return ngModelValue;
        }
        ctrl.$parsers.push(ipValidator);
      }
    };

    
    return directive;
  }

})();