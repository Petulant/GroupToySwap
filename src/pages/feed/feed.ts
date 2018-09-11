import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController  } from 'ionic-angular';
import { BidPage } from "../bid/bid";
import {  UploadPage  } from "../upload/upload";
import { NotificationsPage } from "../notifications/notifications";
declare var firebase;


@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  items = [];
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
      
  }

  ionViewDidLoad() {
    this.items = [];
    firebase.database().ref('/activeBids/').on('value', (snapshot) => {
      this.items = []; 
      snapshot.forEach(snap => {
        this.items.push(snap.val());
        return false;
      });
      this.items.reverse();
    });  
  }

  profile(){
    this.navCtrl.push("ProfilePage");
  }

  bidFor(activeItem){
   
    const modal = this.modalCtrl.create(BidPage, {
      item : activeItem
    });
    modal.present();

  }

  notify(){
    const modal = this.modalCtrl.create(NotificationsPage);
    modal.present();
  }

  doRefresh(refresher){
    console.log(this.items);
    refresher.complete();
  }

  addItem(){
    console.log("called");
    const modal = this.modalCtrl.create(UploadPage);
    modal.present();

  }
}
