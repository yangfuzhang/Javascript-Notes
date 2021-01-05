class Observer {
	constructor() {
	    this.events = {}
	}

	subscribe(eventName, callback) {
		let events = this.events

        if(!events.hasOwnProperty(eventName)) {
        	events[eventName] = []
        }

        events[eventName].push(callback)
	}

	unsubscribe(eventName, callback) {
		let events = this.events
		let index = 0,
		    length = 0

		if(events.hasOwnProperty(eventName)) {
			length = events[eventName].length

			for(; index < length; index++) {
				if(events[eventName][index] === callback) {
					events[eventName].splice(index, 1)
					break
				}
			}
		}
	}

	publish(eventName) {
		let events = this.events
        let args = [].slice.call(arguments, 1)
        let index = 0,
            length = 0

        if(events.hasOwnProperty(eventName)) {
        	length = events[eventName].length

        	for(; index < length; index++) {
        		events[eventName][index].apply(this, args)
        	}
        }
	}
}

let observer = new Observer()
let cb = function(args) {
	console.log(args)
}

observer.subscribe('click', cb)
observer.publish('click', 'Hello world!')
observer.unsubscribe('click', cb)
observer.publish('click', 'Hello world!')