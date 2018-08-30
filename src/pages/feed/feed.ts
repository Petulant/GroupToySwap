import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController  } from 'ionic-angular';
import { BidPage } from "../bid/bid";
import { NotificationsPage } from "../notifications/notifications";

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  items = [
    {
      status: "available",
      username : "john doe",
      location : "pta, gezina",
      profileImg : "../../assets/imgs/guy.jpg",
      itemImg : "../../assets/imgs/spinner.jpg",
      itemKey : "ghyt175dd5d5dd",
      toyName : "fidget spinner",
      datePosted : "25/05/2018",
      views : 35,
      description : "In publishing and graphic design, lorem ipsum is common placeholder text used to demonstrate the graphic elements of a document or visual presentation, such as web pages, typography, and graphical layout"
      
    },
    {
      status: "available",
      username : "jane doe",
      location : "jhb, mababoneng",
      profileImg : "../../assets/imgs/girl.png",
      itemImg : "../../assets/imgs/car.jpg",
      itemKey : "shdhdhg55w5w5w",
      toyName : "car model",
      datePosted : "05/07/2018",
      views : 15,
      description : "In publishing and graphic design, lorem ipsum is common placeholder text used to demonstrate the graphic elements of a document or visual presentation, such as web pages, typography, and graphical layout"
      
    }
  ];
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');

    
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
}
