
const INTERFACE_OPTIONS = {
  excludePrivates: false
};

var instance = null;

function Alliances() {
  if (!instance) {
    instance = new Alliances();
  }
  return instance;
}

Alliances.prototype = {
  interface: function(object, interface, options) {
    let actual = Object.assign(INTERFACE_OPTIONS, options)
    let map = TypeMap(object);
    let int = new TypeMap(interface);

  },
  data: function(dataobject, format) {

  }
};


module.exports = {
  interface: function(object, interface, options) {
    let actual = Object.assign(INTERFACE_OPTIONS, options)
    let map = TypeMap(object);
    let int = new TypeMap(interface);

  },
  data: function(dataobject, format) {

  }
};
