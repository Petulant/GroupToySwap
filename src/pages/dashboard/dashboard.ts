import { Component , ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  activeScreen : number;
  month : string = "All time";
  selectOptions;
  numOfResults : number = 15;
  numOfActiveBids : number = 0;
  numOfClosedBids : number = 0;

  dummyItems = [
    'BLAH BLAH',
    'BLAH BLAH',
    'BLAH BLAH',
    'BLAH BLAH',
    'BLAH BLAH',
    'BLAH BLAH',
    'BLAH BLAH',
    'BLAH BLAH',
    'BLAH BLAH',
    'BLAH BLAH',
    'BLAH BLAH',
    'BLAH BLAH',
    'BLAH BLAH',
    'BLAH BLAH',
    'BLAH BLAH',
    'BLAH BLAH',
  ];

  dispList = [];


  @ViewChild('barCanvas') barCanvas;
 
  barChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectOptions = {
      subTitle: 'choose duration of report',
    };

    console.log(google);
    
  }

  ionViewDidLoad() {
    this.activeScreen = 2;
    //this.drawChart();
    this.dispList = this.dummyItems;

  }

  toggleScreens(x){
    this.activeScreen = x;
    console.log(this.activeScreen);

  }

  onChange(){
    console.log(this.month);
    this.numOfActiveBids = Math.floor((Math.random() * 10) + 1);
    this.numOfClosedBids = Math.floor((Math.random() * 10) + 1);

    this.dispList = [];
    for(let i = 0;  i < this.numOfResults; i++){
      this.dispList.push(this.dummyItems[i]);
      
      
    }
    console.log(this.dispList);
    this.drawChart();
    
  }

  drawChart() {

    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Closed', this.numOfClosedBids],
      ['Active', this.numOfActiveBids],
    ]);

    var options = {
      title: 'Activity for ' + this.month,
      pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);

  }

  home(){
    this.navCtrl.setRoot('FeedPage');
  }

}
