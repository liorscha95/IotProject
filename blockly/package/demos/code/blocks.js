Blockly.Blocks['setpeople'] = {
    init: function() {
        this.appendValueInput("PeopleCode")
            .setCheck("PeopleBehaviour")
            .appendField("Set House For:");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['setpeople'] = function(block) {
    var value_peoplecode = Blockly.JavaScript.valueToCode(block, 'PeopleCode', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'bla';
    return code;
};


Blockly.Blocks['manbehaviour'] = {
    init: function() {
        this.appendStatementInput("NAME")
            .setCheck(null)
            .appendField("When")
            .appendField(new Blockly.FieldDropdown([["Michael","michael"], ["Danniel","Daniel"], ["Ruti","OPTIONNAME"]]), "person_name")
            .appendField("Enters");
        this.setOutput(true, "PeopleBehaviour");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['manbehaviour'] = function(block) {
    var dropdown_person_name = block.getFieldValue('person_name');
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};