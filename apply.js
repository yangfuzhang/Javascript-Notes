/**
 * apply方法原生实现
 */

Function.prototype.apply = function(context, args = []) {
	if(typeof this !== 'function') {
		throw new TypeError('Function.prototype.apply: trying to apply a non-function')
	}

  context = context || window
  const fn = Symbol('fn')
	context[fn] = this
  const result = context[fn](...args)

  delete context[fn]

  return result
}