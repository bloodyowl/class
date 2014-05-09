var tape = require("tape")
  , klass = require("../")

tape("class", function(test){

  var instance
  var myKlass = klass.extend({
        constructor : function(foo){
          if(arguments.length) {
            this.foo = foo
          }
        },
        destructor : function(){
          this.foo = null
        },
        foo : "bar",
        test : function(value){
          test.equal(this, instance)
          test.equal(value, 1)
        }
      })
    , first = myKlass.create()

  test.equal(myKlass.foo, "bar", "extended (prop)")
  test.notEqual(myKlass.constructor.toString().indexOf("foo"), -1, "extended (ctor)")
  first.destroy()
  test.ok(myKlass.isPrototypeOf(first))
  test.equal(first.foo, null, "destructor is called on destroy")
  instance = myKlass.create()
  instance.accessor("test")(1)
  instance.accessor("test")(1)
  test.equal(typeof instance._accessors.test, "function")
  test.end()

})
