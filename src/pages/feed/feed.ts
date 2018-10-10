import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, ModalController, LoadingController } from 'ionic-angular';
import { BidPage } from "../bid/bid";
import { UploadPage } from "../upload/upload";
import { NotificationsPage } from "../notifications/notifications";
import { Platform } from 'ionic-angular';
import { Bid } from '../../model/bid';
import { User } from '../../model/user';
import { ReportPage } from "../report/report";
import { ProfileProvider } from '../../providers/profile/profile';
declare var firebase;


@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  currentDay;
  date;
  items = [];
  itemsObjArr = [];
  merchandiseObjArr = [];
  imgUrlArr;
  imgObjUri = [];
  uid;
  currentUser;
  testImageArr = [];
  bidItemImgList = [];
  ownerObjArr = [];
  views = [];
  myInput;
  searchResults= [];


  constructor(public toastCtrl: ToastController, private platform: Platform, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams,public userProfile: ProfileProvider) {

    this.currentDay = Date.now();
    if(this.userProfile.user === undefined){
      console.log("user not loaded properly please reload the splash page");
    }else{
      
    }
  }

  ionViewDidLoad() {
    this.retrieveData();
  }

  retrieveData(){

    this.searchResults = [];
    this.date = new Date();
    let loading = this.loadingCtrl.create({
      content: "Loading please wait",
      spinner: "crescent",
      showBackdrop: false
    });

    loading.present();
    var g = 0;
    this.items = [];
    var dummyOwner = [];
    var dummyItemObj = [];

    firebase.database().ref('/placedBids/').on('value', snapshot => {
      this.items = [];
      g = 0;

      snapshot.forEach(snap => {
        if (snap.val() != undefined)  {
          
          this.items.push(snap.val());
          dummyItemObj.push(this.items[g].bid);
          dummyOwner.push(dummyItemObj[g].owner);

          this.itemsObjArr.push(this.items[g].bid);

          this.views.push(this.itemsObjArr[g].views);
          
          this.merchandiseObjArr.push(this.itemsObjArr[g].merchandise);
          this.ownerObjArr.push(this.itemsObjArr[g].owner);
      
          this.imgObjUri.push(this.merchandiseObjArr[g]);

          g++;

        }
        return false;
      });

    
      this.items.reverse();
      this.merchandiseObjArr.reverse();
      this.imgObjUri.reverse();
      this.itemsObjArr.reverse();
      this.ownerObjArr.reverse();
      this.views.reverse();
      loading.dismiss();
    });
  }

  profile() {
    this.navCtrl.push("ProfilePage");
  }

  bidFor(activeItem) {

    const modal = this.modalCtrl.create(BidPage, {
      item: activeItem
    });
    modal.present();

  }

  reportBid(activeItem){
    const modal = this.modalCtrl.create(ReportPage, {
      item: activeItem
    });
    modal.present();
  }
  
  notify() {
    const modal = this.modalCtrl.create(NotificationsPage);
    modal.present();
  }

  doRefresh(refresher) {
    this.retrieveData();
    refresher.complete();
    this.myInput = "";
  }

  addItem() {
    console.log("called");
    const modal = this.modalCtrl.create(UploadPage);
    modal.present();

  }

  search($event) {
        
    this.searchResults = [];

    for(let i = 0 ; i < this.items.length ; i++){
      if(this.items[i].bid.merchandise.type.toLowerCase() == this.myInput.toLowerCase() || this.items[i].bid.merchandise.name.toLowerCase() == this.myInput.toLowerCase() ){
        console.log("item found on index " + i);
        this.searchResults.push(this.items[1]);
      }
    }


    if(this.searchResults.length > 0){
      this.items = this.searchResults;
      
      this.presentToast("Now showing " +  this.myInput);
    }else{
      this.presentToast(this.myInput + " not found"); 
    }

    console.log(this.searchResults.length);
    
    
  }

  onClear($event){

    console.log("cancel");
    this.retrieveData();
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'top',
      showCloseButton : true,
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
