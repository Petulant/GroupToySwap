import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Bid } from '../../model/bid';
import { ProfileProvider } from '../../providers/profile/profile';
import { Offer } from '../../model/offer';
import { Item } from '../../model/item';
import { BidManager } from '../../model/bidManager';
declare var firebase
/**
 * Generated class for the BidInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bid-info',
  templateUrl: 'bid-info.html',
})
export class BidInfoPage {

  bidInfo : any;
  bid:Bid;
  offersObjArr = [];
  itemImageUri = {};
  merchandise;
  offerOwner ;
  offerObj;
  // consumedData;
  constructor(public navCtrl: NavController, public navParams: NavParams,public profile: ProfileProvider) {
    console.log(navParams.get('item'));
    this.bidInfo = navParams.get('item');
    this.bid = new Bid(this.bidInfo);
    this.merchandise = new Item(this.bid.getMerchandise());
    this.itemImageUri = this.merchandise.getImageUri();
    console.log(this.merchandise);
    var count = 0;
    var bidFactory = new BidManager();
    var items;
    bidFactory.readBidOffersById(this.bid.getBidId(),function(consumedData){
      console.log(consumedData);
      // this.offersObjArr = consumedData;
      items = [];
      items = consumedData;
    
      console.log(items);
      count++;
      // console.log(this.offersObjArr);
    });
    this.offersObjArr = items;
    this.offerObj = new Offer(items.items);
    console.log(this.offersObjArr[0]);

  }

  close(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad BidInfoPage');
    // firebase.database().ref('/bidOffers/' + this.bid.getBidId()).on('value', (snapshot) => {
      
    //   snapshot.forEach(snap => {
        
    //       console.log(snap.val());
    //       console.log(snap.val().offer);
    //       var bidOffer = new Offer(snap.val().offer);
    //       console.log(bidOffer.getItems());
    //       this.offerObjectsArr.push(bidOffer);
    //       console.log(bidOffer.getItems()[0]);
    //       var offerdItem = new Item(bidOffer.getItems()[0]);
    //       console.log(offerdItem.getDescription());
    //       this.itemImageUri = offerdItem.getImageUri();
    //       console.log(this.itemImageUri);
    //   });
    // });    
  }
}
