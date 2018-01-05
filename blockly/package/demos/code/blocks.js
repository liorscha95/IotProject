Blockly.Blocks['hello_world'] = {
    init: function() {
        this.appendValueInput("a")
            .setCheck(null);
        this.appendValueInput("b")
            .setCheck(null)
            .appendField("+")
            .appendField("Ofir");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(345);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['hello_world'] = function(block) {
    var value_a = Blockly.JavaScript.valueToCode(block, 'a', Blockly.JavaScript.ORDER_ATOMIC);
    var value_b = Blockly.JavaScript.valueToCode(block, 'b', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var c = value_b + value_a;
    var code = 'console.log(\'a + b\' is , c)';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};
