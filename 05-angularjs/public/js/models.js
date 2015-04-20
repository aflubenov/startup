var movieModel =function(pId,pTitle, pYear){
	var self=this;
	this.title="";
	this.year="";
	this.director="";
	this.sinopsis="";
	this.photoUrl="";
	this.id=0;

	if(pTitle) this.title=pTitle;
	if(pYear) this.year=pYear;
	if(pId) this.id=pId;


	this.setData=function(pId, pTitle, pYear, pDirector, pSinopsis, pPhotoUrl){
		self.id=pId;
		self.title=pTitle;
		self.year=pYear;
		self.director=pDirector;
		self.sinopsis=pSinopsis;
		self.photoUrl=pPhotoUrl;
	}

}

