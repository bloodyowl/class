var hasOwn = {}.hasOwnProperty


module.exports = function(object, property){
  return hasOwn.call(object, property) &&
    typeof object[property] == "function"
}