# Class.js

## Description

**Class.js** is a simple Class implementation that can help you keeping your code clear and organized. 

## How it works

**Class.js** is based on `Constructor#prototype`, which means that the object that owns your methods is kept as a reference (which is what represents `__proto__` in recent browsers). 

## Usage

```javascript
var myClass = Class([parent ,]{
  initialize : function(){},
  method1 : function(){},
  method2 : function(){}
  // …
})

new myClass([args])
```

## API

### parentClass

Class adds a `parentClass` (`Object reference`) property to the class `prototype` if based on a parent class. Its content is the parents prototype.  

```javascript
var Foo = Class({initialize:function(){}})
var Bar = Class(Foo, {foo:function(){}})
Bar.prototype.parentClass == Foo.prototype
```

### childClasses

Class adds a `childClasses` (`Array`) property every class `prototype`. When you make a child class, its prototype is pushed to the parent class `childClass`.

```javascript
var Foo = Class({initialize:function(){}})
var Bar = Class(Foo, {foo:function(){}})
Foo.childClasses == [Bar.prototype]
```
### toString

If you call the `.toString` method on a `new Class`, even if the class is actually a different function, its the `initialize` method that is wrapped inside which is represented (helps debugging). 

## Example

```javascript
var Foo = Class({
  initialize : function(foo, bar){
    this.foo = foo
    this.bar = bar
    return this
  },
  addBaz : function(baz){
    this.baz = baz
    return this
  }
})

var Baz = Class(Foo, {
  addTest : function(test){
    this.test = test
    return this
  }
})
```