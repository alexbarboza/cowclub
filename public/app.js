(function(angular) {
    'use strict';
  angular.module('CowClub', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
            $routeProvider
            .when('/', {
                templateUrl: '/partials/principal.html',
                controller: 'PrincipalController as vm'
            })
            .when('/novo-grupo', {
                templateUrl: '/partials/novo-grupo.html',
                controller: 'NovoGrupoController as vm'
            })
            .when('/meus-grupos', {
                templateUrl: '/partials/meus-grupos.html',
                controller: 'MeusGruposController as vm'
            })
            .otherwise({
                redirectTo: "/"
        });
    
      // configure html5 to get links working on jsfiddle
      // $locationProvider.html5Mode(true);

      // Initialize Firebase
      var config = {
          apiKey: "AIzaSyAwX3AT6ssQzenXbs-dlPkijGgEZJGG0Hw",
          authDomain: "cowclub-39d07.firebaseapp.com",
          databaseURL: "https://cowclub-39d07.firebaseio.com",
          projectId: "cowclub-39d07",
          storageBucket: "cowclub-39d07.appspot.com",
          messagingSenderId: "275804211929"
      };
      firebase.initializeApp(config);
    })
    .controller('PrincipalController', ['$scope', function PrincipalController($scope) {
        var vm = this;

        vm.init = function () {
            
        };

        vm.init();
    }])
    .controller('NovoGrupoController', ['$scope', '$location', function NovoGrupoController($scope, $location) {
        var vm = this;
        vm.dados = null

        vm.init = function () {
            vm.dados = {
                nome: '',
                valor: 0,
                participantes: []
            };
        };

        vm.salvar = function() {
            savarGrupo(vm.dados);
        }

        function savarGrupo(dados) {
            firebase.database().ref('grupos/' + dados.nome).set({
                valor: dados.valor,
                participantes: dados.participantes
            }, function(error) {
                if (error) {
                  console.log(error);
                } else {
                  // Data saved successfully!
                  $location.path('/meus-grupos');
                }
              });
        }
        
        vm.init();
    }])
    .controller('MeusGruposController', ['$scope', '$timeout', function MeusGruposController($scope, $timeout) {
        var vm = this;
        vm.listaGrupos = [];

        vm.init = function () {
            buscaGrupos();
        };

        function buscaGrupos(){
            var gruposRef = firebase.database().ref('grupos');
            gruposRef.on('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    $timeout(function(){
                        vm.listaGrupos.push(
                            {
                                nome: childSnapshot.key,
                                valor: childSnapshot.val().valor,
                                participantes: []
                            }
                        );
                    });
                });
            });
        }

        vm.init();
    }]);
  })(window.angular);
  