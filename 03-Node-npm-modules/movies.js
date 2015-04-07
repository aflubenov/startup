(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.director=function(pName){
	var name="";
	var quotes=[];

	this.setName=function(pName){
		name=pName;
	};

	this.addQuote=function(pQuote){
		quotes.push(pQuote);
	}

	this.speak=function(){
		console.log(name +" says: ");
		for(var i=0; i<quotes.length; i++){
			console.log(quotes[i]);
		}
	}

	if(pName){
		name=pName;
	}

}
},{}],2:[function(require,module,exports){
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


},{"./director":1,"./observerpattern":3}],3:[function(require,module,exports){
exports.ObserverList = function (){
  this.observerList = [];
}
 
exports.ObserverList.prototype.add = function( obj ){
  return this.observerList.push( obj );
};
 
exports.ObserverList.prototype.count = function(){
  return this.observerList.length;
};
 
exports.ObserverList.prototype.get = function( index ){
  if( index > -1 && index < this.observerList.length ){
    return this.observerList[ index ];
  }
};
 
exports.ObserverList.prototype.indexOf = function( obj, startIndex ){
  var i = startIndex;
 
  while( i < this.observerList.length ){
    if( this.observerList[i] === obj ){
      return i;
    }
    i++;
  }
 
  return -1;
};
 
exports.ObserverList.prototype.removeAt = function( index ){
  this.observerList.splice( index, 1 );
};


exports.Subject=function(pObserverList){
  this.observers = pObserverList; // new exports.ObserverList();
}
 
exports.Subject.prototype.addObserver = function( observer ){
  this.observers.add( observer );
};
 
exports.Subject.prototype.removeObserver = function( observer ){
  this.observers.removeAt( this.observers.indexOf( observer, 0 ) );
};
 
exports.Subject.prototype.notify = function( context ){
  var observerCount = this.observers.count();
  for(var i=0; i < observerCount; i++){
    this.observers.get(i).update( context );
  }
};


},{}],4:[function(require,module,exports){
var algo = require('./movie');

var alien = new algo.Movie();
var ridleyScot = new algo.Director("Ridley Scot");

ridleyScot.addQuote('Cast is everything.');
ridleyScot.addQuote('Do what ...');

alien.setAttr('nombre','cadena de favores');
alien.setAttr('director', ridleyScot);

alien.getAttr('director').speak();


/*

peli.agregarPublico('angel');
peli.agregarPublico('mariana');




peli.play();

peli.play();

peli.stop();

*/
},{"./movie":2}]},{},[4]);
