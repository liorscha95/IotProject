# SmartHouseSimulation

## Please keep these:
* This project uses [BPjs](https://github.com/bThink-BGU/BPjs).
* BPjs uses the Mozilla Rhino Javascript engine. See [here](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino) for project page and source code.


## Steps to run our IOT project:

1) Clone the repo from github https://github.com/liorscha95/IotProject

2) In order to view the blockly page that will generate the HotNCold.js code ->open $(root)\blockly\package\demos\code\index.html and click on blocks to see all the blocks.
![alt text](https://github.com/liorscha95/IotProject/blob/master/readmeImages/1.png)

3) Generate your house behaviour by dragging the blocks as you like and filling the blanks:
![alt text](https://github.com/liorscha95/IotProject/blob/master/readmeImages/2.png)


4) After you've generated the blocks click on the Javascript tab to see the generated code. Copy this code to the file $(root)\src\main\resources\HotNCold.js
![alt text](https://github.com/liorscha95/IotProject/blob/master/readmeImages/3.png)


5) Now you can build and run the simulation.

Build the file by running the following command in cmd from the root directory:
mvn clean compile assembly:single

Run the jar created by running from the same folder the command:
java -jar target\SmartHouseSimulation-0.5-DEV-jar-with-dependencies.jar

6)You should see the smart house panel like this:

![alt text](https://github.com/liorscha95/IotProject/blob/master/readmeImages/4.png)

Each button at the People Actions column simulates a different person entering the house. The house will react to the person entering by performing the tasks you've set up in blockly.
For instance, in the example presented above (the blockly picture), When Michael enters the bath will start to fill, for 4 cycles, and with each cycle, fill the bath with hot water 3 times, and cold water 2 times. Also it will produce Dark coffee for Michael. Pay attention, that if another person enters the house when Michael is in the bath, (Before the end bath button was pressed) the bath won't start filling until Michael will end his bath. The same goes for coffee, the Coffee machine won't work until the previous coffee was finished producing.
