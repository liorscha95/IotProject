/* global bp */

var michaelEvent = bp.Event("michaelEvent");
var michaelRequestShowerEvent = bp.Event("michaelRequestShowerEvent");
var michaelShowerEvent = bp.Event("michaelShowerEvent");
var michaelCofeeEvent = bp.Event("michaelCofeeEvent");


var startShowerEvent = bp.Event("startShowerEvent");
var emptyShowerEvent = bp.Event("emptyShowerEvent");
var endOfShowerEvent = bp.Event("endOfShowerEvent");

var coldEvent = bp.Event("coldEvent");
var finishColdEvent = bp.Event("finishColdEvent");

var hotEvent = bp.Event("hotEvent");
var finishHotEvent = bp.Event("finishHotEvent");

var darkCofeeEvent = bp.Event("darkCofeeEvent");
var capuccinoEvent = bp.Event("capuccinoEvent");
var finishCofeeEvent = bp.Event("finishCofeeEvent");

var waterIterations = 2;
var hotQuantity = 3;
var coldQuantity = 1;

bp.registerBThread("MichaelShower", function () {
    bsync({waitFor: michaelEvent});
    bsync({request: michaelRequestShowerEvent});
});

bp.registerBThread("MichaelCofee", function () {
    bsync({waitFor: michaelEvent});
    bsync({request: michaelCofeeEvent});
});

bp.registerBThread("michaelRequestShower", function () {
    bsync({waitFor: michaelRequestShowerEvent});
    bsync({request: startShowerEvent});
    bsync({request: michaelShowerEvent});
    bsync({waitFor: emptyShowerEvent, block: startShowerEvent});
});

bp.registerBThread("MichaelShowerAlternator", function () {
    bsync({waitFor: michaelShowerEvent});
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
    bsync({waitFor: michaelShowerEvent});
    for (var i = 0; i < waterIterations * hotQuantity; i++) {
        bsync({request: hotEvent});
        // bsync({waitFor: finishHotEvent});
    }
});


bp.registerBThread("MichaelColdShower", function () {
    bsync({waitFor: michaelShowerEvent});
    for (var i = 0; i < waterIterations * coldQuantity; i++) {
        bsync({request: coldEvent});
        // bsync({waitFor: finishColdEvent});
    }
});