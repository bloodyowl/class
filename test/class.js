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

tape("class mixins", function(test){

  var hookMixin = klass.extend({
    constructor : function(options){
      this.test = [options.test]
    },
    destructor : function(options){
      this.test = null
    },
    push : function(){
      this.test.push.apply(this.test, arguments)
    }
  })

  var finalClass = klass.extend({
    constructor : function(){
      test.deepEqual(this.test, [1])
    },
    destructor : function(){
      test.deepEqual(this.test, [1, 2, 3])
    },
    mixins : [hookMixin]
  })

  var finalInstance = finalClass.create({test:1})
  finalInstance.push(2, 3)
  test.deepEqual(finalInstance.test, [1, 2, 3])
  finalInstance.destroy()
  test.deepEqual(finalInstance.test, null)
  test.end()
})

tape("class multiple mixins", function(test){

  var hookMixin = klass.extend({
    constructor : function(options){
      this.test = [options.test]
    },
    destructor : function(options){
      this.test = null
    },
    push : function(){
      this.test.push.apply(this.test, arguments)
    }
  })

  var popMixin = klass.extend({
    constructor : function(options){
      this._canPop = true
      test.equal(options.test, 1)
      test.deepEqual(this.test, [1])
    },
    destructor : function(options){
      this._canPop = null
      test.pass()
    },
    pop : function(){
      if(!this._canPop) {
        return
      }
      this.test.pop.apply(this.test, arguments)
    }
  })

  var finalClass = klass.extend({
    constructor : function(){
      test.deepEqual(this.test, [1])
    },
    destructor : function(){
      test.deepEqual(this.test, [1, 2])
    },
    mixins : [hookMixin, popMixin]
  })

  var finalInstance = finalClass.create({test:1})
  finalInstance.push(2, 3)
  finalInstance.pop()
  test.notDeepEqual(finalClass.test, [1, 2])
  test.deepEqual(finalInstance.test, [1, 2])
  finalInstance.destroy()
  test.deepEqual(finalInstance.test, null)
  test.equal(finalInstance._canPop, null)
  test.end()
})
