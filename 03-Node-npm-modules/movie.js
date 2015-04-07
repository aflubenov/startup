var observer = require('./observerpattern');
var director = require('./director')


exports.Social=function(){};
exports.Director=director.director;

exports.Social.prototype = {
	share : function(friendName){
		console.log('sharing to '+friendName);
	},

	like : function(){
		console.log('liking');
	}
};

exports.Actor = function(pName, pGender, pAge){
	var Name="";
	var Gender="";
	var Age=0;

	this.getName=function(){
		return Name;
	}

	this.getGender=function(){
		return Gender;
	}

	this.getAge=function(){
		return Age;
	}

	Name = pName;
	Gender=pGender;
	Age=pAge;


};


function extend( extension, obj ){
  for ( var key in extension ){
    obj[key] = extension[key];
  }
}

var MovieObserver = function(pNombre){

	var _nombre=pNombre;

	this.update = function(pObj){
		var sNombre = pObj.getAttr('nombre');

		if(!sNombre) sNombre="la película";

		if(pObj.playing){			
			if(pObj.alreadyPlaying) {
				console.log(_nombre+" sigue viendo "+sNombre);
			}else{
				console.log(_nombre+" comenzó a ver "+sNombre);
			}
		}else{
			console.log(_nombre+" dejó de ver "+sNombre);
		}
	}
}




exports.Movie = function(){
	var _this = this;
	var playing = false;
	var attributes={};



	extend(new observer.Subject(new observer.ObserverList()), _this);

	this.play = function(){
		var alreadyPlaying=playing;
		
		playing=true;

	 	_this.notify({playing:true, alreadyPlaying:alreadyPlaying, getAttr: _this.getAttr });
	};

	this.stop = function(){ 
		playing=false;
		_this.notify({playing:playing, alreadyPlaying:false, getAttr: _this.getAttr }); 
	}

	this.setAttr=function(pAttr,pVal){
		attributes[pAttr]=pVal;
	}

	this.getAttr=function(pAttr){
		return attributes[pAttr];
	}

	this.agregarPublico=function(pNombre){
		this.addObserver(new MovieObserver(pNombre));
	}

	this.addActor=function(pActor){
		if(!attributes["actores"]){
			attributes["actores"]=[];
		}

		attributes["actores"].push(pActor);
	}
}

