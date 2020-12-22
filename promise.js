const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

function Mypromise(callback) {
	if(typeof callback !== 'function') {
		throw new Error('callback must be a function')
	}

	var that = this

	that.state = PENDING
	that.value = void 0
	that.onResolvedCallbacks = []
	that.onRejectedCallbacks = []

	that.resolve = function (value) {
        setTimeout(() => {
        	if(that.state === PENDING) {
        		that.state = FULFILLED
        	    that.value = value
        	    that.onResolvedCallbacks.forEach(cb => cb())
        	}
        }, 0)
	}

	that.reject = function (value) {
		setTimeout(() => {
			if(that.state === PENDING) {
        		that.state = REJECTED
        	    that.value = value
        	    that.onRejectedCallbacks.forEach(cb => cb())
        	}
		},0)
	}
    
    try {
        callback(that.resolve, that.reject)
    } catch (err) {
        that.reject(err)
    }
}

Mypromise.prototype.then = function(onFullfilled, onRejected) {
    var that = this
    var promise2

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : error => {throw error}

    if(that.state === PENDING) {
        promise2 = new Mypromise(function(resolve, reject) {
            that.onResolvedCallbacks.push(function() {
            	try {
                    var x = onFullfilled(that.value)

            	    resolveProcedure(promise2, x, resolve, reject)
            	} catch (err) {
            		reject(err)
            	}
            })

            that.onRejectedCallbacks.push(function() {
            	try {
            		var x = onRejected(that.value)
            	} catch (err) {
            		reject(err)
            	}
            })
        })

        return promise2
    }

    if(that.state === FULFILLED) {
    	promise2 = new Mypromise(function(resolve, reject) {
            try {
            	var x = onFulfilled(that.value)

                resolveProcedure(promise2, x, resolve, reject)
            } catch (err) {
                reject(err)
            }
    	})

    	return promise2
    }

    if(that.state === REJECTED) {
    	promise2 = new Mypromise(function(resolve, reject) {
            try {
            	var x = onRejected(that.value)

                resolveProcedure(promise2, x, resolve, reject)
            } catch (err) {
                reject(err)
            }
    	})

    	return promise2
    } 
}

function resolveProcedure(promise2, x, resolve, reject) {
	if (promise2 === x) {
        return reject(new TypeError("Chaining cycle detected for promise!"))
    }

	if(x instanceof Mypromise) {
		if(x.state === PENDING) {
			x.then(function(value) {
				resolveProcedure(promise2, value, resolve, reject)
			}, reject)
		} else {
			// 此时resolve参数即为then方法的onFullfilled
            x.then(resolve, reject)
		}

		return
	}

	resolve(x)
}

var mypromise = new Mypromise(function(resolve, reject) {
	setTimeout(function() {
		// 第一次调用resolve，最外层promise状态变成fullfilled，执行then中的回调函数
        resolve('在第一个then中打印')
	}, 1000)
})

var mypromise1 = mypromise.then(function(value) {
        console.log(value)

        return new Mypromise(function(resolve, reject) {
        	setTimeout(function() {
        		resolve('在第二个then中打印')
        	}, 1000)
        })
	})
    .then(function(value) {
		console.log(value)
	})