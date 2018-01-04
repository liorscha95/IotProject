/* global bp */

var startEvent = bp.Event("startEvent");
var coldEvent = bp.Event("coldEvent");
var hotEvent  = bp.Event("hotEvent");

bp.registerBThread("HotBt", function() {
    bsync({waitFor:startEvent});
    for (var i = 0; i < 10; i++) {
        bsync({request:hotEvent});
    }
});

bp.registerBThread("ColdBt", function() {
    bsync({waitFor:startEvent});

    for (var i = 0; i < 10; i++) {
        bsync({request:coldEvent});
    }
});

bp.registerBThread("AlternatorBt", function() {
    for (var i = 0; i < 10; i++) {
        bsync({waitFor:coldEvent, block:hotEvent}); // block hot first, so as not to burn our thumb.
        bsync({waitFor:hotEvent, block:coldEvent});
    }
    bsync({request:bp.Event("allDone")});
});