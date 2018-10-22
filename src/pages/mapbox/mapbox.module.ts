import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapboxPage } from './mapbox';

@NgModule({
  declarations: [
    MapboxPage,
  ],
  imports: [
    IonicPageModule.forChild(MapboxPage),
  ],
})
export class MapboxPageModule {}
