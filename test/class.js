var tape = require("tape")
  , klass = require("../")
  , getKeys = Object.keys || function(o){var a = []; for(var i in o) if(o.hasOwnProperty(i)) a.push(i); return a}

tape("class", function(test){

  var properties = {
        constructor : function(foo){
          if(arguments.length) {
            this.foo = foo
          }
        },
        destructor : function(){
          this.foo = null
        },
        foo : "bar"
      }
    , myKlass = klass.extend(properties)
    , first = myKlass.create()

  test.equal(myKlass.foo, properties.foo, "extended (prop)")
  test.equal(myKlass.constructor, properties.constructor, "extended (ctor)")
  test.equal(typeof parseInt(myKlass._klass, 10), "number", "has klass id")
  test.equal(myKlass.create()._klass, myKlass._klass, "instance has klass id")
  test.equal(typeof first._id, "number", "instance has unique instance id")
  first.destroy()
  test.equal(first.foo, null, "destructor is called on destroy")
  test.end()

})
