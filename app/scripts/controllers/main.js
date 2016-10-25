'use strict';

/**
 * @ngdoc function
 * @name trtNbaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the trtNbaApp
 */
angular.module('trtNbaApp')
  .controller('MainCtrl', function (data) {
    var main = this;
    main.data;

    data.getData()
    	.then(function(result){
    		//main.data = JSON.stringify(result);//
      		main.data = result;  		
    		main.team1 = main.data[0].NBADate;
    		console.log(main.data);
    });

});
