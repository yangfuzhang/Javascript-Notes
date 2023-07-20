/**
 * bind方法原生实现
 */

Function.prototype.bind = function(context) {
	if(typeof this !== 'function') {
		throw new Error('Function.prototype.bind: trying to bind a non-function')
	}

	var self = this
	var args = [].slice.call(arguments, 1)

	var fNOP = function() {}
	var fBound = function() {
		var bindArgs = [].slice.call(arguments)

		return self.apply(this instanceof fBound ? this: context, args.concat(bindArgs))
	}

  // 返回的函数prototype指向空函数，空函数prototype指向绑定函数
	fNOP.prototype = self.prototype
	fBound.prototype = new fNOP()

  return fBound
}