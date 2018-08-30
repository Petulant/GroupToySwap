import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-bid',
  templateUrl: 'bid.html',
})
export class BidPage {

  item : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log( navParams.get('item'));
    this.item = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BidPage');
  }

  cancel(){
    this.navCtrl.pop();
  }

}
