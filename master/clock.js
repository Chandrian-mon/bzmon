const eventBus = require('./../common/eventBus')

function produceTickEvent(){
	setTimeout(()=>{
		eventBus.putEvent({type: "tick"});
		produceTickEvent();
	}, 1000)
}

produceTickEvent();


