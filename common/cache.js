const redis = require("./redis")
const cache = redis.createClient();

module.exports = {
	put: (key, object, ttl) => {
        eventsConsumer.on("message", function (channel, message) {
        	callback(JSON.parse(message))
        })
		return eventsConsumer.subscribeAsync("events")
	},

	publish: message => {
		return eventsProducer.publishAsync("events", JSON.stringify(message))
	}
}

