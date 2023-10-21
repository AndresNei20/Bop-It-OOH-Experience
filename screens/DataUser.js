export class DataUser {
    
    constructor(p5) {
        this.p5 = p5;
        this.logo = this.p5.loadImage('img/logo.png');
        this.back = this.p5.loadImage('img/back.png');
        this.yellowCircle = this.p5.loadImage('img/yellow_circle.png');
        this.violetCircle = this.p5.loadImage('img/violet_circle.png');
        this.blueCircle = this.p5.loadImage('img/blue_circle.png');
        this.yellowTriangle = this.p5.loadImage('img/yellow_triangle.png');
        
        this.nameInput = this.p5.createInput('');
        this.nameInput.position(120, 400);
        this.nameInput.size(200);


    
        this.birthdayInput = this.p5.createInput('');
        this.birthdayInput.position(120, 500);
        this.birthdayInput.size(200);

    
        this.emailInput = this.p5.createInput('');
        this.emailInput.position(120, 600);
        this.emailInput.size(200);


        this.submitButton = this.p5.createButton('Enviar');
        this.submitButton.position(190, 700);
        this.submitButton.mousePressed(this.submitFormData.bind(this));
        this.hideInput();
  
  
    }

    hideInput(){
        this.nameInput.hide();
        this.birthdayInput.hide();
        this.emailInput.hide();
        this.submitButton.hide();
      }

      showInput(){
        this.nameInput.show();
        this.birthdayInput.show();
        this.emailInput.show();
        this.submitButton.show();
      }
  
    show(p5) {
      p5.background('black');
      p5.image(this.back, -120, 200);
      p5.image(this.logo, 40, 100);
      p5.image(this.yellowCircle, 0, 0);
      p5.image(this.violetCircle, 320, 500);
      p5.image(this.blueCircle, 0, 400);
      p5.image(this.yellowTriangle, 320, 30);
      //p5.image(this.arrow, 140, 500);
      //p5.image(this.playButton, 110, 700);
      p5.textSize(20);
      p5.fill(250);

      p5.text('Nombre', 120, 380);
      p5.text('Birthday', 120,480);
      p5.text('Email', 120,580 );

  

    
  }

  setSubmitCallback(callback) {
    this.submitCallback = callback;
}

  submitFormData() {
      const formUserData = {
          name: this.nameInput.value(),
          birthday: this.birthdayInput.value(),
          email: this.emailInput.value(),
          score: 0
      };

      for(let key in formUserData) {
        if (typeof formUserData[key] === "string" && !formUserData[key].trim()) {
            console.error('Todos los campos deben estar llenos.');
            return; 
        }
    }

      console.log(formUserData);

      if (this.submitCallback) {
          this.submitCallback(formUserData);
      }
  }


  mousePressed(){

  }

  }