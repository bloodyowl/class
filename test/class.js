var tape = require("tape")
  , klass = require("../")

tape("class", function(test){

  var myKlass = klass.extend({
        constructor : function(foo){
          if(arguments.length) {
            this.foo = foo
          }
        },
        destructor : function(){
          this.foo = null
        },
        foo : "bar"
      })
    , first = myKlass.create()

  test.equal(myKlass.foo, "bar", "extended (prop)")
  test.notEqual(myKlass.constructor.toString().indexOf("foo"), -1, "extended (ctor)")
  first.destroy()
  test.equal(first.foo, null, "destructor is called on destroy")
  test.ok(first.extend().hasOwnProperty("constructor"), "adds constructor if not extended")
  test.end()

})
