import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { User } from '../../model/user';
import { ProfileProvider } from '../../providers/profile/profile';
import { ImagePicker } from '@ionic-native/image-picker';
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
    "Puzzle/assembly",
    "Games", 
    "Sound toys",
    "Spinning toys",
    "Wooden toys"
  ];

  title : string = "";
  description : string = "";
  toyType : string = "";
  start  : string = "";
  expire : string = "";
  pictures = [];
  downloadUrls = [];

  selectOptions : any;
  firebaseStorage : any;
  imageUri : any = null;
  details : string = null;
  uid : any;
  username : any;
  profilePicture : any;
  loading: any;
  
  constructor(public loadingCtrl: LoadingController, private imagePicker: ImagePicker, private camera: Camera, public navCtrl: NavController, public navParams: NavParams, public profile: ProfileProvider) {
    this.selectOptions = {
      title: 'Categories',
      subTitle: 'Select your category',
    };
    this.firebaseStorage = firebase.storage();

    let user = this.profile.user;
    this.uid = user.getUid()
    this.username = user.getUserName();
    this.profilePicture = user.getProfilePic();
  
  }

  close(){
    this.navCtrl.pop();
  }

  ionViewDidLoad(){

    this.pictures = [];
    this.downloadUrls = [];
    
  }

  takePicture(){
       
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum : true,
      cameraDirection : 0,
      targetWidth : 640,
      targetHeight : 640
    };

    this.camera.getPicture(options).then((imageData) => {
      
      this.imageUri = 'data:image/jpeg;base64,' + imageData;
      this.details =  "img" + Date.now().toString() + ".jpeg";

      this.pictures.push({
        name :this.details,
        uri : this.imageUri
      });
      
     }, (err) => {
      
      console.log(err);
     });
    
  }


  uploadImage(){
    
    let counter = 0;
    this.loading = this.loadingCtrl.create({
      content: 'Uploading files, Please wait...'
    });
  
    this.loading.present();

    for(let i = 0 ; i < this.pictures.length; i++){

      var ref = this.firebaseStorage.ref('pictures/' + this.uid  + '/' + this.pictures[i].name );
      ref.putString(
      this.pictures[i].uri, 'data_url').then(
        resp =>{
          counter++;

          if(counter == this.pictures.length){
            this.getUrls();
          }
        }
      ).catch(
        err => {

          this.loading.dismiss();
        }
      );
    }
    
  }

  getUrls(){

    for(let i = 0; i <  this.pictures.length ; i++){

        this.firebaseStorage.ref('/pictures/' + this.uid +  '/' +  this.pictures[i].name + '/').getDownloadURL().then(url => {
        this.downloadUrls.push(url);

        if(this.downloadUrls.length == this.pictures.length){
          this.saveToDB();
        }
        
      }).catch(error => {
       
        console.log(error);
      });
    }
  }

  saveToDB() {
    
    firebase.database().ref('/activeBids/' ).push(
      {
        uid: this.uid,
        username : this.username,
        imgUrl : this.downloadUrls,
        title : this.title,
        description : this.description,
        toyType : this.toyType,
        start : this.start,
        profilePicture : this.profilePicture,
        expire : this.expire,
        views : 0
      }
    );

    this.loading.dismiss();
    this.navCtrl.pop();

  }

  openGallery(){

    let options = {maximumImagesCount: 1, outputType : 1, quality : 50};
    
    this.imagePicker.getPictures(options).then( results => {
      for (var i = 0; i < results.length; i++) {

          this.imageUri = 'data:image/jpeg;base64,' + results[i];
          this.details =  "img" + Date.now().toString() + ".jpeg";

          
          this.pictures.push(
            {
              name :this.details,
              uri : this.imageUri
            }
          );

          
      }
    }, err => { console.log(err);
     });
  }

}
