const redis = require("./redis")
const redisConfig = require("./config").getConfig().redis;
const eventsProducer = redis.createClient(redis.port, redis.host);
const eventsConsumer = redis.createClient(redis.port, redis.host);


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

