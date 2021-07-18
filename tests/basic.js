;
//let alliances = require('./');


function SomeObject() {}

SomeObject.prototype = {
  setup: function() {

  },
  shutdown: function(force) {

  }
};


let InterfaceSetup = {
  setup: function() {},
  shutdown: function(force) {},
}

describe('Easy tests...', function() {

  it ('interface', function() {
    let test = new SomeObject();
    expect(alliances.interface(test, InterfaceSetup)).toBe(true);
  });

});
