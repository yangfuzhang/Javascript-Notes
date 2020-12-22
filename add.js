/**
 * 实现add(1)(2, 3)(4).value()
 */

function add() {
	const args = [].slice.apply(arguments)
	const self = this

	self.nums = [...args]

	function _add() {
		const _args = [].slice.apply(arguments)

		self.nums.push(..._args)

		return _add
	}

	_add.value = function() {
        return self.nums.reduce((acc, cur) => {
            return acc += cur
	    }, 0)
	}

    return _add
}