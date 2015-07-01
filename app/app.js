(function() {
    var app = angular.module('store', ['ngRoute', 'ui.bootstrap']);
    app.controller('ProductsController', function($http, $routeParams, $scope) {
        var store = this;
        store.products = [];
        $http.get('products.json').success(function(data) {
            store.products = data;
        });
        store.gender = $routeParams.gender;
    });
    app.controller('ProductsSearchController', function($http, $routeParams, $scope) {
        var store = this;
        store.products = [];
        $http.get('products.json').success(function(data) {
            store.products = data;
        });
        $scope.searchfilter = '';
        $scope.activesearch = true;
    });
    app.controller('LoginController', ['$scope', '$http',  function($scope, $http) {
        $scope.submit = function() {
            $scope.answer = [];
            $http.get('answer.json').success(function(data) {
                $scope.answer = data;
            });
        };
    }]);
    app.directive('owlCarousel', function() {
       return {
           restrict: 'E',
           transclude: false,
           link: function (scope) {
               scope.initCarousel = function(element) {
                   var defaultOptions = {
                       margin: 20,
                       dots: false,
                       responsive : {
                           0 : {
                               items: 1
                           },
                           480 : {
                               items: 2
                           },
                           768 : {
                               items: 3
                           },
                           992 : {
                               items: 4
                           }
                       }
                   };
                   jQuery(element).owlCarousel(defaultOptions);
                   jQuery(".owl_next").click(function(){
                       jQuery(element).trigger('next.owl.carousel');
                   });
                   jQuery(".owl_prev").click(function(){
                       jQuery(element).trigger('prev.owl.carousel');
                   });
               };
           }
       };
    });
    app.directive('owlCarouselItem', [function() {
        return {
            restrict: 'A',
            transclude: false,
            link: function(scope, element) {
                if(scope.$last) {
                    scope.initCarousel(element.parent());
                }
            }
        };
    }]);
    app.directive('storeHeader', function() {
       return {
           restrict: 'E',
           templateUrl: 'templates/header.html'
       };
    });
    app.directive('storeFooter', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/footer.html'
        };
    });
    app.directive('imageCarousel', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/image-carousel.html'
        };
    });
    app.directive('productCarousel', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/product-carousel.html',
        };
    });
    app.directive('storeWidgets', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/widgets.html',
        };
    });
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/home.html'
            }).
            when('/sale', {
                templateUrl: 'views/catalog.html',
                controller: 'ProductsController',
                controllerAs: 'items'
            }).
            when('/sale/search', {
                templateUrl: 'views/catalog.html',
                controller: 'ProductsSearchController',
                controllerAs: 'items'
            }).
            when('/sale/:gender', {
                templateUrl: 'views/catalog.html',
                controller: 'ProductsController',
                controllerAs: 'items'
            }).
            when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            }).
            when('/contacts', {
                templateUrl: 'views/contacts.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
})();