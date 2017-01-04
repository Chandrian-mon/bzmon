"use strict";
const eventBus = require('./../common/eventBus')
let counter = 0;

function produceTickEvent(){
	setTimeout(()=>{
		eventBus.putEvent({type: "tick", counter: counter});
		counter++;
		produceTickEvent();
	}, 1000)
}

produceTickEvent();


