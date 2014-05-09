// from lodash
var toString = Object.prototype.toString
var isNativeRE = RegExp('^' +
    String(toString)
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/toString| for [^\]]+/g, '.*?') + '$'
  )

if(Object.create && isNativeRE.test(Object.create)) {
  module.exports = Object.create
} else {
  module.exports = function(object){
    function F(){}
    F.prototype = object
    return new F()
  }
}
