import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController, ToastController  } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { User } from '../../model/user';
import { ProfileProvider } from '../../providers/profile/profile';
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  user:User;
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
  };
  selectOptions;

  //slides
  @ViewChild(Slides) slides: Slides;


  constructor(private alertCtrl: AlertController,public toastCtrl: ToastController, 
    public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder,
    public profile: ProfileProvider) {

    //select options
    this.selectOptions = {
      subTitle: 'Choose Gender',
    };
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
    
    firebase.auth().signInWithEmailAndPassword(this.logInForm.value.email,this.logInForm.value.pass).then(user => {
     
      this.instatiateUserObj(firebase.auth().currentUser.uid);

    }).catch( err =>{
      console.log(err);
      
    });
  }

  googleSign(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(user => {

      var currentUser = new User();
      currentUser.setUserName(user.user.displayName);
      currentUser.setEmail(user.user.email);
      currentUser.setProfilePic( user.user.photoURL);
      this.profile.user = currentUser;

      this.navCtrl.setRoot('FeedPage');
      
    }).catch( err =>{
      console.log(err);
      
    });
  }

  facebookSign(){
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(user => {
      this.navCtrl.setRoot('FeedPage');
    }).catch( err =>{
      console.log(err); 
    });
  }

  register() {
    
    var user: User;
    user = new User();

    user.setUserName(this.registerForm.value.name);
    user.setGender(this.registerForm.value.gender);
    user.setEmail(this.registerForm.value.email);

    firebase.auth().createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.pass).then(data => {
      user.setUid(data.user.uid);
      firebase.database().ref('/users/' + (data.user.uid)).set(user);
      this.navCtrl.setRoot('FeedPage');
    }).catch(err => {
      this.presentToast(err.message);
    });
  }


  instatiateUserObj(key){

    firebase.database().ref('/users/'+ key).on('value', userSnapshot => {
      this.user = new User();
      this.user.setUid(key);
      this.user.setEmail(userSnapshot.val()[Object.keys(userSnapshot.val())[0]]);
      this.user.setGender(userSnapshot.val()[Object.keys(userSnapshot.val())[1]]);
      this.user.setUserName(userSnapshot.val()[Object.keys(userSnapshot.val())[2]]);  

      var t = Object.keys(userSnapshot.val())[0];
      var type = userSnapshot.val()[t];
     
      this.profile.user = this.user;
      this.navCtrl.setRoot('FeedPage');
    });
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
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  showPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Login',
      subTitle : "Reset Password",
      message : "A link to reset your password will be sent to your email",
      inputs: [
        {
          name: 'email',
          placeholder: 'e.g user@mail.com',
          type : "email"
        }
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
          text: 'Reset',
          handler: data => {
            this.resetPassword(data.email);            
          }
        }
      ]
    });
    alert.present();
  }
}
  
