const redis = require("./redis")
const cache = redis.createClient();
const prefix = require("./config").getConfig().redis.prefix

module.exports = {
	put: (key, object, ttl) => {
        return Promise.all(
        	[
        		cache.setAsync(prefix+key, JSON.stringify(object)),
				cache.expireAsync(prefix+key, ttl)
			]
		)
	},

	get: key => {
		return cache.getAsync(prefix+key).then(str => JSON.parse(str))
	},

	delete: key => {
		return cache.delAsync(prefix+key)
	},

	keys: kpref => {
		return cache.keysAsync(prefix+kpref).then(keys => {
			return keys.map(k=>k.substring(prefix.length))
		})
	}
}

