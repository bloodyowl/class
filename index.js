var extend = require("bloody-collections/lib/extend")
var hasMethod = require("./lib/hasMethod")
var create = require("./lib/create")
var K = function(){}

module.exports = {
  extend : function(object){
    var subKlass = create(this)
    extend(subKlass, object)
    return subKlass
  },
  create : function(){
    var instance = create(this)
    instance._accessors = {}
    if(hasMethod(instance, "constructor")) {
      instance.constructor.apply(instance, arguments)
    }
    return instance
  },
  destroy : function(){
    if(hasMethod(this, "destructor")) {
      this.destructor.apply(this, arguments)
    }
    this._accessors = {}
  },
  accessor : function(methodName){
    var thisValue = this
    if(this._accessors.hasOwnProperty(methodName)) {
      return this._accessors[methodName]
    }
    return this._accessors[methodName] = function(){
      return thisValue[methodName].apply(thisValue, arguments)
    }
  },
  constructor : K,
  destructor : K
}
