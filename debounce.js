// 防抖函数
function debounce(func, wait, immediate) {
	let timeout

	let debounced = function() {
		let context = this
		let args = [].slice.call(arguments)

		if(timeout) {
			clearTimeout(timeout)
		}

		if(immediate) {
			let callNow = !timeout

			timeout = setTimeout(function() {
				timeout = null
			}, wait)

			if(callNow) {
				func.apply(context, args)
			}
		} else {
			timeout = setTimeout(function() {
				func.apply(context, args)
			}, wait)
		}
	}

	debounced.cancel = function() {
		clearTimeout(timeout)
		timeout = null
	}

	return debounced
}