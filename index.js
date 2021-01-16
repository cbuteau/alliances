
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
