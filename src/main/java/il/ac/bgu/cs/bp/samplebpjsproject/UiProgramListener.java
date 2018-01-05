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
        this.uiHandler.manEntersRoom();
    }

    @Override
    public void started(BProgram bProgram) {
        this.uiHandler.closeDoor();
    }

    @Override
    public void superstepDone(BProgram bProgram) {

    }

    @Override
    public void ended(BProgram bProgram) {
        this.uiHandler.finish();
    }

    @Override
    public void bthreadAdded(BProgram bProgram, BThreadSyncSnapshot bThreadSyncSnapshot) {

    }

    @Override
    public void bthreadRemoved(BProgram bProgram, BThreadSyncSnapshot bThreadSyncSnapshot) {

    }

    @Override
    public void bthreadDone(BProgram bProgram, BThreadSyncSnapshot bThreadSyncSnapshot) {

    }

    @Override
    public void eventSelected(BProgram bProgram, BEvent bEvent) {
        switch(bEvent.getName()){
            case "coldEvent":
                this.uiHandler.dripCold();
                break;
            case "hotEvent":
                this.uiHandler.dripHot();
                break;
        }
    }
}
