(function(angular) {
    'use strict';
  angular.module('CowClub', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
            $routeProvider
            .when('/', {
                templateUrl: 'principal.html',
                controller: 'PrincipalController as vm'
            })
            .when('/novo-grupo', {
                templateUrl: 'novo-grupo.html',
                controller: 'NovoGrupoController as vm'
            })
            .otherwise({
                redirectTo: "/"
        });
    
      // configure html5 to get links working on jsfiddle
      // $locationProvider.html5Mode(true);

      // Initialize Firebase
      // var config = {
      //     apiKey: "AIzaSyAwX3AT6ssQzenXbs-dlPkijGgEZJGG0Hw",
      //     authDomain: "cowclub-39d07.firebaseapp.com",
      //     databaseURL: "https://cowclub-39d07.firebaseio.com",
      //     projectId: "cowclub-39d07",
      //     storageBucket: "cowclub-39d07.appspot.com",
      //     messagingSenderId: "275804211929"
      // };
      // firebase.initializeApp(config);
    })
    .controller('PrincipalController', ['$scope', function PrincipalController($scope) {
        var vm = this;

        vm.init = function () {
            
        };

        vm.init();
    }])
    .controller('NovoGrupoController', ['$scope', function NovoGrupoController($scope) {
        var vm = this;

        vm.init = function () {
            
        };

        function savarUsuario(nome, agencia, conta) {
            firebase.database().ref('users/' + nome).set({
              username: nome,
              agencia: agencia,
              conta : conta
            });
        }
        
        vm.init();
    }]);
  })(window.angular);
  