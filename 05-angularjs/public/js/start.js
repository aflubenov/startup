var ejer05APP = angular.module('ejer05', [
  'ngRoute',
  'ejer05Controllers'
]);


ejer05APP.config(['$routeProvider',
  function($routeProvider, $routeParams) {
    $routeProvider.
      when('/index', {
        templateUrl: 'index.html',
        controller: 'indexCtrl'
      }).
      when('/movieDetail/:movieId', {
        templateUrl: 'detail.html',
        controller: 'detailCtrl'
      }).
      when('/movieEdit/:movieId', {
        templateUrl: 'form.html',
        controller: 'detailCtrl'
      }).
      when('/movieEdit/', {
        templateUrl: 'form.html',
        controller: 'detailCtrl'
      }).
      otherwise({
        redirectTo: '/index'
      });
  }]);


var oControllers = angular.module('ejer05Controllers', []);


oControllers.controller('indexCtrl', ['$scope', '$http',
  function($scope, $http) {

  	$scope.movies=[];

  	$scope.getMovies=function(){

  		$http.get('http://localhost:3000/getMovies/')
  		.success(function(pData){
  			var oTmpMoview=null;
  			$scope.movies=[];
  			
  			for(var i=0; i<pData.length;i++){
  				$scope.movies.push(new movieModel(pData[i].id, pData[i].title,pData[i].year));
  			}
  		});
  	};

  	$scope.getMovies();

  }]);

oControllers.controller('detailCtrl',['$scope','$http','$routeParams', '$location',
	function($scope, $http, $routeParams, $location){

		$scope.movie = new movieModel();

		var  getMovieDetail = function(){
			if(!($routeParams.movieId)) return;

			$http.get('http://localhost:3000/geTMovie/'+$routeParams.movieId)
			.success(function(pData){
				$scope.movie.setData(pData.id,
					pData.title,
					pData.year,
					pData.director,
					pData.sinopsis,
					pData.photoUrl);
			});
		}


		$scope.save=function(){
			$http({
				method:'POST',
				url: 'http://localhost:3000/saveMovie/',
				data: {movie: $scope.movie }
			}).
			success(function(pData){
				if(pData.response) $location.path('index');
			})
		}

		$scope.cancelEditing=function(){
			$location.path('index');
		}

		getMovieDetail();

	}]);


