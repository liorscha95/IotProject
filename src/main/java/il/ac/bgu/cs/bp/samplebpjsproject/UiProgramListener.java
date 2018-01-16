package il.ac.bgu.cs.bp.samplebpjsproject;

import il.ac.bgu.cs.bp.bpjs.bprogram.runtimeengine.BProgram;
import il.ac.bgu.cs.bp.bpjs.bprogram.runtimeengine.BThreadSyncSnapshot;
import il.ac.bgu.cs.bp.bpjs.bprogram.runtimeengine.listeners.BProgramRunnerListener;
import il.ac.bgu.cs.bp.bpjs.events.BEvent;

public class UiProgramListener implements BProgramRunnerListener {
    private final UiHandler uiHandler;

    public UiProgramListener(UiHandler handler) {
        this.uiHandler = handler;
    }

    @Override
    public void starting(BProgram bProgram) {
    }

    @Override
    public void started(BProgram bProgram) {
    }

    @Override
    public void superstepDone(BProgram bProgram) {

    }

    @Override
    public void ended(BProgram bProgram) {
    }

    @Override
    public void bthreadAdded(BProgram bProgram, BThreadSyncSnapshot bThreadSyncSnapshot) {

    }

    @Override
    public void bthreadRemoved(BProgram bProgram, BThreadSyncSnapshot bThreadSyncSnapshot) {

    }

    @Override
    public void bthreadDone(BProgram bProgram, BThreadSyncSnapshot bThreadSyncSnapshot) {
        String bthreadName = bThreadSyncSnapshot.getName();
        int hotShowerIndex = bthreadName.indexOf("HotShower");
        if(hotShowerIndex >= 0){
            String toPrint = bthreadName.substring(0, hotShowerIndex) + "'s bath is filled!";
            this.uiHandler.printToConsole("showerConsole", toPrint);
        }
    }

    @Override
    public void eventSelected(BProgram bProgram, BEvent bEvent) {
        String eventName = bEvent.getName();
        switch (eventName) {
            case "coldEvent":
                this.uiHandler.dripCold();
                break;
            case "hotEvent":
                this.uiHandler.dripHot();
                break;
            case "requestCoffeeDarkEvent":
                this.uiHandler.pourCoffee("Dark");
                break;
            case "requestCoffeeCappuccinoEvent":
                this.uiHandler.pourCoffee("Cappuccino");
                break;
            case "requestCoffeeNescafeEvent":
                this.uiHandler.pourCoffee("Nescafe");
                break;
            default:
                int requestShowerIndex = eventName.indexOf("RequestShower");
                if (requestShowerIndex >= 0) {
                    this.uiHandler.clearConsole("showerConsole");
                    String toPrint = "Filling bath for " + eventName.substring(0, requestShowerIndex);
                    this.uiHandler.printToConsole("showerConsole", toPrint);
                }
        }
    }
}
