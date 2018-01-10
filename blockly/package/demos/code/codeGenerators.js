Blockly.JavaScript['sethouse'] = function(block) {
    var statements_persontasks = Blockly.JavaScript.statementToCode(block, 'PersonTasks');
    var code = 'var requestShowerES = bp.EventSet("shower requests", function (evt) {\n' +
        '    return evt.name.indexOf("RequestShower") >= 0;\n' +
        '});\n' +
        '\n' +
        'var requestCofeeES = bp.EventSet("coffee requests", function (evt) {\n' +
        '    return evt.name.indexOf("requestCofee") >= 0;\n' +
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
        'var requestDarkCofeeEvent = bp.Event("requestCoffeeDarkEvent");\n' +
        'var requestCapuccinoEvent = bp.Event("requestCoffeeCapuccinoEvent");\n' +
        'var finishCofeeEvent = bp.Event("finishCofeeEvent");\n' +
        '\n' +
        '// Global functions and events\n' +
        'bp.registerBThread("blockShower", function () {\n' +
        '    while (true) {\n' +
        '        bsync({waitFor: requestShowerES});\n' +
        '        bsync({waitFor: emptyShowerEvent, block: requestShowerES});\n' +
        '    }\n' +
        '});\n' +
        '\n' +
        'bp.registerBThread("blockCoffee", function () {\n' +
        '    while (true) {\n' +
        '        bsync({waitFor: requestCofeeES});\n' +
        '        bsync({waitFor: finishCofeeEvent, block: requestCofeeES});\n' +
        '    }\n' +
        '});\n';
    return code + statements_persontasks;
};

Blockly.JavaScript['manbehaviour'] = function(block) {
  var dropdown_person_name = block.getFieldValue('person_name');
  var statements_personcode = Blockly.JavaScript.statementToCode(block, 'personCode');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['showertask'] = function(block) {
  var number_cycles = block.getFieldValue('cycles');
  var number_hot_quantity = block.getFieldValue('hot quantity');
  var number_hot_quantity = block.getFieldValue('cold quantity');

  var events =
      'var %NAME%Event = bp.Event("%NAME&Event");\n' +
      'var %NAME%RequestShowerEvent = bp.Event("%NAME%RequestShowerEvent");\n';

  var personRequestShowerBthread =
      'bp.registerBThread("%NAME%RequestShower", function () {\n' +
      '    bsync({waitFor: %NAME%Event});\n' +
      '    bsync({request: %NAME%RequestShowerEvent});\n' +
      '});\n';

    var waitForColdBlockHot = 'bsync({waitFor: coldEvent, block: hotEvent});\n';
    var waitForHotBlockCold = 'bsync({waitFor: hotEvent, block: coldEvent});\n';

    var personShowerAlternator =
        'bp.registerBThread("%NAME%ShowerAlternator", function () {\n' +
        '    bsync({waitFor: %NAME%RequestShowerEvent});\n' +
        `    for (var i = 0; i < ${number_cycles}; i++) {\n`;

    var code = '...;\n';
  return code;
};

Blockly.JavaScript['coffeetask'] = function(block) {
  var dropdown_coffe_type = block.getFieldValue('coffe type');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};