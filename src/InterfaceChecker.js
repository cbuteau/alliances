


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
