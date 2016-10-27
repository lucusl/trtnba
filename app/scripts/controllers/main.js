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
    main.data = [];

    main.teamOneStyle;
    main.teamTwoStyle;

    //Team 1
    main.Team1;
    main.team1owner;
	main.team1ownerDetails;
	//Team 2
    main.Team2;
    main.team2owner;
	main.team2ownerDetails;

  main.getData
    data.getData()
    	.then(function(result){
      		main.data = JSON.parse(result) ; 
    		console.log(main.data);
    		gameDay(main.data);
    		console.log(getTeam1())

    		main.team1 = getTeam1();

    		main.teamOneStyle = setTeam(main.team1, 1);
    		console.log(getTeam1())

    		main.team2 = getTeam2();

    		main.teamTwoStyle = setTeam(main.team2, 2);
    		console.log(main.teamTwoStyle)

    		main.team1owner = getOwner1();
    		main.team1ownerDetails = getOwnerDeets(main.team1owner);

    		main.team2owner = getOwner2();
    		main.team2ownerDetails = getOwnerDeets(main.team2owner);

    });

   	function getTeam1() {
  		return main.data.Games[0].Team1.TeamFullName
  	}
	function getTeam2() {
  		return main.data.Games[0].Team2.TeamFullName
  	}

  	function getOwner1() {
  		return main.data.Games[0].Team1.Owners
  	}
  	function getOwner2() {
  		return main.data.Games[0].Team2.Owners
  	}

  	function getOwnerDeets(owner) {

  		if (owner.length === 2) {

             return {names: owner[0].DisplayName +' & '+ owner[1].DisplayName, intro:'Team owners'}

  		} else {
  		    
             return {names: owner[0].DisplayName, intro:'Team owner'}

  		}
  	}

  	function gameDay(gameData){
  		if (gameDay === null){
  			console.log('no games today');
  		} else {
  		console.log('its game day');
  	}
  };

  	function setTeam(TeamName, TeamID){
  		switch(TeamName)
  		{
  			case "Portland Trail Blazers":
  				return {style:"blazers", logo:"images/pl.png"}; 
  			break;
  			case "Los Angeles Clippers":
  				return {style:"clippers", logo:"images/clp.png"}; 
  			break;
  			case "Charlotte Hornets":
  				return {style:"hornets", logo:"images/cha.png"}; 
  			break;
  			case "Milwaukee Bucks":
  				return {style:"bucks", logo:"images/mil.png"}; 

  			break;
  			case "Miami Heat":
  				return {style:"heat", logo:"images/mh.png"}; 

  			break;
  			case "Brooklyn Nets":
  				return {style:"nets", logo:"images/bn.png"}; 
  			break;
  			case "New York Nicks":
  				return {style:"nicks", logo:"images/nyn.png"}; 
  			break;
  			case "Memphis Grizzlies":
  				return {style:"grizzlies", logo:"images/griz.png"}; 
  			break;
  			default: 
  		}

  	}

   

});
