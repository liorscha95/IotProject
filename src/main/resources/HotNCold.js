/* global bp */
var requestShowerES = bp.EventSet("shower requests", function (evt) {
    return evt.name.indexOf("RequestShower") >= 0;
});

var requestCofeeES = bp.EventSet("coffee requests", function (evt) {
    return evt.name.indexOf("requestCofee") >= 0;
});

var emptyShowerEvent = bp.Event("emptyShowerEvent");
var endOfShowerEvent = bp.Event("endOfShowerEvent");

var coldEvent = bp.Event("coldEvent");
var finishColdEvent = bp.Event("finishColdEvent");

var hotEvent = bp.Event("hotEvent");
var finishHotEvent = bp.Event("finishHotEvent");

var requestDarkCofeeEvent = bp.Event("requestCoffeeDarkEvent");
var requestCapuccinoEvent = bp.Event("requestCoffeeCapuccinoEvent");
var finishCofeeEvent = bp.Event("finishCofeeEvent");

// Global functions and events
bp.registerBThread("blockShower", function () {
    while (true) {
        bsync({waitFor: requestShowerES});
        bsync({waitFor: emptyShowerEvent, block: requestShowerES});
    }
});

bp.registerBThread("blockCofee", function () {
    while (true) {
        bsync({waitFor: requestCofeeES});
        bsync({waitFor: finishCofeeEvent, block: requestCofeeES});
    }
});

//Specific to Michael functions and events
var michaelEvent = bp.Event("michaelEvent");
var michaelRequestShowerEvent = bp.Event("michaelRequestShowerEvent");
var michaelChosenCofeeEvent = requestDarkCofeeEvent;
var waterIterations = 2;
var hotQuantity = 3;
var coldQuantity = 1;

bp.registerBThread("MichaelShower", function () {
    bsync({waitFor: michaelEvent});
    bsync({request: michaelRequestShowerEvent});
});

bp.registerBThread("MichaelCofee", function () {
    bsync({waitFor: michaelEvent});
    bsync({request: michaelChosenCofeeEvent});
});

bp.registerBThread("MichaelShowerAlternator", function () {
    bsync({waitFor: michaelRequestShowerEvent});
    for (var i = 0; i < waterIterations; i++) {
        bsync({waitFor: coldEvent, block: hotEvent});
        bsync({waitFor: hotEvent, block: coldEvent});
        bsync({waitFor: hotEvent, block: coldEvent});
        bsync({waitFor: hotEvent, block: coldEvent});
    }
    bsync({waitFor: endOfShowerEvent});
    bsync({request: emptyShowerEvent});
});

bp.registerBThread("MichaelHotShower", function () {
    bsync({waitFor: michaelRequestShowerEvent});
    for (var i = 0; i < waterIterations * hotQuantity; i++) {
        bsync({request: hotEvent});
        // bsync({waitFor: finishHotEvent});
    }
});


bp.registerBThread("MichaelColdShower", function () {
    bsync({waitFor: michaelRequestShowerEvent});
    for (var i = 0; i < waterIterations * coldQuantity; i++) {
        bsync({request: coldEvent});
        // bsync({waitFor: finishColdEvent});
    }
});