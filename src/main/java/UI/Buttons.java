package UI;

import java.awt.Font;

import javax.swing.JButton;
import javax.swing.JFrame;

public class Buttons {
	
	private JFrame frame;
	
	public Buttons(JFrame frame) {
		this.frame = frame;
	}
	
	public JButton addButton(String name , int [] postion) {
		JButton btnNewButton = new JButton(name);
		btnNewButton.setFont(new Font("Tahoma", Font.PLAIN, postion[4]));
		btnNewButton.setBounds(postion[0], postion[1], postion[2], postion[3]);
		frame.getContentPane().add(btnNewButton);
		return btnNewButton;
	}
}
