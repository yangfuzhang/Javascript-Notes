// 防抖函数
function debounce(func, wait, immediate) {
	let timeout, result

	let debounced = function() {
		let context = this
		let args = arguments

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

		return result
	}

	debounced.cancel = function() {
		clearTimeout(timeout)
		timeout = null
	}

	return debounced
}