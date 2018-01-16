var requestShowerES = bp.EventSet("shower requests", function (evt) {
    return evt.name.indexOf("RequestShower") >= 0;
});

var requestCoffeeES = bp.EventSet("coffee requests", function (evt) {
    return evt.name.indexOf("requestCoffee") >= 0;
});

var emptyShowerEvent = bp.Event("emptyShowerEvent");
var endOfShowerEvent = bp.Event("endOfShowerEvent");

var coldEvent = bp.Event("coldEvent");
var finishColdEvent = bp.Event("finishColdEvent");

var hotEvent = bp.Event("hotEvent");
var finishHotEvent = bp.Event("finishHotEvent");

var requestCoffeeDarkEvent = bp.Event("requestCoffeeDarkEvent");
var requestCoffeeCappuccinoEvent = bp.Event("requestCoffeeCappuccinoEvent");
var requestCoffeeNescafeEvent = bp.Event("requestCoffeeNescafeEvent");
var finishCoffeeEvent = bp.Event("finishCoffeeEvent");

bp.registerBThread("blockShower", function () {
    while (true) {
        bsync({waitFor: requestShowerES});
        bsync({waitFor: emptyShowerEvent, block: requestShowerES});
    }
});

bp.registerBThread("blockCoffee", function () {
    while (true) {
        bsync({waitFor: requestCoffeeES});
        bsync({waitFor: finishCoffeeEvent, block: requestCoffeeES});
    }
});

var michaelEvent = bp.Event("michaelEvent");
var michaelRequestShowerEvent = bp.Event("michaelRequestShowerEvent");
bp.registerBThread("michaelRequestShower", function () {
    bsync({waitFor: michaelEvent});
    bsync({request: michaelRequestShowerEvent});
});
bp.registerBThread("michaelShowerAlternator", function () {
    bsync({waitFor: michaelRequestShowerEvent});
    for (var i = 0; i < 2; i++) {
        bsync({waitFor: finishColdEvent, block: hotEvent});
        bsync({waitFor: finishColdEvent, block: hotEvent});
        bsync({waitFor: finishHotEvent, block: coldEvent});
    }
    bsync({waitFor: endOfShowerEvent});
    bsync({request: emptyShowerEvent});
});
bp.registerBThread("michaelHotShower", function () {
    bsync({waitFor: michaelRequestShowerEvent});
    for (var i = 0; i < 2 * 1; i++) {
        bsync({request: hotEvent});
        bsync({waitFor: finishHotEvent});
    }
});
bp.registerBThread("michaelColdShower", function () {
    bsync({waitFor: michaelRequestShowerEvent});
    for (var i = 0; i < 2 * 2; i++) {
        bsync({request: coldEvent});
        bsync({waitFor: finishColdEvent});
    }
});


var michaelChosenCoffeeEvent = requestCoffeeDarkEvent;
bp.registerBThread("michaelCoffee", function () {
    bsync({waitFor: michaelEvent});
    bsync({request: michaelChosenCoffeeEvent});
});

var danielEvent = bp.Event("danielEvent");
var danielRequestShowerEvent = bp.Event("danielRequestShowerEvent");
bp.registerBThread("danielRequestShower", function () {
    bsync({waitFor: danielEvent});
    bsync({request: danielRequestShowerEvent});
});
bp.registerBThread("danielShowerAlternator", function () {
    bsync({waitFor: danielRequestShowerEvent});
    for (var i = 0; i < 2; i++) {
        bsync({waitFor: finishColdEvent, block: hotEvent});
        bsync({waitFor: finishHotEvent, block: coldEvent});
        bsync({waitFor: finishHotEvent, block: coldEvent});
    }
    bsync({waitFor: endOfShowerEvent});
    bsync({request: emptyShowerEvent});
});
bp.registerBThread("danielHotShower", function () {
    bsync({waitFor: danielRequestShowerEvent});
    for (var i = 0; i < 2 * 2; i++) {
        bsync({request: hotEvent});
        bsync({waitFor: finishHotEvent});
    }
});
bp.registerBThread("danielColdShower", function () {
    bsync({waitFor: danielRequestShowerEvent});
    for (var i = 0; i < 2 * 1; i++) {
        bsync({request: coldEvent});
        bsync({waitFor: finishColdEvent});
    }
});


var danielChosenCoffeeEvent = requestCoffeeCappuccinoEvent;
bp.registerBThread("danielCoffee", function () {
    bsync({waitFor: danielEvent});
    bsync({request: danielChosenCoffeeEvent});
});

var rutiEvent = bp.Event("rutiEvent");
var rutiChosenCoffeeEvent = requestCoffeeDarkEvent;
bp.registerBThread("rutiCoffee", function () {
    bsync({waitFor: rutiEvent});
    bsync({request: rutiChosenCoffeeEvent});
});