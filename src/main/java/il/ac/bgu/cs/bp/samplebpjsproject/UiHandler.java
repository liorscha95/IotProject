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
        invokeLedAndInformFinish("ColdLed", "finishColdEvent", 3000);
    }

    public void dripHot() {
        invokeLedAndInformFinish("HotLed", "finishHotEvent", 3000);
    }

    public void pourCoffee(String coffeeType) {
        invokeLedAndInformFinish(coffeeType + "Led", "finishCoffeeEvent", 10000);
    }

    private void invokeLedAndInformFinish(String ledType, String finishEvent, int millis) {
        new Thread(() -> {
            this.panel.invokeLed(ledType, 3000);
            try {
                Thread.sleep(millis);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
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
