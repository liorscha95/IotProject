Blockly.JavaScript['sethouse'] = function (block) {
    var statements_persontasks = Blockly.JavaScript.statementToCode(block, 'PersonTasks');
    var code =
        'var requestShowerES = bp.EventSet("shower requests", function (evt) {\n' +
        '    return evt.name.indexOf("RequestShower") >= 0;\n' +
        '});\n' +
        '\n' +
        'var requestCoffeeES = bp.EventSet("coffee requests", function (evt) {\n' +
        '    return evt.name.indexOf("requestCoffee") >= 0;\n' +
        '});\n' +
        '\n' +
        'var emptyShowerEvent = bp.Event("emptyShowerEvent");\n' +
        'var endOfShowerEvent = bp.Event("endOfShowerEvent");\n' +
        '\n' +
        'var coldEvent = bp.Event("coldEvent");\n' +
        'var finishColdEvent = bp.Event("finishColdEvent");\n' +
        '\n' +
        'var hotEvent = bp.Event("hotEvent");\n' +
        'var finishHotEvent = bp.Event("finishHotEvent");\n' +
        '\n' +
        'var requestCoffeeDarkEvent = bp.Event("requestCoffeeDarkEvent");\n' +
        'var requestCoffeeCappuccinoEvent = bp.Event("requestCoffeeCappuccinoEvent");\n' +
        'var requestCoffeeNescafeEvent = bp.Event("requestCoffeeNescafeEvent");\n' +
        'var finishCoffeeEvent = bp.Event("finishCoffeeEvent");\n' +
        '\n' +
        'bp.registerBThread("blockShower", function () {\n' +
        '    while (true) {\n' +
        '        bsync({waitFor: requestShowerES});\n' +
        '        bsync({waitFor: emptyShowerEvent, block: requestShowerES});\n' +
        '    }\n' +
        '});\n' +
        '\n' +
        'bp.registerBThread("blockCoffee", function () {\n' +
        '    while (true) {\n' +
        '        bsync({waitFor: requestCoffeeES});\n' +
        '        bsync({waitFor: finishCoffeeEvent, block: requestCoffeeES});\n' +
        '    }\n' +
        '});\n';
    return code + '\n' + statements_persontasks;
};

Blockly.JavaScript['manbehaviour'] = function (block) {
    var person_name = block.getFieldValue('person_name');
    var statements_personcode = Blockly.JavaScript.statementToCode(block, 'personCode');

    var personEvent = 'var %NAME%Event = bp.Event("%NAME%Event");\n';

    var code = (personEvent + statements_personcode).replace(/%NAME%/g, person_name);
    return code;
};

Blockly.JavaScript['showertask'] = function (block) {
    var number_cycles = block.getFieldValue('cycles');
    var number_hot_quantity = block.getFieldValue('hot quantity');
    var number_cold_quantity = block.getFieldValue('cold quantity');

    var events =
        'var %NAME%RequestShowerEvent = bp.Event("%NAME%RequestShowerEvent");\n';

    var personRequestShowerBthread =
        'bp.registerBThread("%NAME%RequestShower", function () {\n' +
        '    bsync({waitFor: %NAME%Event});\n' +
        '    bsync({request: %NAME%RequestShowerEvent});\n' +
        '});\n';

    var waitForColdBlockHot =
        '        bsync({waitFor: finishColdEvent, block: hotEvent});\n';
    var waitForHotBlockCold =
        '        bsync({waitFor: finishHotEvent, block: coldEvent});\n';

    var personShowerAlternator =
        'bp.registerBThread("%NAME%ShowerAlternator", function () {\n' +
        '    bsync({waitFor: %NAME%RequestShowerEvent});\n' +
        `    for (var i = 0; i < ${number_cycles}; i++) {\n` +
        waitForColdBlockHot.repeat(number_cold_quantity) +
        waitForHotBlockCold.repeat(number_hot_quantity) +
        '    }\n' +
        '    bsync({waitFor: endOfShowerEvent});\n' +
        '    bsync({request: emptyShowerEvent});\n' +
        '});\n';

    var personHotShower =
        'bp.registerBThread("%NAME%HotShower", function () {\n' +
        '    bsync({waitFor: %NAME%RequestShowerEvent});\n' +
        `    for (var i = 0; i < ${number_cycles} * ${number_hot_quantity}; i++) {\n` +
        '        bsync({request: hotEvent});\n' +
        '        bsync({waitFor: finishHotEvent});\n' +
        '    }\n' +
        '});\n';

    var personColdShower =
        'bp.registerBThread("%NAME%ColdShower", function () {\n' +
        '    bsync({waitFor: %NAME%RequestShowerEvent});\n' +
        `    for (var i = 0; i < ${number_cycles} * ${number_cold_quantity}; i++) {\n` +
        '        bsync({request: coldEvent});\n' +
        '        bsync({waitFor: finishHotEvent});\n' +
        '    }\n' +
        '});\n';


    var code =
        events +
        personRequestShowerBthread +
        personShowerAlternator +
        personHotShower +
        personColdShower + '\n\n';
    return code;
};

Blockly.JavaScript['coffeetask'] = function (block) {
    var coffe_type = block.getFieldValue('coffe type');

    var code = `var %NAME%ChosenCoffeeEvent = requestCoffee${coffe_type}Event;\n` +
        'bp.registerBThread("%NAME%Coffee", function () {\n' +
        '    bsync({waitFor: %NAME%Event});\n' +
        '    bsync({request: %NAME%ChosenCoffeeEvent});\n' +
        '});\n\n';
    return code;
};