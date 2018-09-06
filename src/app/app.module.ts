import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http'; 
import { MyApp } from './app.component';
import { BidPage } from "../pages/bid/bid";
import { NotificationsPage } from "../pages/notifications/notifications";
import { TestProvider } from '../providers/test/test';
import { ProfileProvider } from '../providers/profile/profile';
import { UploadProvider } from '../providers/upload/upload';
@NgModule({
  declarations: [
    MyApp,
    BidPage,
    NotificationsPage
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BidPage,
    NotificationsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TestProvider,
    ProfileProvider,
    UploadProvider,

  ]
})
export class AppModule {}
