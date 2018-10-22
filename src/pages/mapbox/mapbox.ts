import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var mapboxgl;
declare var MapboxDirections;

@IonicPage()
@Component({
  selector: 'page-mapbox',
  templateUrl: 'mapbox.html',
})
export class MapboxPage {


  lat = -25.7516976;
  long = 28.2632217;

  constructor(private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
    let watch = this.geolocation.watchPosition();
    watch.subscribe(data => {
    // data can be a set of coordinates, or an error (if an error occurred).
    // data.coords.latitude
      console.log(" data.coords.latitude");
      console.log(data.coords.latitude);
      this.lat = data.coords.latitude;
      
      console.log(" data.coords.longitude");
      console.log(data.coords.longitude);
      this.long = data.coords.longitude;

    }, 
    err => {
      console.log(err);
      
    });

    mapboxgl.accessToken = 'pk.eyJ1IjoiaW9uLWRldnMiLCJhIjoiY2puazR4ajNxMTBheTNwdGF2aTBzb2lidCJ9.0ufGeZk9qOrbp_pPPc0NlA';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [-79.4512,  43.6568],  // starting position [lng, lat]
    zoom: 18 // starting zoom
    });


    
    map.addControl(new MapboxDirections({
      accessToken: mapboxgl.accessToken
  }), 'top-left');

  
    
  }

}
