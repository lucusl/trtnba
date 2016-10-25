'use strict';

/**
 * @ngdoc service
 * @name trtNbaApp.data
 * @description
 * # data
 * Service in the trtNbaApp.
 */
angular.module('trtNbaApp')
  .service('data', function ($http) {
  	var model = this,
  		URLS = {
  			FETCH: 'http://192.168.111.98/trt/api/nba/301'
  		},
  		theData;

  	function extract(result){
  		return result.data;
  	}	

  	function cacheData(result) {
  		theData = extract(result);
  		console.log(result)
  		return theData;
  	}

  	model.getData = function(){
  		return $http.get(URLS.FETCH, config).then(cacheData);
  	};


  });
