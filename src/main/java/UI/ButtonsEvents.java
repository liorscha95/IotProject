package UI;

import il.ac.bgu.cs.bp.bpjs.bprogram.runtimeengine.BProgramRunner;
import il.ac.bgu.cs.bp.bpjs.bprogram.runtimeengine.listeners.BProgramRunnerListener;
import il.ac.bgu.cs.bp.bpjs.events.BEvent;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class ButtonsEvents implements ActionListener{
	
	private String eventName;
	private Panel p;
	private BProgramRunner bProgramRunner;
	
	public  ButtonsEvents(String personName, Panel p, BProgramRunner bProgramRunner) {
		this.eventName = personName;
		this.p = p;
		this.bProgramRunner = bProgramRunner;
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		System.out.println("-------" + eventName + " event! -------");
		this.bProgramRunner.getBProgram().enqueueExternalEvent(BEvent.named(eventName));
	}
}
