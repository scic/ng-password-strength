angular.module('sampleApp', [
    'ngPasswordStrength'
])
.controller('SampleController', function($scope) {
  $scope.user = {};
  $scope.status = {
      passStrength: 0,
      passStrengthCustomSimple: 0,
      passStrengthCustomComplex: 0
  };
  $scope.mode = 'bootstrap';
  
  $scope.measureCustomSimple = function(password) {
    if(!password) {
      return 0;
    }
    return password.length;
  };
  
  $scope.measureCustomComplex = function(password, defaultMeasure) {
    if(!password) {
        return 0;
    }
    
    var config = {
      letters: 'abcdefghijklmnopqrstuvwxyzäöüéàèêâ',
      numbers: '01234567890',
      symbols: ';.:-_'
    };
    
    var hasOneOf = function(chars, password) {
      for (var i = 0; i < chars.length; i++) {
        if(password.indexOf(chars[i]) !== -1) {
          return true;
        }
      }
      return false;
    };
    
    var calculated = defaultMeasure(password, config);
    if(
      password.length >= 8 &&
      hasOneOf(config.symbols, password) &&
      hasOneOf(config.letters, password) &&
      hasOneOf(config.letters.toUpperCase(), password) &&
      hasOneOf(config.numbers, password)
    ) {
      return calculated;
    } else {
      return Math.min(79, calculated);
    }
    
    return password.length;
  };
});