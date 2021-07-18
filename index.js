
const TypeMap = require('./src/TypeMap');


const INTERFACE_OPTIONS = {
  excludePrivates: false
};


function Alliances() {
}

Alliances.prototype = {
  interface: function(object, interfaceDef, options) {
    let actual = Object.assign(INTERFACE_OPTIONS, options)
    let map = new TypeMap(object);
    let int = new TypeMap(interfaceDef);
  },

  data: function(dataobject, format) {

  }
};

let instance;
if (!instance) {
  instance = new Alliances();
}

if (window) {
  window.alliances = instance;
}

module.exports = instance;
