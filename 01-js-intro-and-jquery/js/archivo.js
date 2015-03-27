function extend( extension, obj ){
  for ( var key in extension ){
    obj[key] = extension[key];
  }
}



var augment = function( receivingClass, givingClass ) {
 
    // only provide certain methods
    if ( arguments[2] ) {
        for ( var i = 2, len = arguments.length; i < len; i++ ) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    }
    // provide all methods
    else {
        for ( var methodName in givingClass.prototype ) {
 
            if ( !Object.hasOwnProperty.call(receivingClass.prototype, methodName) ) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }
        }
    }
}


var Social=function(){};

Social.prototype = {
	share : function(friendName){
		console.log('sharing to '+friendName);
	},

	like : function(){
		console.log('liking');
	}
}

var Actor = function(pName, pGender, pAge){
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


}

var Movie = function(){
	var _this = this;
	var playing = false;
	var attributes={};

	extend(new Subject(), _this);

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


augment(Movie,Social);

var MovieModule = (function(){

	var attributes={};
	var playing = false;
	var _this = this;

	extend(new Subject(), _this);

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
		_this.addObserver(new MovieObserver(pNombre));
	}


	return {
		get play(){ return _this.play;},
		get setAttr(){ return _this.setAttr; },
		get getAttr(){ return _this.getAttr},
		get agregarPublico(){ return _this.agregarPublico; }
	}

})();

var DownloadableMovie = function(pNombre){
	this.download=function(){
		console.log("descargando");
	}
}

DownloadableMovie.prototype=new Movie();

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
