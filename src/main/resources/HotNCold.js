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
    for (var i = 0; i < 4; i++) {
        bsync({waitFor: coldEvent, block: hotEvent});
        bsync({waitFor: hotEvent, block: coldEvent});
        bsync({waitFor: hotEvent, block: coldEvent});
        bsync({waitFor: hotEvent, block: coldEvent});
    }
    bsync({waitFor: endOfShowerEvent});
    bsync({request: emptyShowerEvent});
});
bp.registerBThread("michaelHotShower", function () {
    bsync({waitFor: michaelRequestShowerEvent});
    for (var i = 0; i < 4 * 3; i++) {
        bsync({request: hotEvent});
        // bsync({waitFor: finishHotEvent});
    }
});
bp.registerBThread("michaelColdShower", function () {
    bsync({waitFor: michaelRequestShowerEvent});
    for (var i = 0; i < 4 * 1; i++) {
        bsync({request: coldEvent});
        // bsync({waitFor: finishHotEvent});
    }
});

var michaelChosenCoffeeEvent = requestCoffeeDarkEvent;
bp.registerBThread("michaelCoffee", function () {
    bsync({waitFor: michaelEvent});
    bsync({request: michaelChosenCoffeeEvent});
});