
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

function SomeObjectWithMore() {
  this.trap = true;
  this.counter = 666;
}

SomeObjectWithMore.prototype = {
  setup: function(options) {

  },
  shutdown: function(force) {

  }
};

function SomeObjectWithArray() {
  this._collection = [1, 2, 3]
}


let InterfaceSetupBasic = {
  setup: function() {},
  shutdown: function() {},
}

let InterfaceSetup = {
  setup: function() {},
  shutdown: function(force) {},
}

let InterfaceWithMore = {
  trap: false,
  counter: 0,
  setup: function(whoknows) {},
  shutdown: function(parameOne) {}
}

let InterfaceWithArray = {
  _collection: []
}

describe('Easy tests...', function() {

  describe('success', function() {
    it ('interface functions', function() {
      let test = new SomeObjectBasic();
      expect(alliances.interface(test, InterfaceSetupBasic)).toBe(true);
    });
  
    it ('interface functions with params', function() {
      let test = new SomeObject();
      expect(alliances.interface(test, InterfaceSetup)).toBe(true);
    });
  
    it ('interface functions and some props', function() {
      let test = new SomeObjectWithMore();
      expect(alliances.interface(test, InterfaceWithMore)).toBe(true);
    });

    it ('interface functions and some props', function() {
      let test = new SomeObjectWithArray();
      expect(alliances.interface(test, InterfaceWithArray)).toBe(true);
    });

    describe('failures', function() {
      it ('woops', function() {
        let test = {};
        expect(alliances.interface(test, InterfaceSetupBasic)).toBe(false);
      });

      it ('woops again', function() {
        let test = {
          setup: function() {},
          shutdown: function() {}
        };
        expect(alliances.interface(test, InterfaceSetupBasic)).toBe(false);
      });
    })

  });



});
