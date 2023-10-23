import {Players} from './screens/playersScreen.js'
import {Instructions} from './screens/instruction.js'
import { Score } from './screens/score.js';
import { Go } from './screens/go.js';


const app = p5 => {
    let scoreScreen;
    let instructions;
    let playersScreen;
    let go;
    let currentScreen;
    
    p5.setup = function() {
        p5.createCanvas(600, 812);
        go = new Go(p5);
        instructions = new Instructions(p5);
        playersScreen = new Players(p5);
        scoreScreen = new Score(p5);
        currentScreen = go; 
      
    }
    
    p5.draw = function() {
      p5.background(0);
      currentScreen.show(p5);
     
        
    }
  
  
  }
  
  new p5(app);
  
  
    
  
  