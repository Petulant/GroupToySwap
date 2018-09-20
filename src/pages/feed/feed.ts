import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController , LoadingController} from 'ionic-angular';
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
  currentDay;

  constructor(public loadingCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    
    //this.bidDuration *= 86400000;
    this.currentDay = Date.now();
    console.log(this.currentDay);
    
    
  }

  ionViewDidLoad() {

       
    let loading = this.loadingCtrl.create({
      content : "Loading please wait",
      spinner : "crescent",
      showBackdrop : false
    });
  
    loading.present();
    
    this.items = [];
    firebase.database().ref('/activeBids/').on('value', snapshot => {
      this.items = []; 
      snapshot.forEach(snap => {
        this.items.push(snap.val());
        return false;
      });
      console.log(this.items);
      
      this.items.reverse();
      loading.dismiss();
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
