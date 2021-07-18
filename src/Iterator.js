
let getTypeCode = require('./getTypeCode');


function iterateArray(array, callback) {
  let len = array.length;
  for (let i = 0; i < len; i++) {
    let cur = array[i];
    callback(cur, i, array);
  }
}


module.exports = {
  object: function(object, callback) {
    let keys = Object.keys(object);
    let that = this;
    iterateArray(keys, function(propName) {
      let prop = object[propName];
      let code = getTypeCode(prop);
      callback(propName, prop, code);
    });
  },
  array: function(array, callback) {
    iterateArray(array, callback);
  }
};
