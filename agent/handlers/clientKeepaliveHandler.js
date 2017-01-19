"use strict";
const uuid = require("uuid")
const clientId = uuid.v4()
const eventBus = require("../../common/eventBus")
const cache = require("../../common/cache")
const config = require("../../common/config").getConfig()
const logger = require('../../common/logger')
const spawn = require('child_process').spawn;

const agentObject = {
    properties: config.client,
    healthStatus: {}
}

module.exports = {
    eventType: "tick",
    eventOccurred: event => {

        cache.put("agents/" + clientId, agentObject, event.ttl).then(()=> {
            if (config.healthScript && event.counter % config.healthScript.execInterval == 0) {
                console.log("found health script")
                const proc = spawn(config.healthScript.location);
                let stdOut = "";
                let stdErr = "";

                proc.stdout.on('data', (data) => {
                    stdOut += data;
                    console.log(`stdout: ${data}`);
                });
                proc.stderr.on('data', (data) => {
                    stdErr += data;
                    console.log(`stderr: ${data}`);
                });
                proc.on('close', (code) => {
                    console.log(`child process exited with code ${code}`);
                    agentObject.healthStatus.exitCode = code;
                    agentObject.healthStatus.stdErr = stdErr;
                    agentObject.healthStatus.stdOut = stdOut;
                    if (code == 0){
                        try {
                            agentObject.healthStatus.result = JSON.parse(stdOut)
                        } catch (err) {
                            console.log("Error: cannot parse script result: "+stdOut);
                            agentObject.healthStatus.result = null;
                        }
                    }
                });

            }
        }).catch(err => {
            logger.info("ERROR: " + err);
        })
    }
}