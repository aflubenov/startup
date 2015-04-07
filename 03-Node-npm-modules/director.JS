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