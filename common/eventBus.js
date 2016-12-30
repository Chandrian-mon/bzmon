"use strict";

const logger = require('./logger')
const messagingService = require("./messaging")

class EventBus {
	constructor(){
		this.subscribers = []
        messagingService.subscribe(message => {
        	this.publishEvent(message)
		})
	}

	registerHandler(handler){
		this.addSubscriber(handler, [handler.eventType])
	}

	addSubscriber(subscriber, eventTypes){
		this.subscribers.push({
			subscriber: subscriber,
			eventTypes: eventTypes
		});
	}

    putEvent(event) {
    	messagingService.publish(event)
	}

	publishEvent(event) {
		logger.debug("EventBus: broadcasting event: "+JSON.stringify(event))
		this.subscribers.forEach(item => {
			if (item.eventTypes.find(type => type == event.type)){
				item.subscriber.eventOccurred(event);
			}
		})
	}
}

module.exports = new EventBus();
