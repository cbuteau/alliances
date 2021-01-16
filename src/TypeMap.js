
const iter = require('./Iterator');

function TypeMap(object) {
  this.object = object;
  this._map = {}
  this._work();
}

TypeMap.prototype = {
  _work: function() {
    let that = this;
    iter.object(this.object, function(propName, prop, typeCode) {
      that._map[propName] = typeCode;
      
    });
    let keys = Object.keys(this.object);
    for (let i = 0; i < keys.length; i++) {

    }
  }
}
