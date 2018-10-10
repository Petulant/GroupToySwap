import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Offer } from '../../model/offer';
import { Item } from '../../model/item';
import { User } from '../../model/user';

/**
 * Generated class for the ViewOfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-offer',
  templateUrl: 'view-offer.html',
})
export class ViewOfferPage {

  offerObj: Offer;
  offerItem = [];
  offeritemsFormatted = [];// ngModel bind
  offerItemObj: Item;
  offerOwner: User;
  profilePic;
  ownerName;// ngModel bind
  itemname; // ngModel bind
  itemDescription;// ngModel bind

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.get('item'));

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ViewOfferPage');
    this.offerObj = new Offer(this.navParams.get('item'));
    console.log(this.offerObj);
    this.offerOwner = new User(this.offerObj.getOwner());
    console.log(this.offerOwner);
    this.ownerName = this.offerOwner.getUserName() + " "+ this.offerOwner.getSurname();
    this.profilePic = this.offerOwner.getProfilePic();
    this.offerItem = this.offerObj.getItems();
    console.log(this.offerItem[0]);
    this.offerItemObj = new Item(this.offerItem[0]);
    this.itemname = this.offerItemObj.getName();
    this.itemDescription = this.offerItemObj.getDescription();
    console.log(this.offerItemObj);
    this.offeritemsFormatted = this.offerItemObj.getImageUri();
    console.log(this.offeritemsFormatted);
  }

  close() {
    this.navCtrl.pop();
  }
}
