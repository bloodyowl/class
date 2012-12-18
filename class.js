;(function(root){

  var hasOwn = {}.hasOwnProperty

  function sub(){}

  function Class(parent, object){

    if(!object) {
      object = parent
      parent = undefined
    }

    var init = object.initialize || parent
      , fn = function(){
        init.apply(this, arguments)
      }
      , index

    delete object.initialize

    if(parent) {
      sub.prototype = parent.prototype
      fn.prototype = new sub()
      parent.prototype.childClasses.push(fn.prototype)
      fn.prototype.parentClass = parent.prototype
    }

    fn.toString = function(){
      return init.toString()
    }

    fn.prototype.childClasses = []

    for(index in object) if(hasOwn.call(object, index)) fn.prototype[index] = object[index]
    fn.prototype.constructor = fn
    return fn
  }

  root.Class = Class

})(this)