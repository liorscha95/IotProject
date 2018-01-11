package UI;

import java.awt.Color;

import javax.swing.JFrame;
import javax.swing.JSeparator;
import javax.swing.SwingConstants;

public class Seprator {
	
	private JFrame frame;
	
	public Seprator(JFrame frame) {
		this.frame = frame;
	}
	
	public void sperate() {
		
		// define the people actions sperator
		JSeparator peopleNshower = new JSeparator();
		peopleNshower.setBackground(Color.BLACK);
		peopleNshower.setForeground(Color.BLACK);
		peopleNshower.setOrientation(SwingConstants.VERTICAL);
		peopleNshower.setBounds(232, 0, 1, 611);
		frame.getContentPane().add(peopleNshower);
		
		//define the shower and coffee sperator
		JSeparator coffeeNshower = new JSeparator();
		coffeeNshower.setOrientation(SwingConstants.VERTICAL);
		coffeeNshower.setForeground(Color.BLACK);
		coffeeNshower.setBackground(Color.BLACK);
		coffeeNshower.setBounds(519, 0, 1, 611);
		frame.getContentPane().add(coffeeNshower);
		
	}

}
