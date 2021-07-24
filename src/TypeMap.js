
const iter = require('./Iterator');

const TYPECODES = require('./TypeCodes');

let getTypeCode = require('./getTypeCode');

let Iterator = require('./Iterator');

function Recorder() {
  this._list = [];
}

Recorder.prototype = {
  nope: function() {
    this._list.push(false);
  },

  yep: function() {
    this._list.push(true);
  },

  getYepCount: function() {
    return this._list.filter(function(result) {
      return result === true;
    }).length;
  }
}

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
      entry.internalTypeMap = new TypeMap(propData);
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
  },

  compare: function(otherTypeMap) {
    let ourMap = this._map;
    let otherMap = otherTypeMap._map;
    let mapCount = Object.keys(ourMap).length;
    let result = false;
    let resultArray = [];
    let record = new Recorder();
    Iterator.object(ourMap, function(propName, propData, tc) {
      let otherPropData = otherMap[propName];
      if (otherPropData) {
        if (otherPropData.code === propData.code) {
           switch (propData.code) {
             case TYPECODES.FUNCTION:
                if (propData.paramCount === otherPropData.paramCount) {
                  record.yep();
                } else {
                  record.nope();
                }
                break;
              case TYPECODES.OBJECT:
                if (propData.internalTypeMap.compare(otherPropData.internalTypeMap)) {
                  record.yep();
                } else {
                  record.nope();
                }
                break;
              default:
                record.yep();
                break;
           } 
        } else {
          record.nope();
        }
      } else {
        record.nope();
      }
    });
    return record.getYepCount() === mapCount;
  }
}

module.exports = TypeMap;
