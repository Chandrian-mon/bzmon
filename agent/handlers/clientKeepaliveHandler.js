"use strict";
const uuid = require("uuid")
const clientId = uuid.v4()
const eventBus = require("../../common/eventBus")
const cache = require("../../common/cache")
const config = require("../../common/config").getConfig()
const logger = require('../../common/logger')


module.exports = {
    eventType: "tick",
    eventOccurred: event => {
      cache.put("agents/"+clientId, config.client, 2).catch(err => {
          logger.info("ERROR: "+err);
      })
    }
}