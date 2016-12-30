const redis = require("./redis")
const eventsProducer = redis.createClient();
const eventsConsumer = redis.createClient();

module.exports = {
	subscribe: callback => {
        eventsConsumer.on("message", function (channel, message) {
        	callback(JSON.parse(message))
        })
		return eventsConsumer.subscribeAsync("events")
	},

	publish: message => {
		return eventsProducer.publishAsync("events", JSON.stringify(message))
	}
}

