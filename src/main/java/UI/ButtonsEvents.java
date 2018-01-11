package UI;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JFrame;

public class ButtonsEvents implements ActionListener{
	
	private String eventName;
	private Panel p;
	
	public  ButtonsEvents(String personName, Panel p) {
		this.eventName = personName;
		this.p = p;
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		System.out.println("-------" + eventName + " event! -------");
		p.invokeLed("HotLed", 3000);
		p.writeToConsole("HIHIHIIHI", "coffeeConsole");
		p.writeToConsole("HIHIHIIHI", "coffeeConsole");
	}
}
