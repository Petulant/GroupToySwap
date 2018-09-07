import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

declare var firebase;

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  types = [
    "Action figures",
    "Animals",
    "Cars and radio controlled",
    "Construction toys",
    "Creative toys",
    "Dolls",
    "Educational toys",
    "Electronic toys",
    "	Puzzle/assembly",
    "Games", 
    "Sound toys",
    "Spinning toys",
    "Wooden toys"
  ];

  selectOptions : any;
  filePath : any;

  
  constructor( public navCtrl: NavController, public navParams: NavParams) {
    this.selectOptions = {
      title: 'Categories',
      subTitle: 'Select your category',
    };
  }

  close(){
    this.navCtrl.pop();
  }

  upload(){
  

  }

}
