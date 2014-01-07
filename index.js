;(function(root, name, output){
  if(typeof define == "function" && define.amd) return define([], output)
  if(typeof module == "object" && module.exports) module.exports = output()
  else root[name] = output()
})(this, "klass", function(){
  
  var classExports = {}
    , _hasOwnProperty = {}.hasOwnProperty
    , enumBugProperties = [
          "constructor"
        , "hasOwnProperty"
        , "isPrototypeOf"
        , "propertyIsEnumerable",
        , "toLocaleString"
        , "toString"
        , "valueOf"
      ]
    , hasEnumBug = !Object.prototype.propertyIsEnumerable.call({constructor:1}, "constructor")
    , each = function(object, fn, thisValue){
        var key, index, length, enumKey
        if(!object) return
        for(key in object) {
          if(_hasOwnProperty.call(object, key)) {
            fn.call(thisValue, object[key], key, object)
          }
        }
        if(hasEnumBug) {
          index = -1
          length = enumBugProperties.length
          while(++index < length) {
            key = enumBugProperties[index]
            if(_hasOwnProperty.call(object, key)) {
              fn.call(thisValue, object[key], key, object)
            }
          }
        }
      }
    , objectCreate = Object.create || function(object){
        function F(){}
        F.prototype = object
        return new F()
      }
    , klassId = -1
    , intancesIds = {}
    , klassesMap = {}
    
  classExports.create = function(){
    var self = this
      , instance = objectCreate(self)
      , instanceId
    if(_hasOwnProperty.call(self, "constructor") &&
        typeof instance.constructor == "function") {
  
      instance.constructor.apply(instance, arguments)
    }
    instanceId = ++intancesIds[self._klass]
    instance._id = instanceId
    return instance
  }
  
  classExports.destroy = function(){
    var instance = this
      , parent = klassesMap[instance._klass]
    if(_hasOwnProperty.call(instance, "_klass")) {
      return
    }
    if(_hasOwnProperty.call(parent || {}, "destructor") &&
        typeof instance.destructor == "function") {
      instance.destructor.apply(instance, arguments)
    }
  }
  
  classExports.extend = function(object){
    var klass = objectCreate(this)
    each(object, extendCallback, klass)
    klass._klass = ++klassId
    intancesIds[klassId] = -1
    klassesMap[klassId] = klass
    return klass
  }
  
  function extendCallback(item, key){
    this[key] = item
  }

  return classExports

})