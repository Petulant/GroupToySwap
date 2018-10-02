import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Bid } from '../../model/bid';
import { BidManager } from '../../model/bidManager';
import { ProfileProvider } from '../../providers/profile/profile';
import { User } from '../../model/user';

@IonicPage()
@Component({
  selector: 'page-bid',
  templateUrl: 'bid.html',
})
export class BidPage {

  item : any;
  bid: Bid;
  uid;
  username ;
  imgUrl : String[];
  title ;
  description ;
  toyType;
  itemId;
  status;
  bidderUid;
  duration ;
  bidDate;
  profilePicture ;
  views ;
  bidder: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, profile : ProfileProvider) {
    console.log( navParams.get('item'));
    this.bidder = profile.user;
    this.item = navParams.get('item');
    this.uid = this.item.uid;
    this.username = this.item.username ;
    this.imgUrl = this.item.imgUrl;
    this.title = this.item.title ;
    this.description = this.item.description ;
    this.toyType = this.item.toyType;
    this.itemId = this.item.itemId;
    this.status = this.item.status;
    this.bidderUid = this.item.bidderUid;
    this.duration = this.item.duration ;
    this.bidDate = this.item.bidDate;
    this.profilePicture = this.item.profilePicture ;
    this.views = 0 ;
    
    console.log("----> "+this.views+ ""+ this.username+ ""+this.toyType+ ""+this.status+ ""+this.imgUrl+ ""+ this.description + ""+this.duration)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BidPage');
  }

  cancel(){
    this.navCtrl.pop();
  }
  perfomBid(){
    /*var bidFactory = new BidManager(null);
    bidFactory.perfomBid(this.uid,this.username,this.imgUrl,
      this.title,this.description, this.toyType, this.itemId, 
      this.status,this.bidderUid,this.duration,this.bidDate,
      this.profilePicture,this.views,this.bidder);*/
  }

}