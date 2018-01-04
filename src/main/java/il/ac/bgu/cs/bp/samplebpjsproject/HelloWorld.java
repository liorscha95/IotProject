package il.ac.bgu.cs.bp.samplebpjsproject;

import il.ac.bgu.cs.bp.bpjs.bprogram.runtimeengine.BProgramRunner;
import il.ac.bgu.cs.bp.bpjs.bprogram.runtimeengine.SingleResourceBProgram;
import il.ac.bgu.cs.bp.bpjs.bprogram.runtimeengine.listeners.InMemoryEventLoggingListener;
import il.ac.bgu.cs.bp.bpjs.bprogram.runtimeengine.listeners.PrintBProgramRunnerListener;
import il.ac.bgu.cs.bp.bpjs.events.BEvent;

/**
 * Simple class running a BPjs program that selects "hello world" events.
 * @author michael
 */
public class HelloWorld {
    
    public static void main(String[] args) throws InterruptedException {
        // This will load the program file  <Project>/src/main/resources/HelloBPjsWorld.js
        BProgramRunner bpr = new BProgramRunner(new SingleResourceBProgram("HotNCold.js"));

        bpr.addListener( new PrintBProgramRunnerListener() );

        new Thread(() -> {
            bpr.getBProgram().enqueueExternalEvent(new BEvent("startShower)"));
        }).start();

        // We don't want the program to stop when there are no more events to trigger.
        // Instead, we want it to wait for external events in theis case.
        bpr.getBProgram().setDaemonMode(true);

        bpr.start();
    }
    
}
