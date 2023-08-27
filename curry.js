function curry(fn, args) {
	// 闭包保存函数参数长度
	let length = fn.length

	args = args || []

	return function() {
		let _args = Array.prototype.slice.call(args)
		let _newArgs = _args.concat(Array.prototype.slice.call(arguments))

		if(_newArgs.length < length) {
			return curry.call(this, fn, _newArgs)
		} else {
			return fn.apply(this, _newArgs)
		}
	}
}

let fn = curry(function(a, b, c) {
	return a + b + c
})

fn(1, 2, 3)
fn(1, 2)(3)
fn(1)(2)(3) 
fn(1)(2, 3)