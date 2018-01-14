package il.ac.bgu.cs.bp.samplebpjsproject;

import UI.Panel;
import il.ac.bgu.cs.bp.bpjs.bprogram.runtimeengine.BProgramRunner;
import il.ac.bgu.cs.bp.bpjs.events.BEvent;

import java.awt.*;

public class UiHandler {
    private BProgramRunner bProgramRunner;
    private Panel panel;

    public UiHandler(BProgramRunner bProgramRunner) {
        this.bProgramRunner = bProgramRunner;
    }

    public void manEntersRoom() {
        // TODO
    }

    public void closeDoor() {
        // TODO
    }

    public void finish() {
        // TODO
    }

    public void dripCold() {
        panel.writeToConsole("Adding one cycle of cold water","showerConsole");
        invokeLedAndInformFinish("ColdLed", "finishColdEvent", 3000);
    }

    public void dripHot() {
        panel.writeToConsole("Adding one cycle of hot water","showerConsole");
        invokeLedAndInformFinish("HotLed", "finishHotEvent", 3000);
    }

    public void pourCoffee(String coffeeType) {
        panel.writeToConsole(coffeeType + " in progress","coffeeConsole");
        invokeLedAndInformFinish(coffeeType + "Led", "finishCoffeeEvent", 10000);
    }

    private void invokeLedAndInformFinish(String ledType, String finishEvent, int millis) {
        new Thread(() -> {
            this.panel.invokeLed(ledType,millis);
            try {
                Thread.sleep(millis);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            if (ledType.contains("Dark") || ledType.contains("Cappuccino") || ledType.contains("Nescafe"))
                panel.writeToConsole("Coffee is ready, have a nice day." , "coffeeConsole");
            this.bProgramRunner.getBProgram().enqueueExternalEvent(BEvent.named(finishEvent));
        }).start();
    }

    public void init() {
        EventQueue.invokeLater(() -> {
            try {
                this.panel = new Panel(this.bProgramRunner);
                panel.getFrame().setVisible(true);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }
}
