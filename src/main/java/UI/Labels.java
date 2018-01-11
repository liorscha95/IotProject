package UI;

import java.awt.Font;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.SwingConstants;

public class Labels {
	
	private JFrame frame;
	
	public Labels(JFrame frame) {
		this.frame = frame;
	}
	
	public JLabel buildLabel(String str, int fontSize, int[] pos) {
		JLabel lblPeopleActions = new JLabel(str);
		lblPeopleActions.setFont(new Font("Tahoma", Font.BOLD, fontSize));
		lblPeopleActions.setHorizontalAlignment(SwingConstants.LEFT);
		lblPeopleActions.setBounds(pos[0] , pos[1], pos[2], pos[3]);
		frame.getContentPane().add(lblPeopleActions);
		return lblPeopleActions;
	}

}
