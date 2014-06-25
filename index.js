var each = require("bloody-collections/lib/each")
var mixinDontEnum = {
  constructor : 1,
  destructor : 1
}
var extend = function(object, source, isMixin){
  each(source, function(item, key){
    if(isMixin && mixinDontEnum[key]) {
      return
    }
    object[key] = item
  })
}
var hasMethod = require("./lib/hasMethod")
var create = require("./lib/create")
var K = function(){}


module.exports = {
  extend : function(object){
    var subKlass = create(this)
    extend(subKlass, object)
    each(
      subKlass.mixins,
      function(mixin){
        extend(this, mixin, true)
      },
      subKlass
    )
    return subKlass
  },
  mixins : [],
  create : function(){
    var instance = create(this)
    var args = arguments
    each(
      this.mixins,
      function(mixin){
        if(hasMethod(mixin, "constructor")) {
          mixin.constructor.apply(this, args)
        }
      },
      this
    )
    instance._accessors = {}
    if(hasMethod(instance, "constructor")) {
      instance.constructor.apply(instance, arguments)
    }
    return instance
  },
  destroy : function(){
    var args = arguments
    if(hasMethod(this, "destructor")) {
      this.destructor.apply(this, arguments)
    }
    each(
      this.mixins,
      function(mixin){
        if(hasMethod(mixin, "destructor")) {
          mixin.destructor.apply(this, args)
        }
      },
      this
    )
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
