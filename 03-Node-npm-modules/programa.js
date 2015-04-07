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