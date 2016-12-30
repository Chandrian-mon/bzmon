"use strict";
require("./../common/config").setRole("master")
const logger = require("./../common/logger")
logger.info("BZ-Master is starting up")
const eventBus = require("./../common/eventBus");
const clock = require("./clock");

eventBus.registerHandler(require("./handlers/agentDiscoveryManager"));
