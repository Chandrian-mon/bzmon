"use strict";
const uuid = require("uuid")
const clientId = uuid.v4()
const eventBus = require("../../common/eventBus")

module.exports = {
    eventType: "tick",
    eventOccurred: event => {
        eventBus.putEvent({
            type: "clientKeepalive",
            clientId: clientId
        })
    }
}