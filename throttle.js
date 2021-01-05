const throttle = function(func, wait = 50) {
	let previous = 0

	return function(...args) {
		let now = +new Date()

		if(now - previous > wait) {
			previous = now
			func.apply(this, args)
		}
	}
}

const throttled = throttle(() => console.log('The function is called.'))

setInterval(throttled, 1000)