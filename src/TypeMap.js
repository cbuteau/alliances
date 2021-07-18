
const iter = require('./Iterator');

const TYPECODES = require('./TypeCodes');

let getTypeCode = require('./getTypeCode');

let Iterator = require('./Iterator');

function processProp(map, propName, typeCode, propData) {
  let entry = map[propName] = {
    code: typeCode
  };
  switch (typeCode) {
    case TYPECODES.FUNCTION:
      entry.paramCount = propData.length;
      break;
    case TYPECODES.OBJECT:
      // recurse on chdilren...
      break;
  }
}

function TypeMap(object) {
  this.object = object;
  this._map = {}
  this._work();
}

TypeMap.prototype = {
  _work: function() {
    let that = this;
    Iterator.object(this.object, function(propName, prop, typeCode) {
      processProp(that._map, propName, typeCode, prop);
    });
    Iterator.object(Object.getPrototypeOf(this.object), function(propName, prop, typeCode) {
      processProp(that._map, propName, typeCode, prop);
    })
  }
}

module.exports = TypeMap;
