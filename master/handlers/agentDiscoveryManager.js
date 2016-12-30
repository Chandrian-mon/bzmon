"use strict";
const uuid = require("uuid")
const clientId = uuid.v4()
const eventBus = require("../../common/eventBus")
const cache = require("../../common/cache")
const config = require("../../common/config").getConfig()
const logger = require('../../common/logger')

class AgentDiscoveryManager{
    constructor(){
        this.eventType = "tick"
        this.agents = {}
    }

    eventOccurred(event){
        cache.keys("agents*").then(agentKeys => {
            agentKeys.forEach(agentKey => {
                cache.get(agentKey).then(agentProps => {
                    if (!this.agents[agentKey]){
                        this.agents[agentKey] = agentProps;
                        logger.info("Agent joined: "+agentKey+" properties: "+JSON.stringify(agentProps))
                    }
                })
            })

            Object.keys(this.agents).forEach(agentKey => {
                if (!agentKeys.find(k => k=agentKey)){
                    logger.info("Removing agent: "+agentKey+" properties: "+JSON.stringify(this.agents[agentKey]))
                    delete this.agents[agentKey]
                }
            })
        })
    }
}

module.exports = new AgentDiscoveryManager()