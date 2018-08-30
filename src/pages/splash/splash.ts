import { Component , ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  @ViewChild(Slides) slides : Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  start(){
    this.navCtrl.setRoot("HomePage");
  }

}
