import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
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

  constructor(private platform: Platform, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams,public userProfile: ProfileProvider) {

    this.currentDay = Date.now();
    console.log(this.userProfile.user);
    // this.uid = this.userProfile.user.getUid();
    console.log(this.uid);

    if(this.userProfile.user === undefined){
        console.log("user not loaded properly please reload the splash page");
    }else{
      
    }
    
    

  }

  ionViewDidLoad() {
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
      console.log("in placed bids");
      snapshot.forEach(snap => {
        if (snap.val() != undefined)  {
          
          this.items.push(snap.val());
          console.log(this.items);
          console.log(g);
          console.log(this.items[g].bid);
          dummyItemObj.push(this.items[g].bid);
          dummyOwner.push(dummyItemObj[g].owner);

          console.log(dummyItemObj[g]);
          console.log(dummyOwner[g]);

          this.itemsObjArr.push(this.items[g].bid);
          console.log(this.itemsObjArr[g].bidId);

          this.views.push(this.itemsObjArr[g].views);
          
          // console.log(this.userProfile.user.getUid());
          this.merchandiseObjArr.push(this.itemsObjArr[g].merchandise);
          this.ownerObjArr.push(this.itemsObjArr[g].owner);
          console.log(this.ownerObjArr[g].uid);
          // console.log(this.merchandiseObjArr);
          // this.imgUrlArr.push(this.merchandiseObjArr[g].imageUri);
          // console.log(this.imgUrlArr[g]);
          // this.imgObjUri.push(this.merchandiseObjArr[g]);

          console.log(this.merchandiseObjArr[g].name);
          this.imgObjUri.push(this.merchandiseObjArr[g]);
          console.log(this.imgObjUri[g]);
          console.log(this.imgObjUri[g]);
          // console.log(this.imgObjUri[1].imageUri)S
          // this.testImageArr.push(this.imgObjUri[g].imageUri);
          // console.log(this.testImageArr[0][0]);

          g++;

        }
        // this.items.reverse();
        return false;
      });

      // this.bidItemImgList = [];
      // for (var i = 0; i < this.testImageArr.length; i++) {
      //   this.bidItemImgList = this.testImageArr[i];
      //   console.log(this.bidItemImgList);
      //   console.log(i);
      //   // this.bidItemImgList = this.testImageArr[i];         
      // }
      this.items.reverse();
      this.merchandiseObjArr.reverse();
      this.imgObjUri.reverse();
      this.itemsObjArr.reverse();
      this.ownerObjArr.reverse();
      this.views.reverse();
      console.log(this.itemsObjArr);
      console.log(this.ownerObjArr[0].profilePic);
      loading.dismiss();
      console.log(this.imgObjUri);
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
    console.log(this.items);
    refresher.complete();
  }

  addItem() {
    console.log("called");
    const modal = this.modalCtrl.create(UploadPage);
    modal.present();

  }

  search($event) {
    console.log($event);
  }
}
