package UI;

import java.awt.Font;

import javax.swing.JFrame;
import javax.swing.JTextArea;

public class Console extends JTextArea {
	
	private JFrame frame;
	private String consoleName;
	
	public Console(String consoleName, JFrame frame) {
		super();
		this.frame = frame;
		this.consoleName = consoleName;
	}
	
	public void buildConsoleBox(int[] pos) {
		this.setFont(new Font("Courier New", Font.PLAIN, 12));
		this.setText(consoleName + " events to string\n");
		this.setEditable(false);
		this.setBounds(pos[0],pos[1],pos[2],pos[3]);
		frame.getContentPane().add(this);
	}

	public void write(String str) {
		String content = this.getText();
		int count = 0;
		for(int i = 0 ; i < content.length(); ++i ) {
			if(content.charAt(i) == '\n')
				++count;
		}
		if (count == 7) {
			this.setText("");
		}
		this.append(str + "\n");
	}
}
