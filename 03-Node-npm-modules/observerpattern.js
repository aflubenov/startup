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

