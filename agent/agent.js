"use strict";
require("./../common/config").setRole("agent")
const logger = require("./../common/logger")
logger.info("BZ-Agent is starting up")
const eventBus = require("./../common/eventBus");
eventBus.registerHandler(require("./handlers/clientKeepaliveHandler"));
