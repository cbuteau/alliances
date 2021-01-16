


function InterfaceChecker(object, interface) {
  this.options = {
    object: object,
    interface: interface
  };
  this._work();
}

InterfaceChecker.prototype {
  _work: function() {

  }
};

Object.defineProperties(InterfaceChecker.prototype, {
  isValid: {
    get: function() {
      retunr this._isValid;
    }
  }
})
