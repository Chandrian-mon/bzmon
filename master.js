"use strict";
require("./common/config").setRole("agent")
const logger = require("./common/logger")
logger.info("BZ-Master is starting up")
const eventBus = require("./common/eventBus");
const clock = require("./master/clock");
