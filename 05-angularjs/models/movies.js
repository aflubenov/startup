var mongo =require(__dirname+'/../node_modules/mongodb'); 
var monk = require(__dirname+'/../node_modules/monk'); 
var db = monk('localhost:27017/ejer05');

var movieDto = function(pMongoObj){
	var self=this;

	this.id=0;
	this.title="";
	this.year=0;
	this.director="";
	this.sinopsis="";
	this.photoUrl="";

	this.load=function(pMongoObj){
		
		self.id = pMongoObj._id;
		self.title = pMongoObj.title;
		self.year=pMongoObj.year;
		self.director=pMongoObj.director;
		self.sinopsis=pMongoObj.sinopsis;
		self.photoUrl=pMongoObj.photoUrl;
	}

	if(pMongoObj) this.load(pMongoObj);
}

var moviesDA = function(){

	var _moviesCollection = db.get('movies');

	this.getMovie=function(pId){
		return _moviesCollection.find({_id:pId});
		//return oRet;
	}

	this.getMovieList=function(){
		var aRet=[];
		var oTmp=null;

		return _moviesCollection.find({},{});
	}

	this.insert=function(pData){
		return _moviesCollection.insert(pData);
	}

	this.update=function(pId, pData){
		console.log('holis');
		return _moviesCollection.update(pId, {$set: pData} );
	}
}


exports.movieController=function(pRes){
	var _this=this;
	var _response=pRes;
	var aRet=[];

	this.getMovieList=function(){
		var oTmp = new moviesDA();

		oTmp.getMovieList().success(function(docs){

			for(var i=0; i<docs.length; i++) {
				oTmp = new movieDto(docs[i]);
				
				aRet.push(oTmp);

			}

			_response.json(aRet);
		});
	}

	this.getMovie=function(pId){
		var oTmp=new moviesDA();
		oTmp.getMovie(pId).success(function(docs){
			if(docs.length==0) return null;

			_response.json(new movieDto(docs[0]));
		});
	}

	this.insertMovie=function(pData){
		var oTmp=new moviesDA();
		oTmp.insert(pData).success(function(doc){
			_response.json({response:true});
		});
	}

	this.updateMovie=function(pData){

		var oTmp=new moviesDA();
		oTmp.update(pData.id, pData).success(function (docs){
			_response.json({response:true});	
		});
		
	}

	this.saveMovie=function(pData){
		if(!pData.id){
			_this.insertMovie(pData);
		}else{
			_this.updateMovie(pData);
		}
	}

}
