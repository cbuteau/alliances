(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

const INTERFACE_OPTIONS = {
  excludePrivates: false
};

function Alliances() {}

Alliances.prototype = {
  interface: function(object, interface, options) {
    let actual = Object.assign(INTERFACE_OPTIONS, options)
    let map = TypeMap(object);
    let int = new TypeMap(interface);
    
  },
  data: function(dataobject, format) {

  }
};

var instance;
if (!instance) {
  instance = new Alliances();
}

module.exports = instance;

},{}],2:[function(require,module,exports){



function InterfaceChecker(object, interface) {
  this.options = {
    object: object,
    interface: interface
  };
  this._work();
}

InterfaceChecker.prototype = {
  _work: function() {

  }
};

Object.defineProperties(InterfaceChecker.prototype, {
  isValid: {
    get: function() {
      return this._isValid;
    }
  }
})

},{}],3:[function(require,module,exports){

function iterateArray(array, callback) {
  let len = array.length;
  for (let i = 0; i < len; i++) {
    let cur = array[i];
    callback(cur, i, array);
  }
}


module.exports = {
  object: function(object, callback) {
    let keys = Object.keys(this.object);
    let that = this;
    iterateArray(keys, function(propName) {
      let prop = that.object[propName];
      let code = getTypeCode(prop);
      callback(propName, prop, code);
    });
  },
  array: function(array, callback) {
    iterateArray(array, callback);
  }
};

},{}],4:[function(require,module,exports){

const TYPECODES = {
  BOOLEAN: 0,
  NUMBER: 1,
  STRING: 2,
  FUNCTION: 3,
  OBJECT: 4,
  UNDEFINED: 5,
  NULL: 6,
  DATE: 7,
  ARRAY: 8,
  UNMAPPED: 9,
  REGEX: 10
}

module.exports = TYPECODES;

},{}],5:[function(require,module,exports){

const iter = require('./Iterator');

let TYPECODES = require('./TypeCodes');

let getTypeCode = require('./getTypeCode');

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
        buildChildren(entry);
        if (typeCode === TYPECODES.OBJECT) {
      }
      if (typeCode === TYPECODES.FUNCTION) {
        entry.paramCount = prop.length;
      }
    });
    let keys = Object.keys(this.object);
    for (let i = 0; i < keys.length; i++) {

    }
  }
}

module.exports = TypeMap;

},{"./Iterator":3,"./TypeCodes":4,"./getTypeCode":6}],6:[function(require,module,exports){

let TYPECODES = require('./TypeCodes');

function getTypeCode(value) {
  var result;
  // Undefined
  if (value === undefined) {
    //result = TYPECODES.UNDEFINED;
    //result.toString = debugStringForTypeCode;
    return TYPECODES.UNDEFINED;
  }
  // Null
  if (value === null) {
    return TYPECODES.NULL;
  }
  // Boolean
  if ((value === true) || (value === false)) {
    return TYPECODES.BOOLEAN;
  }
  // Function
  if (value.apply && value.call && value.bind) {
    return TYPECODES.FUNCTION;
  }
  // Date
  if (value.getDay && value.getYear && value.getMonth && value.getHours && value.getMinutes && value.getSeconds) {
    return TYPECODES.DATE;
  }
  // Number
  if (value.toString && value.valueOf && value.toPrecision) {
    return TYPECODES.NUMBER;
  }
  // string
  if (value.trim && value.indexOf && value.toLowerCase && value.toUpperCase) {
    return TYPECODES.STRING;
  }
  // ARRAY
  if (value.map && value.indexOf && value.push && value.slice) {
    // if (value.copyWithin && value.entries && value.find) {
    //   // typedarray
    //   // we migth have to swicth to instanceof here.
    //   if (value instanceof Array) {
    //     //console.log('Vanilla Array');
    //   } else if (value instanceof TypedArray) {
    //     //console.log('typed array');
    //   }
    // }
    return TYPECODES.ARRAY;
  }

  if (value.test && value.exec) {
    return TYPECODES.REGEX;
  }
  // OBJECT
  if (value.isPrototypeOf && value.hasOwnProperty && value.toString) {
    return TYPECODES.OBJECT;
  }

  /* istanbul ignore next */
  return TYPECODES.UNMAPPED;
}

module.exports = getTypeCode;

},{"./TypeCodes":4}]},{},[6,2,3,4,5,1]);
