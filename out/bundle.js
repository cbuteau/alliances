/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\r\nconst TypeMap = __webpack_require__(/*! ./src/TypeMap */ \"./src/TypeMap.js\");\r\n\r\n\r\nconst INTERFACE_OPTIONS = {\r\n  excludePrivates: false\r\n};\r\n\r\n\r\nfunction Alliances() {\r\n}\r\n\r\nAlliances.prototype = {\r\n  interface: function(object, interfaceDef, options) {\r\n    let actual = Object.assign(INTERFACE_OPTIONS, options)\r\n    let map = new TypeMap(object);\r\n    let int = new TypeMap(interfaceDef);\r\n    return map.compare(int);\r\n  },\r\n\r\n  data: function(dataobject, format) {\r\n\r\n  }\r\n};\r\n\r\nlet instance;\r\nif (!instance) {\r\n  instance = new Alliances();\r\n}\r\n\r\nif (window) {\r\n  window.alliances = instance;\r\n}\r\n\r\nmodule.exports = instance;\r\n\n\n//# sourceURL=webpack://alliances/./index.js?");

/***/ }),

/***/ "./src/Iterator.js":
/*!*************************!*\
  !*** ./src/Iterator.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\r\nlet getTypeCode = __webpack_require__(/*! ./getTypeCode */ \"./src/getTypeCode.js\");\r\n\r\n\r\nfunction iterateArray(array, callback) {\r\n  let len = array.length;\r\n  for (let i = 0; i < len; i++) {\r\n    let cur = array[i];\r\n    callback(cur, i, array);\r\n  }\r\n}\r\n\r\n\r\nmodule.exports = {\r\n  object: function(object, callback) {\r\n    let keys = Object.keys(object);\r\n    let that = this;\r\n    iterateArray(keys, function(propName) {\r\n      let prop = object[propName];\r\n      let code = getTypeCode(prop);\r\n      callback(propName, prop, code);\r\n    });\r\n  },\r\n  array: function(array, callback) {\r\n    iterateArray(array, callback);\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://alliances/./src/Iterator.js?");

/***/ }),

/***/ "./src/TypeCodes.js":
/*!**************************!*\
  !*** ./src/TypeCodes.js ***!
  \**************************/
/***/ ((module) => {

eval("\r\nconst TYPECODES = {\r\n  BOOLEAN: 0,\r\n  NUMBER: 1,\r\n  STRING: 2,\r\n  FUNCTION: 3,\r\n  OBJECT: 4,\r\n  UNDEFINED: 5,\r\n  NULL: 6,\r\n  DATE: 7,\r\n  ARRAY: 8,\r\n  UNMAPPED: 9,\r\n  REGEX: 10\r\n}\r\n\r\nmodule.exports = TYPECODES;\r\n\n\n//# sourceURL=webpack://alliances/./src/TypeCodes.js?");

/***/ }),

