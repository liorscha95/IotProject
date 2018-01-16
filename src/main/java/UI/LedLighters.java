package UI;

import java.awt.Color;
import java.awt.Graphics;

import javax.swing.JComponent;
import javax.swing.JFrame;

public class LedLighters extends JComponent {
	
	private JFrame frame;
	private String name;
	private Color color;
	private boolean active;

	public LedLighters (JFrame frame, String name, Color color) {
		super();
		this.frame = frame;
		this.name = name;
		this.color = color;
		this.active = true;
	}
	
	public void paint(Graphics g) {
		g.setColor(color);
		if(active) 
			TurnOff(g);
		else
			TurnOn(g);
		active = (active) ? false : true;
	}
	
	public void TurnOff(Graphics g) {
		g.drawOval(10, 0, 60, 60);
	}
	
	public void TurnOn(Graphics g) {
		g.fillOval(10, 0, 60, 60);
	}
	
	public void buildLedLighter(int[] pos) {
		setBounds(pos[0], pos[1], pos[2], pos[3]);
		frame.getContentPane().add(this);
	}
}
