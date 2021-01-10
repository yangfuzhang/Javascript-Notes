class Queue {
	constructor() {
	    this.queue = []
	}

	task(delay, cb) {
		this.queue.push({cb: cb, delay: delay})

		return this
	}

	start() {
	    let p = Promise.resolve()

	    for(let i = 0; i < this.queue.length; i++) {
	    	p = p.then(() => {
	    	    return new Promise((resolve, reject) => {
					setTimeout(() => {
					    this.queue[i].cb.apply(this)
					    resolve()
					}, this.queue[i].delay)
				})
	    	})
	    }
	}
}

new Queue().task(1000, () => {console.log(1)})
                       .task(5000, () => {console.log(2)})
                       .task(1000, () => {console.log(3)})
                       .start()

