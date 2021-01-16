
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
      let entry = that._map[propName] = {
        code: typeCode
      };
      if (typeCode === OBJECT) {
        buildChildren(entry);
      }
      if (typeCode === FUNCTION) {
        entry.paramCount = prop.length;
      }
    });
    let keys = Object.keys(this.object);
    for (let i = 0; i < keys.length; i++) {

    }
  }
}

module.exports = TypeMap;
