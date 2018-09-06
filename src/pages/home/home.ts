import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController, ToastController  } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  
  //form groups 
  logInForm: FormGroup;
  registerForm : FormGroup;

  //error messages
  validation_messages = {
    'name': [
      { type: 'required', message: 'full names is required.' },
      { type: 'minlength', message: 'name must be at least 5 characters long.' },
      { type: 'maxlength', message: 'name cannot be more than 25 characters long.' }
    ],
    'gender': [
      { type: 'required', message: 'gender is required.' },
      { type: 'minlength', message: 'gender must be at least 5 characters long.' },
      { type: 'maxlength', message: 'gender cannot be more than 25 characters long.' }
    ],
    'email': [
      { type: 'required', message: 'email is required.' },
      { type: 'minlength', message: 'email must be at least 5 characters long.' },
      { type: 'maxlength', message: 'email cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your email must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your email has already been taken.' }
    ],
    'pass': [
      { type: 'required', message: 'Password is required.' }
    ],
    'confirmpass': [
      { type: 'required', message: 'Confirm Password is required.' }
    ],
  }

  //slides
  @ViewChild(Slides) slides: Slides;


  constructor(private alertCtrl: AlertController,public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder) {

    //log in formgroup
    this.logInForm = this.fb.group({
    
      email: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        Validators.required
      ])),
      pass: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
      ]))
    });


     //register formgroup
    
    this.registerForm = this.fb.group({
      name: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.required
      ])),
      surname: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5)])),
      gender: new FormControl('', Validators.compose([
        Validators.required])),
      email: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        Validators.required
      ])),
      pass: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
      ])),
      confirmpass: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
      ]))
    });

  }
  toggle(x) {
    if (x) {
      this.slides.slideTo(1, 300)
    } else {
      this.slides.slideTo(0, 300)
    }
  }

  login(){
    if(this.logInForm.value.email != "" && this.logInForm.value.pass != ""  ){
      firebase.auth().signInWithEmailAndPassword(this.logInForm.value.email,this.logInForm.value.pass).then(user => {
     
        this.navCtrl.setRoot('FeedPage');
  
      });
    }else{
      this.presentToast("complete form");
    }
    
  }

  googleSign(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(user => {
      this.navCtrl.setRoot('FeedPage');
    });
  }


  register() {
    
    if(this.registerForm.value.email != "" && this.registerForm.value.name != "" && this.registerForm.value.gender != ""){
      firebase.auth().createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.pass).then(data => {
        firebase.database().ref('/users/' + (data.user.uid)).set(
          {
            email: this.registerForm.value.email,
            name: this.registerForm.value.name,
            gender: this.registerForm.value.gender
          }
        );
  
        this.navCtrl.setRoot('FeedPage');
  
      }).catch(err => {
        this.presentToast(err.message);
      });
    }else{
      this.presentToast("complete form");
    }
  }

  resetAlert(){
    
    let alert = this.alertCtrl.create({
      title: 'Login',
      subTitle : "Reset Password",
      message : "A reset password link will be sent to your email",
      inputs: [
        {
          name: 'username',
          placeholder: 'e.g user@mail.com',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Reset Password',
          handler: data => {
            if (data.username != null) {
            
              this.resetPassword(data.username);
              
            } else {

              return false;
            }
          }
        }
      ]
    });
    alert.present();
    
  }

  resetPassword(email){
       
    var auth = firebase.auth();

    auth.sendPasswordResetEmail(email).then( res => {
      this.presentToast("Email Sent, check your email");
      
    }).catch( error => {
      this.presentToast(error.message);      
    });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  
}