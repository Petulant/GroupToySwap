import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Bid } from '../../model/bid';

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
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bidInfo = navParams.get('item');
    this.bid = new Bid(this.bidInfo);

  }

  close(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BidInfoPage');
    //console.log(this.bid.get;

    
  }

}
