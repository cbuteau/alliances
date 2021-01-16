
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

modeul.exports = getTypeCode;
