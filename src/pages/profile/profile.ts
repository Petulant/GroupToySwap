import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController} from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { User } from '../../model/user';
import {  UploadPage  } from "../upload/upload";
declare var firebase;


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {


  user: User;
  profilePhoto;
  username;
  email;
  gender;
  surname;

  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams, public profile: ProfileProvider) {
    //console.log(this.user);
    
    if (profile != null) {
      this.username = this.profile.user.getUserName();
      this.email = this.profile.user.getEmail();
      this.surname = this.profile.user.getUid();
      this.profilePhoto = this.profile.user.getProfilePic();
      console.log(this.profilePhoto);
      
      // if (this.username != "" && this.email != "" && this.gender != "") {
      this.user = new User();
      this.user.setUserName(this.username);
      this.user.setEmail(this.email);
    
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

  addItem(){
    console.log("called");

    const modal = this.modalCtrl.create(UploadPage);
    modal.present();

  }

  remove(){
    console.log("remove");
    
  }

}
