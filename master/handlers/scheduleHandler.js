"use strict";
const uuid = require("uuid")
const clientId = uuid.v4()
const eventBus = require("../../common/eventBus")
const cache = require("../../common/cache")
const config = require("../../common/config").getConfig()
const logger = require('../../common/logger')
const app = require('../expressApp')
const Promise = require('bluebird')

class ScheduleManager{
    constructor(){
        this.eventType = "tick"
        this.agents = {}

    }

    eventOccurred(event){
        if (event.counter % 40 != 0){
            return
        }
        eventBus.putEvent({
            type: "execScript",
            script: 'echo "44 | OK DUDE"\n' +
                    'echo line2' ,
            args: [],
            name: "dodo-script"
        })
    }
}

module.exports = new ScheduleManager()