
function SomeObjectBasic() {}

SomeObjectBasic.prototype = {
  setup: function() {

  },
  shutdown: function() {

  }
};



function SomeObject() {}

SomeObject.prototype = {
  setup: function() {

  },
  shutdown: function(force) {

  }
};


let InterfaceSetupBasic = {
  setup: function() {},
  shutdown: function() {},
}

let InterfaceSetup = {
  setup: function() {},
  shutdown: function(force) {},
}




describe('Easy tests...', function() {

  it ('interface', function() {
    let test = new SomeObjectBasic();
    expect(alliances.interface(test, InterfaceSetupBasic)).toBe(true);
  });

  it ('interface', function() {
    let test = new SomeObject();
    expect(alliances.interface(test, InterfaceSetup)).toBe(true);
  });



});
