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


    
  //sets the controller alias 
    var main = this;

  function Team(teamName,gameId,teamNum,ownerName){
     this.name = teamName;
     this.gameId = gameId; // 0 - 1 
     this.teamId = 'Team' + teamNum; //
     this.teamStyle = [];
     this.owner = {};
     this.owner.name = ownerName;
     this.owner.details = {};
   }

   main.teamOne = new Team('not set','0', '1');
   console.log(main.teamOne);
   
        main.data ={};
        main.data.result = 'none yet'
        main.gameTime =[];
        main.apiError = [];
        main.teamOneStyle = [];
        main.teamTwoStyle = [];
        main.apiError = [];

  //Team 1
    main.team1 = {};
    main.team1.name = 'Team 1 not set';
    main.team1.owner = {};
    main.team1.owner.name = 'owner name not set';
	main.team1.owner.details ='owner details not set';
	
  //Team 2
    main.team2 = {};
    main.team2.name = 'Team 2 not set';
    main.team2.owner = {};
    main.team2.owner.name = 'owner name not set';
    main.team2.owner.details = {};
  


  // Calls the service and deals with the data 
  data.getData()
    	.then(function(result){
      		main.data = JSON.parse(result) ; 
    		console.log(main.data);
    		gameDay(main.data);
    		gameNum(main.data);
    		main.teamOne.getTeam(main.data);


    		main.team1.name = getTeam1();
    		main.teamOneStyle = setTeam(main.team1.name, 1);
     		console.log(main.teamOne.getTeam());

        main.team1.owner.name = getOwner1();
        main.team1.owner.details  = getOwnerDeets(main.team1.owner.name);

    		main.team2.name = getTeam2();
    		main.teamTwoStyle = setTeam(main.team2.name, 2);
    		console.log(main.teamTwoStyle)

    		main.team2.owner.name = getOwner2();
    		main.team2.owner.details = getOwnerDeets(main.team2.owner.name);

    });

    console.log(main.data);

	 Team.prototype.getTeam = function(gameData){
      var a = this.gameId;
      var b = this.teamId;
      var game = gameData.Games[a];
      console.log(game);
      this.name = game[b].TeamFullName;
      this.owner = game[b].Owners;
	}

	 Team.prototype.getOwner = function(){
	      if (this.owner.length === 2){
	      	   return {this.owner.name: this.owner[0].DisplayName +' & '+ this.owner[1].DisplayName, this.owner.intro:'Team owners'}
  		} else {
               return {name: owner[0].DisplayName, intro:'Team owner'}
	      }
	}

	function gameNum(result){
		if (main.data.Games.length === 1) {
			console.log('only one game today')
		}else if(main.data.Games.length === 2){
			console.log('2 games today')
		}else{
			console.log('probs no game')
		}

	}

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
         return {name: owner[0].DisplayName +' & '+ owner[1].DisplayName, intro:'Team owners'}
  		} else {
         return {name: owner[0].DisplayName, intro:'Team owner'}
  		}
  	}


    // Checks to see if there is game data for the day & if it is due to API down 
  	function gameDay(gameData){
  		if (gameData === null){
  			console.log('no games today');
        main.gameTime = false;
        main.apiError = false;

  		} else if(gameData === 404){
  		  console.log('API fukt');
        main.gameTime = false;
        main.apiError = true;

  	  } else {
        console.log('game on bitchez');
        main.gameTime = true;
        main.apiError = false;

    }
  }

    // Sets the style and team logo based on team name data  
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
          break;
     	   case "Golden State Warriors":
     	     return {style:"Warriors", logo:"images/gs.png"}; 
     	   break;
  			default: 
  		}

  	}


});
