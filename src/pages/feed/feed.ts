import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController , LoadingController} from 'ionic-angular';
import { BidPage } from "../bid/bid";
import {  UploadPage  } from "../upload/upload";
import { NotificationsPage } from "../notifications/notifications";
import { Platform } from 'ionic-angular';
declare var firebase;


@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  items = [];
  currentDay;
  date;

  constructor(private platform: Platform, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    
    this.currentDay = Date.now();

  }

  ionViewDidLoad() {

    this.date = new Date();
    let loading = this.loadingCtrl.create({
      content : "Loading please wait",
      spinner : "crescent",
      showBackdrop : false
    });
  
    loading.present();

     firebase.database().ref('/activeBids/').on('value', snapshot => {
      this.items = []; 
      snapshot.forEach(snap => {
        this.items.push(snap.val());
        return false;
      });
      console.log("active");
      console.log(this.items);
      loading.dismiss();
      
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

  search($event){
    console.log($event);
  }
}
