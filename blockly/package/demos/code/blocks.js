Blockly.Blocks['sethouse'] = {
    init: function () {
        this.appendStatementInput("PersonTasks")
            .setCheck("PeopleBehaviour")
            .appendField("Set House For: ");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['sethouse'] = function (block) {
    var statements_persontasks = Blockly.JavaScript.statementToCode(block, 'PersonTasks');
    // TODO: Assemble JavaScript into code variable.
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
        'bp.registerBThread("blockCofee", function () {\n' +
        '    while (true) {\n' +
        '        bsync({waitFor: requestCofeeES});\n' +
        '        bsync({waitFor: finishCofeeEvent, block: requestCofeeES});\n' +
        '    }\n' +
        '});\n';
    return code + statements_persontasks;
}

Blockly.Blocks['manbehaviour'] = {
    init: function() {
        this.appendStatementInput("personCode")
            .setCheck(["ShowerTask", "CofeeTask"])
            .appendField("When")
            .appendField(new Blockly.FieldDropdown([["Michael","michael"], ["Danniel","Daniel"], ["Ruti","OPTIONNAME"]]), "person_name")
            .appendField("Enters");
        this.setPreviousStatement(true, "PeopleBehaviour");
        this.setNextStatement(true, "PeopleBehaviour");
        this.setColour(90);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
    Blockly.JavaScript['manbehaviour'] = function(block) {
        var dropdown_person_name = block.getFieldValue('person_name');
        var statements_personcode = Blockly.JavaScript.statementToCode(block, 'personCode');
        // TODO: Assemble JavaScript into code variable.
        var code = '...;\n';
        return code;
    };


Blockly.Blocks['showertask'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Fill the tub with");
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(0, 0, 10), "cycles")
            .appendField("Cycles of water.");
        this.appendDummyInput()
            .appendField("In each cycle, ");
        this.appendDummyInput()
            .appendField("Pour hot water")
            .appendField(new Blockly.FieldNumber(0, 0, 5), "hot quantity")
            .appendField("times,");
        this.appendDummyInput()
            .appendField("And cold water")
            .appendField(new Blockly.FieldNumber(0, 0, 5), "hot quantity")
            .appendField("times");
        this.setInputsInline(false);
        this.setPreviousStatement(true, "ShowerTask");
        this.setNextStatement(true, "CoffeeTask");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
    Blockly.JavaScript['showertask'] = function(block) {
        var number_cycles = block.getFieldValue('cycles');
        var number_hot_quantity = block.getFieldValue('hot quantity');
        var number_hot_quantity = block.getFieldValue('hot quantity');
        // TODO: Assemble JavaScript into code variable.
        var code = '...;\n';
        return code;
    };

