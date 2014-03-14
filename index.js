var extend = require("bloody-collections/lib/extend")
  , hasMethod = require("./lib/hasMethod")
  , create = require("./lib/create")
  , K = function(){}

module.exports = {
  extend : function(object){
    var subKlass = create(this)
    extend(subKlass, object)
    if(!hasMethod(subKlass, "constructor")) {
      subKlass.constructor =
        typeof subKlass.constructor == "function" ? subKlass.constructor : K
    }
    return subKlass
  },
  create : function(){
    var instance = create(this)
    if(hasMethod(instance, "constructor")) {
      instance.constructor.apply(instance, arguments)
    }
    return instance
  },
  destroy : function(){
    if(typeof this.destructor == "function") {
      this.destructor.apply(this, arguments)
    }
  }
}
