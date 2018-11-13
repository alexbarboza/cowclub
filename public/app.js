(function(angular) {
    'use strict';
  angular.module('CowClub', ['ngRoute'])
    .controller('CowClubController', ['$scope', function CowClubController($scope) {
        var vm = this;

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
  