function curry(fn, args) {
	// 闭包保存函数参数长度
	let length = fn.length

	args = args || []

	return function() {
		let _args = args.slice(0)

		for(let i = 0; i < arguments.length; i++) {
			_args.push(arguments[i])
		}

		if(_args.length < length) {
			return curry.call(this, fn, _args)
		} else {
			return fn.apply(this, _args)
		}
	}
}

let fn = curry(function(a, b, c) {
	console.log([a, b, c])
})

fn("a", "b", "c")
fn("a", "b")("c")
fn("a")("b")("c") 
fn("a")("b", "c")