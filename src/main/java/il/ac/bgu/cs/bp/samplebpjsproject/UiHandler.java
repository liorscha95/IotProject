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

    public void dripCold() {
        invokeLedAndInformFinish("ColdLed", "finishColdEvent", 3000, null);
    }

    public void dripHot() {
        invokeLedAndInformFinish("HotLed", "finishHotEvent", 3000, null);
    }

    public void pourCoffee(String coffeeType) {
        panel.writeToConsole(coffeeType + " in progress", "coffeeConsole");
        Runnable printAtFinish = () -> {
            panel.writeToConsole(coffeeType + " Is Ready!", "coffeeConsole");
        };
        invokeLedAndInformFinish(coffeeType + "Led", "finishCoffeeEvent", 8000, printAtFinish);
    }

    private void invokeLedAndInformFinish(String ledType, String finishEvent, int millis, Runnable atFinishCallback) {
        new Thread(() -> {
            this.panel.invokeLed(ledType, millis);
            try {
                Thread.sleep(millis + 500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            if (atFinishCallback != null) {
                atFinishCallback.run();
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

    public void printToConsole(String consoleName, String printedValue) {
        panel.writeToConsole(printedValue, consoleName);
    }

    public void clearConsole(String console) {
        panel.clearConsole(console);
    }
}
