(function(angular) {
  "use strict";
  angular
    .module("CowClub", ["ngRoute", "ng-currency"])
    .run(["$locale", function ($locale) {
        $locale.NUMBER_FORMATS.GROUP_SEP = "";
        $locale.NUMBER_FORMATS.DECIMAL_SEP = ",";
    }])
    .config(function($routeProvider, $locationProvider) {
      $routeProvider
        .when("/principal", {
          templateUrl: "/partials/principal.html",
          controller: "PrincipalController as vm"
        })
        .when("/novo-grupo", {
          templateUrl: "/partials/novo-grupo.html",
          controller: "NovoGrupoController as vm"
        })
        .when("/meus-grupos", {
          templateUrl: "/partials/meus-grupos.html",
          controller: "MeusGruposController as vm"
        })
        .when("/detalhe-grupo/:nomeGrupo", {
          templateUrl: "/partials/detalhe-grupo.html",
          controller: "DetalheGrupoController as vm"
        })
        .when("/tela-login", {
          templateUrl: "/partials/tela-login.html"
        })
        .when("/tela-inicial", {
          templateUrl: "/partials/tela-inicial.html"
        })
        .when("/facebook", {
          templateUrl: "/partials/facebook.html"
        })
        .otherwise({
          redirectTo: "/tela-login"
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
    .controller("PrincipalController", [
      "$scope",
      function PrincipalController($scope) {
        var vm = this;

        vm.init = function() {};

        vm.init();
      }
    ])
    .controller("NovoGrupoController", [
      "$scope",
      "$location",
      "$timeout",
      function NovoGrupoController($scope, $location, $timeout) {
        var vm = this;
        vm.dados = null;
        vm.salvando = false;
        vm.listaParticipantes = [];

        vm.modalParticipante = function() {
          console.log("entrou aqui");
          $("#myModal").on("shown.bs.modal", function() {
            $("#myInput").trigger("focus");
          });
        };

        vm.init = function() {
            vm.salvando = false;
            vm.dados = {
                nome: "",
                valor: 0,
                participantes: []
            };
            buscarListaParticipantes();
        };

        vm.incluirParticipante = function(participante) {
            if (!vm.verificaIncluido(participante)){
                vm.dados.participantes.push(participante);
            }
            $('#exampleModal').modal('toggle');
        };

        vm.verificaIncluido = function(participante) {
            return vm.dados.participantes.some(function(p) { return participante.nome === p.nome });
        };

        vm.salvar = function() {
            if (!vm.dados.nome){
                alert('Informe informe um Nome para o Grupo.');
                return;
            }

            if (!vm.dados.valor){
                alert('Informe informe um Valor.');
                return;
            }

            savarGrupo(vm.dados);
        };

        function savarGrupo(dados) {
            vm.salvando = true;
            firebase
            .database()
            .ref("grupos/" + dados.nome)
            .set(
              {
                valor: dados.valor,
                participantes: dados.participantes
              },
              function(error) {
                if (error) {
                  console.log(error);
                  vm.salvando = false;
                } else {
                  // Data saved successfully!
                  $timeout(function() {
                    $location.path("/meus-grupos");
                  });
                }
              }
            );
        }

        function buscarListaParticipantes() {
            var participantesRef = firebase.database().ref("participantes");
            participantesRef.on("value", function(snapshot) {
                console.log(snapshot.key);
                snapshot.forEach(function(childSnapshot) {
                    $timeout(function() {
                        vm.listaParticipantes.push({
                            nome: childSnapshot.key,
                            agencia: childSnapshot.val().Agencia,
                            conta: childSnapshot.val().Conta
                        });
                    });
                });
            });
        }

        vm.init();
      }
    ])
    .controller("MeusGruposController", [
      "$scope",
      "$timeout",
      function MeusGruposController($scope, $timeout) {
        var vm = this;
        vm.listaGrupos = [];

        vm.init = function() {
          buscaGrupos();
        };

        function buscaGrupos() {
          var gruposRef = firebase.database().ref("grupos");
          gruposRef.on("value", function(snapshot) {
              console.log(snapshot.key);
            snapshot.forEach(function(childSnapshot) {
              $timeout(function() {
                vm.listaGrupos.push({
                  nome: childSnapshot.key,
                  valor: childSnapshot.val().valor,
                  participantes: childSnapshot.val().participantes
                });
              });
            });
          });
        }

        vm.init();
      }
    ])
    
    .controller("DetalheGrupoController", [
        "$scope",
        "$timeout",
        "$routeParams",
        function DetalheGrupoController($scope, $timeout, $routeParams) {
          var vm = this;
          vm.grupo = null;
  
          vm.init = function() {
            var nomeGrupo = $routeParams.nomeGrupo;
            buscaGrupo(nomeGrupo);
          };
  
        function buscaGrupo(nomeGrupo) {
            var grupoRef = firebase.database().ref("grupos/" + nomeGrupo);
            grupoRef.on("value", function(snapshot) {
                $timeout(function(){
                    vm.grupo = {
                        nome: nomeGrupo,
                        valor: snapshot.val().valor,
                        participantes: snapshot.val().participantes
                    };
                });
            });
          }
  
          vm.init();
        }
      ]);
})(window.angular);
