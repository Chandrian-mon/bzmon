"use strict";
const uuid = require("uuid")
const clientId = uuid.v4()
const eventBus = require("../../common/eventBus")
const cache = require("../../common/cache")
const config = require("../../common/config").getConfig()
const logger = require('../../common/logger')
const spawn = require('child_process').spawn;
const tmp = require('tmp');
var fs = require('fs');

module.exports = {
    eventType: "execScript",
    eventOccurred: event => {

        var tmp = require('tmp');

        tmp.dir(function _tempDirCreated(err, path, cleanupCallback) {
            if (err) throw err;
            console.log("Dir: ", path);

            let stdOut = "";
            let stderr = "";
            fs.writeFile(path+"/script.sh", event.script, function(err) {
                if(err) {
                    return console.log(err);
                }

                fs.chmodSync(path+"/script.sh", "777")
                const proc = spawn(path+"/script.sh", event.args);
                proc.stdout.on('data', (data) => {
                    stdOut += data;
                    console.log(`stdout: ${data}`);
                });
                proc.stderr.on('data', (data) => {
                    stderr += data;
                    console.log(`stderr: ${data}`);
                });
                proc.on('close', (code) => {
                    console.log(`child process exited with code ${code}`);

                    fs.unlinkSync(path+"/script.sh")
                    // Manual cleanup
                    cleanupCallback();
                    eventBus.putEvent({
                        type: "execScriptDone",
                        exitCode: code,
                        name: event.name,
                        stdout: stdOut,
                        stderr: stderr
                    })
                });

            });
        });


    }
}