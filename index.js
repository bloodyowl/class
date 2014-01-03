var _hasOwnProperty = {}.hasOwnProperty
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
  , klassId = -1
  , intancesIds = {}
  , klassesMap = {}

exports._instances = {}

exports.create = function(){
  var self = this
    , instance = Object.create(self)
    , instanceId
  if(_hasOwnProperty.call(self, "constructor") &&
      typeof instance.constructor == "function") {

    instance.constructor.apply(instance, arguments)
  }
  instanceId = ++intancesIds[self._klass]
  instance._id = instanceId
  instance._instances[instanceId] = instance
  return instance
}

exports.destroy = function(){
  var instance = this
    , parent = klassesMap[instance._klass]
  if(_hasOwnProperty.call(instance, "_klass")) {
    return
  }
  delete instance._instances[instance._id]
  if(_hasOwnProperty.call(parent || {}, "destructor") &&
      typeof instance.destructor == "function") {
    instance.destructor.apply(instance, arguments)
  }
}

exports.extend = function(object){
  var klass = Object.create(this)
  each(object, extendCallback, klass)
  klass._instances = {}
  klass._klass = ++klassId
  intancesIds[klassId] = -1
  klassesMap[klassId] = klass
  return klass
}

function extendCallback(item, key){
  this[key] = item
}
