var algo = require('./movie');
var jquery = require('jquery');

var alien = new algo.Movie();
var ridleyScot = new algo.Director("Ridley Scot");

ridleyScot.addQuote('Cast is everything.');
ridleyScot.addQuote('Do what ...');

alien.setAttr('nombre','cadena de favores');
alien.setAttr('director', ridleyScot);

alien.getAttr('director').speak();

pelicula = alien;

console.log(jquery('button')[0]);


jquery('button').on('click',function(){
	var oDir = alien.getAttr('director');
	var lQuotas=jquery('.quotes');
	var aQuotas=oDir.speakArray();

	jquery('.speak').html(oDir.getName()+' says:');
	
	lQuotas.html('');
	for(var i=0; i<aQuotas.length; i++){
		lQuotas.append('<li>'+aQuotas[i]+'</li>')
	}
})

/*

peli.agregarPublico('angel');
peli.agregarPublico('mariana');




peli.play();

peli.play();

peli.stop();

*/