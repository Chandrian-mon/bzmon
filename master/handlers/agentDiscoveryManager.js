"use strict";
const uuid = require("uuid")
const clientId = uuid.v4()
const eventBus = require("../../common/eventBus")
const cache = require("../../common/cache")
const config = require("../../common/config").getConfig()
const logger = require('../../common/logger')
const app = require('../expressApp')
const Promise = require('bluebird')

class AgentDiscoveryManager{
    constructor(){
        this.eventType = "tick"
        this.agents = {}

        app.get('/agents', (req, res) => {
            res.setHeader('Content-Type', 'application/json')
            res.json({agents: this.agents})
        })
    }

    eventOccurred(event){
        Promise.map(cache.keys("agents*"), key => {
            return cache.get(key).then(agent => {
                agent.Id = key;
                return agent;
            })
        }).then(agents => {
            return Promise.map(agents, agent => {
                if (!this.agents[agent.Id]){
                    logger.info("Agent joined: "+JSON.stringify(agent))
                }
                this.agents[agent.Id] = agent;
                return agent
            })
        }).then(agents => {
            const cacheAgents = {};
            agents.forEach(agent => {
                cacheAgents[agent.Id] = agent
            })

            Object.keys(this.agents).forEach(agentKey => {
                if (!cacheAgents[agentKey]) {
                    logger.info("Removing agent: "+JSON.stringify(this.agents[agentKey]))
                    delete this.agents[agentKey]
                }
            })
        })

    }
}

module.exports = new AgentDiscoveryManager()