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

  function Team(teamName,gameId,teamNum){
     this.name = teamName;
     this.gameId = gameId; // 0 - 1 
     this.teamId = 'Team' + teamNum; //
     this.teamStyle = [];
     this.owner = {};
     this.owner.name = [];
     this.owner.details = {};
   }

   main.teamOne = new Team('not set','0', '1');
   main.teamTwo = new Team('not set','0', '2');
   main.teamThree = new Team('not set','1', '1');
   main.teamFour = new Team('not set','1', '2');


   console.log(main.teamOne);
   
        main.data ={};
        main.data.result = 'none yet';
        main.gameTime =[];
        main.apiError = [];

  // Calls the service and deals with the data 
  data.getData()
    	.then(function(result){
      		main.data = JSON.parse(result) ; 
    		console.log(main.data);

    		//check data to see if it is game day
    		isGameDay(main.data);
    		//check data to see number of games 
    		gameNum(main.data);

    		main.teamOne.getTeamDeets(main.data);
    		main.teamTwo.getTeamDeets(main.data);
    		main.teamThree.getTeamDeets(main.data);
    		main.teamFour.getTeamDeets(main.data);


    });

    console.log(main.data);

	 Team.prototype.getTeamDeets = function(gameData){
      var a = this.gameId;
      var b = this.teamId;
      var game = gameData.Games[a];
      this.name = game[b].TeamFullName;
      this.owner = game[b].Owners;
      this.getOwner();
      this.teamStyle = setTeam(this.name);
      console.log(this.teamStyle);
	};

	 Team.prototype.getOwner = function(){
	      if (this.owner.length === 2){
	      	   this.owner.name = this.owner[0].DisplayName +' & '+ this.owner[1].DisplayName;
	      	   this.owner.intro ='Team owners';
  		} else {
               this.owner.name = this.owner[0].DisplayName;
               this.owner.intro ='Team owner';
	      }
	};


	function gameNum(result){
		if (main.data.Games.length === 1) {
			console.log('only one game today');
		}else if(main.data.Games.length === 2){
			console.log('2 games today');
		}else{
			console.log('probs no game');
		}

	}

    // Checks to see if there is game data for the day & if it is due to API down 
  	function isGameDay(gameData){
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
  	function setTeam(TeamName){
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
  			case "New York Knicks":
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