/***/ "./src/TypeMap.js":
/*!************************!*\
  !*** ./src/TypeMap.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\r\nconst iter = __webpack_require__(/*! ./Iterator */ \"./src/Iterator.js\");\r\n\r\nconst TYPECODES = __webpack_require__(/*! ./TypeCodes */ \"./src/TypeCodes.js\");\r\n\r\nlet getTypeCode = __webpack_require__(/*! ./getTypeCode */ \"./src/getTypeCode.js\");\r\n\r\nlet Iterator = __webpack_require__(/*! ./Iterator */ \"./src/Iterator.js\");\r\n\r\nfunction processProp(map, propName, typeCode, propData) {\r\n  let entry = map[propName] = {\r\n    code: typeCode\r\n  };\r\n  switch (typeCode) {\r\n    case TYPECODES.FUNCTION:\r\n      entry.paramCount = propData.length;\r\n      break;\r\n    case TYPECODES.OBJECT:\r\n      // recurse on chdilren...\r\n      break;\r\n  }\r\n}\r\n\r\nfunction TypeMap(object) {\r\n  this.object = object;\r\n  this._map = {}\r\n  this._work();\r\n}\r\n\r\nTypeMap.prototype = {\r\n  _work: function() {\r\n    let that = this;\r\n    Iterator.object(this.object, function(propName, prop, typeCode) {\r\n      processProp(that._map, propName, typeCode, prop);\r\n    });\r\n    Iterator.object(Object.getPrototypeOf(this.object), function(propName, prop, typeCode) {\r\n      processProp(that._map, propName, typeCode, prop);\r\n    })\r\n  },\r\n\r\n  compare: function(otherTypeMap) {\r\n    let ourMap = this._map;\r\n    let otherMap = otherTypeMap._map;\r\n    let mapCount = Object.keys(ourMap).length;\r\n    let result = false;\r\n    let resultArray = [];\r\n    Iterator.object(ourMap, function(propName, propData, tc) {\r\n      let otherPropData = otherMap[propName];\r\n      if (otherPropData) {\r\n        if (otherPropData.code === propData.code) {\r\n           switch (propData.code) {\r\n             case TYPECODES.FUNCTION:\r\n                if (propData.paramCount === otherPropData.paramCount) {\r\n                  resultArray.push(true)\r\n                } else {\r\n                  resultArray.push(false);\r\n                }\r\n                break;\r\n              default:\r\n                resultArray.push(true);\r\n                break;\r\n           } \r\n        } else {\r\n          resultArray.push(false);\r\n        }\r\n      }\r\n    });\r\n    return resultArray.filter(function(result) {\r\n      return result === true;\r\n    }).length === mapCount;\r\n  }\r\n}\r\n\r\nmodule.exports = TypeMap;\r\n\n\n//# sourceURL=webpack://alliances/./src/TypeMap.js?");

/***/ }),

/***/ "./src/getTypeCode.js":
/*!****************************!*\
  !*** ./src/getTypeCode.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\r\nlet TYPECODES = __webpack_require__(/*! ./TypeCodes */ \"./src/TypeCodes.js\");\r\n\r\nfunction getTypeCode(value) {\r\n  var result;\r\n  // Undefined\r\n  if (value === undefined) {\r\n    //result = TYPECODES.UNDEFINED;\r\n    //result.toString = debugStringForTypeCode;\r\n    return TYPECODES.UNDEFINED;\r\n  }\r\n  // Null\r\n  if (value === null) {\r\n    return TYPECODES.NULL;\r\n  }\r\n  // Boolean\r\n  if ((value === true) || (value === false)) {\r\n    return TYPECODES.BOOLEAN;\r\n  }\r\n  // Function\r\n  if (value.apply && value.call && value.bind) {\r\n    return TYPECODES.FUNCTION;\r\n  }\r\n  // Date\r\n  if (value.getDay && value.getYear && value.getMonth && value.getHours && value.getMinutes && value.getSeconds) {\r\n    return TYPECODES.DATE;\r\n  }\r\n  // Number\r\n  if (value.toString && value.valueOf && value.toPrecision) {\r\n    return TYPECODES.NUMBER;\r\n  }\r\n  // string\r\n  if (value.trim && value.indexOf && value.toLowerCase && value.toUpperCase) {\r\n    return TYPECODES.STRING;\r\n  }\r\n  // ARRAY\r\n  if (value.map && value.indexOf && value.push && value.slice) {\r\n    // if (value.copyWithin && value.entries && value.find) {\r\n    //   // typedarray\r\n    //   // we migth have to swicth to instanceof here.\r\n    //   if (value instanceof Array) {\r\n    //     //console.log('Vanilla Array');\r\n    //   } else if (value instanceof TypedArray) {\r\n    //     //console.log('typed array');\r\n    //   }\r\n    // }\r\n    return TYPECODES.ARRAY;\r\n  }\r\n\r\n  if (value.test && value.exec) {\r\n    return TYPECODES.REGEX;\r\n  }\r\n  // OBJECT\r\n  if (value.isPrototypeOf && value.hasOwnProperty && value.toString) {\r\n    return TYPECODES.OBJECT;\r\n  }\r\n\r\n  /* istanbul ignore next */\r\n  return TYPECODES.UNMAPPED;\r\n}\r\n\r\nmodule.exports = getTypeCode;\r\n\n\n//# sourceURL=webpack://alliances/./src/getTypeCode.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;