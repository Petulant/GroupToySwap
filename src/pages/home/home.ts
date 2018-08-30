import { Component , ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild(Slides) slides : Slides;
  counter: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  toggle(x){
    if(x){
      this.slides.slideTo(1,300)
    }else{
      this.slides.slideTo(0,300)
    }
  }

  login(){
    this.navCtrl.setRoot("FeedPage");
  }

}
