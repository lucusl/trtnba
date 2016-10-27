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
  			FETCH: 'http://qa.xchangefusion.com/api/nba/'
  		},
  		theData;

 	function getDay() {
  		var timestmp = 
  		     new Date().setFullYear(new Date().getFullYear(), 0, 1);
  		var yearFirstDay = Math.floor(timestmp / 86400000);
  		var today = Math.ceil((new Date().getTime()) / 86400000);
  		var dayOfYear = today - yearFirstDay;

    console.log(dayOfYear)
  		return dayOfYear;
  	}

  	function extract(result){
  		return result.data;
  	}	

  	function cacheData(result) {
  		theData = extract(result);
  		console.log(result);
  		return theData;
  	}

  	model.getData = function(){
  		return $http.get(URLS.FETCH + getDay()).then(cacheData);
  	};



  });
