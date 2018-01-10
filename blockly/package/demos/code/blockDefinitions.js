Blockly.Blocks['sethouse'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Set House behaviour");
        this.appendDummyInput()
            .appendField("for the following people: ");
        this.appendStatementInput("PersonTasks")
            .setCheck("PeopleBehaviour");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};


Blockly.Blocks['manbehaviour'] = {
  init: function() {
    this.appendStatementInput("personCode")
        .setCheck(["ShowerTask", "CoffeeTask"])
        .appendField("When")
        .appendField(new Blockly.FieldDropdown([["Michael","michael"], ["Daniel","daniel"], ["Ruti","ruti"]]), "person_name")
        .appendField("Enters");
    this.setPreviousStatement(true, "PeopleBehaviour");
    this.setNextStatement(true, "PeopleBehaviour");
    this.setColour(90);
 this.setTooltip("");
 this.setHelpUrl("");
  }
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
        .appendField(new Blockly.FieldNumber(0, 0, 5), "cold quantity")
        .appendField("times");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "ShowerTask");
    this.setNextStatement(true, "CoffeeTask");
    this.setColour(210);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['coffeetask'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Make")
        .appendField(new Blockly.FieldDropdown([["Dark","Dark"], ["Cappuccino","Cappuccino"], ["Nescafe","Nescafe"]]), "coffe type")
        .appendField("Coffee");
    this.setPreviousStatement(true, "CoffeeTask");
    this.setColour(30);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};