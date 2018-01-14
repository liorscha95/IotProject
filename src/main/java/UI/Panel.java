package UI;

import java.awt.Color;
import java.awt.SystemColor;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.HashMap;
import javax.swing.Timer;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import UI.ButtonsEvents;
import il.ac.bgu.cs.bp.bpjs.bprogram.runtimeengine.BProgramRunner;


public class Panel {
	private static HashMap<String, LedLighters> map;
	private static Console showerConsole;
	private static Console coffeeConsole;

	private JFrame frame;
	private BProgramRunner bProgramRunner;
	
	public JFrame getFrame() { return frame; }

	/**
	 * Create the application.
	 */
	public Panel(BProgramRunner bProgramRunner) {
		map = new HashMap<>();
		this.bProgramRunner = bProgramRunner;
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame("Home Panel");
		frame.setBackground(SystemColor.menu);
		frame.getContentPane().setForeground(Color.GRAY);
		frame.getContentPane().setLayout(null);
		frame.setBounds(100, 100, 800, 650);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setLocationRelativeTo(null);
		
		buildSectionnLabels();
		buildSperators();
		buildButtons();
		buildLeds();
		buildCoffeeIcon();
		buildConsoleBoxes();
	}

	private void buildConsoleBoxes() {
		int[] showerPos = {256, 258, 228, 101};
		showerConsole = new Console("Shower", frame);
		showerConsole.buildConsoleBox(showerPos);
		int [] coffeePos = {531, 260, 228, 101};
		coffeeConsole = new Console("Coffee", frame);
		coffeeConsole.buildConsoleBox(coffeePos);
	}

	private void buildCoffeeIcon() {
		JLabel lblNewLabel = new JLabel("");
		lblNewLabel.setIcon(new ImageIcon(getClass().getResource("/coffee.png")));
		lblNewLabel.setBounds(585, 20, 228, 143);
		frame.getContentPane().add(lblNewLabel);
		
		JLabel showerIcon = new JLabel("");
		showerIcon.setIcon(new ImageIcon(getClass().getResource("/shower.png")));
		showerIcon.setBounds(300, 20, 228, 143);
		frame.getContentPane().add(showerIcon);
	}

	private void buildLeds() {
		int[] pos = {249,420,76,72};
		LedLighters HotLed = new LedLighters(frame,"Hot", Color.red);
		HotLed.buildLedLighter(pos);
		map.put("HotLed",HotLed);
		
		int[] pos_1 = {429,420,76,72};
		LedLighters ColdLed = new LedLighters(frame,"Cold",Color.BLUE);
		ColdLed.buildLedLighter(pos_1);
		map.put("ColdLed", ColdLed);
		
		int[] darkPos = {530,420,76,72};
		LedLighters Dakpanel = new LedLighters(frame,"Dark", Color.BLACK);
		Dakpanel.buildLedLighter(darkPos);
		map.put("DarkLed", Dakpanel);
		
		int[] capPos = {600,420,76,72};
		LedLighters CappucinoPanel = new LedLighters(frame,"Cappuccino",new Color(0x99,0x33,0));
		CappucinoPanel.buildLedLighter(capPos);
		map.put("CappuccinoLed", CappucinoPanel);
		
		int[] lattePos = {670,420,76,72};
		LedLighters lattePanel = new LedLighters(frame,"Nescafe", new Color(0x99,0x60,0x10));
		lattePanel.buildLedLighter(lattePos);
		map.put("NescafeLed", lattePanel);
	}

	private void buildSperators() {
		new Seprator(frame).sperate();
	}
	
	private void buildButtons() {
		//Michael button
		int[] MichaelPostion = {10,53,206,77,18};
		JButton btnMichaelEnters = new Buttons(frame).
									addButton("Michael", MichaelPostion);
		btnMichaelEnters.addActionListener(new ButtonsEvents("michaelEvent",this, this.bProgramRunner));
		//Daniel button
		int[] DanielPostion = {10,161,206,77,18};
		JButton Danielbtn = new Buttons(frame).
									addButton("Daniel", DanielPostion);
		Danielbtn.addActionListener(new ButtonsEvents("danielEvent",this, this.bProgramRunner));
		// Ruti button
		int[] RutiPostion = {10,271,206,77,18};
		JButton Rutibtn = new Buttons(frame).
									addButton("Ruti", RutiPostion);
		Rutibtn.addActionListener(new ButtonsEvents("rutiEvent",this, this.bProgramRunner));
		
		int[] emptyPostion = {250,150,250,70,18};
		JButton emptyBtn = new Buttons(frame).
				addButton("Empty Shower", emptyPostion);
		emptyBtn.addActionListener(new ButtonsEvents("endOfShowerEvent",this, this.bProgramRunner));
		
	}
	
	private void buildSectionnLabels() {
		// setting the labels
		int[] MichaelPos = {10,0,150,23};
		new Labels(frame).buildLabel("People Actions :", 16, MichaelPos);
		
		int[] DanielPos = {240, 0, 73, 19};
		new Labels(frame).buildLabel("Shower", 16, DanielPos);
		
		int[] RutiPos = {537,0,89,23};
		new Labels(frame).buildLabel("coffee :)", 16, RutiPos);
		
		int[] showerConPos = {256, 237, 88, 24};
		new Labels(frame).buildLabel("Console:", 11, showerConPos);
		
		int[] coffeeConPos = {531, 242, 99, 14};
		new Labels(frame).buildLabel("Console:", 11, coffeeConPos);
		
		int[] DarkLabel = {557, 487, 57, 14};
		new Labels(frame).buildLabel("Dark", 11, DarkLabel);
		
		int[] CapuccinoLabel = {610, 487, 70, 14};
		new Labels(frame).buildLabel("Cappuccino", 11, CapuccinoLabel);
		
		int[] NescafeLabel = {695, 487, 57, 14};
		new Labels(frame).buildLabel("Nescafe", 11, NescafeLabel);
		
		int[] ColdLabel = {458, 487, 46, 14};
		new Labels(frame).buildLabel("Cold", 11, ColdLabel);
		
		int[] HotLabel = {279, 487, 46, 14};
		new Labels(frame).buildLabel("Hot", 11, HotLabel);
	}
	
	public void invokeLed(String ledName,int secDelay) {
		map.get(ledName).repaint();
		ActionListener taskPerformer = new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				map.get(ledName).repaint();
			}
		  };
		  Timer timer = new Timer(secDelay, taskPerformer);
		  timer.setRepeats(false);
		  timer.start();
	}
	
	public void writeToConsole(String str , String console) {
		switch(console) {
		case "coffeeConsole":
			coffeeConsole.write(str);
			break;
		case "showerConsole":
			showerConsole.write(str);
			break;
		default:
			return;
		}
	}
}
