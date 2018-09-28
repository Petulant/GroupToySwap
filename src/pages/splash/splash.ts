import { Component , ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , Slides } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { User } from '../../model/user';

declare var firebase;

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {
  currentUser: User;
  @ViewChild(Slides) slides : Slides;
  
  constructor(public profile : ProfileProvider ,public navCtrl: NavController, public navParams: NavParams) {
    /*
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        // User is signed in.
        console.log("user in");
        
        console.log(user.displayName);
        this.currentUser = new User();
        this.currentUser.setUid(user.uid)
        this.currentUser.setUserName(user.displayName);
        this.currentUser.setEmail(user.email);
        this.currentUser.setProfilePic(user.photoURL);
        this.currentUser.setType("user");

        profile.user = this.currentUser;
        navCtrl.setRoot("FeedPage");
      } else {
        // No user is signed in.
        console.log("user out");
      }
    });

    */
  }

  start(){
    this.navCtrl.setRoot("HomePage");
  }

}
