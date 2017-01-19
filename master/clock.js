"use strict";
const eventBus = require('./../common/eventBus')
const config = require("../common/config").getConfig()

let counter = 0;

function produceTickEvent(){
	setTimeout(()=>{
		eventBus.putEvent({type: "tick", counter: counter, ttl: config.tickTTL});
		counter++;
		produceTickEvent();
	}, 1000)
}

produceTickEvent();


