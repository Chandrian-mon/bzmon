"use strict";
const logger = require('./logger')
const fs = require('fs')

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

class ConfigManager {

    setRole(role) {
        this.role = role
    }

    getConfigFileName() {
        if (!this.role) {
            throw new Error("getConfigFileName can be called only after setRole was called");
        }
        return getUserHome() + "/.bzmon/" + this.role + ".json"
    }

    getConfigFor(role){
        this.setRole(role)
        return this.getConfig()
    }

    getConfig() {
        if (this.cachedConfig) {
            return this.cachedConfig;
        }

        if (!this.role) {
            throw new Error("getConfig can be called only after setRole was called");
        }
        if (fs.existsSync(this.getConfigFileName())) {
            logger.info("Found config file at: " + this.getConfigFileName())
            this.cachedConfig = JSON.parse(fs.readFileSync(this.getConfigFileName()))
        } else {
            logger.info("Not Found config file at: " + this.getConfigFileName() + ", using default config");
            this.cachedConfig = require("../" + this.role + "/config/default.json")
        }
        logger.info("Loaded configuration: \n"+JSON.stringify(this.cachedConfig))
        return this.cachedConfig
    }
}

module.exports = new ConfigManager()