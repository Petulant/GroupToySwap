import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { User } from '../../model/user';
import { ThrowStmt } from '../../../node_modules/@angular/compiler';
declare var firebase;
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email;
  username;
  surname;
  gender;

  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public profile: ProfileProvider) {

    if (profile != null) {
      this.username = this.profile.user.getUserName();
      this.email = this.profile.user.getEmail();
      this.surname = this.profile.user.getUid();
      this.gender = this.profile.user.getGender();

      // if (this.username != "" && this.email != "" && this.gender != "") {
      this.user = new User();
      this.user.setUserName(this.username);
      this.user.setEmail(this.email);
      this.user.setGender(this.gender);
      console.log("user details on profile: " + this.user.getGender() + " email: " + this.user.getEmail() + " username" + this.user.getUserName());
      // } else {
      console.log("one of the user parameters are missing, please make sure that the value exist on the stack");
      // }
      if (this.user != null && this.user instanceof User) {
        console.log("user is instance of user object");
      }

    } else {
      console.log("profile provider object is null, please make sure that the exist on the stack");
    }
  }
  file: File;
  changeListener($event): void {
    this.file = $event.target.files[0];
    console.log(this.file);
    this.saveProfile_click();
  }
  saveProfile_click() {
    console.log("saveProfile_click");
    console.log("uploadProfileImage");
    let fileRef = firebase.storage().ref('profileImages/' + "sdfdsfsdfaf" + ".jpg");
    fileRef.put(this.file).then(function (snapshot) {
      console.log('Uploaded a blob or file!');
    });
    // Add your code here
    // this.afAuth.authState.take(1).subscribe(auth => {
    //   this.afDatabase.object(`profile/${this.uid}`).set(this.profile)
    //     .then(() => {
    //       this.uploadProfileImage();
    //       this.navCtrl.pop();
    // });
    // })
  }
  settings() {

  }
  check() {

  }
}
