// 方法一：循环递归
function flatten(arr) {
	let result = []

	for(let i = 0; i < arr.length; i++) {
		if(Array.isArray(arr[i])) {
			result = result.concat(flatten(arr[i]))
		} else {
			result.push(arr[i])
		}
	}

	return result
}

let arr = [1, [2, [3, 5]], 6, [9, 7]]

flatten(arr)

// 方法二：reduce
function flatten(arr) {
	return arr.reduce(function(prev, next) {
		return prev.concat(Array.isArray(next) ? flatten(next) : next)
	}, [])
}

let arr1 = [1, [2, [3, 5]], 6, [9, 7]]

flatten(arr1)


//ES6 API
function flatten(arr) {
	while (arr.some(item => Array.isArray(item))) {
		arr = [].concat(...arr)
	}

	return arr
}

let arr2 = [1, [2, [3, 5]], 6, [9, 7]]

flatten(arr2)
