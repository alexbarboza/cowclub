(function(angular) {
    'use strict';
  angular.module('CowClub', ['ngRoute'])
    .controller('CowClubController', ['$scope', function CowClubController($scope) {
      var vm = this;

      vm.tela = '';
  
      vm.init = function () {
        vm.tela = 'tela-login';
      };
      
      vm.init();
    }]);
  })(window.angular);
  