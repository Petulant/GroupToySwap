import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { User } from '../../model/user';
import { ProfileProvider } from '../../providers/profile/profile';
import { FileChooser } from '@ionic-native/file-chooser';
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

  title : string;
  description : string;
  toyType : string;
  start  : string;
  expire : string;
  pictures = [];
  downloadUrls = [];

  selectOptions : any;
  filePath : any;
  firebaseStorage : any;
  imageUri : any = null;
  details : string;
  uid : any;
  username : any;
  profilePicture : any;
  loading: any;
  
  constructor(public loadingCtrl: LoadingController, private fileChooser: FileChooser, private camera: Camera, public navCtrl: NavController, public navParams: NavParams, public profile: ProfileProvider) {
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
    console.log("view loaded");
    this.pictures = [];
    this.downloadUrls = [];
    
  }

  takePicture(){
    console.log("camera open");
    
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

      this.pictures.push(
        {
          details : this.details,
          uri : this.imageUri
        }
      );
      console.log("new image added");
      console.log(this.pictures);
      
     }, (err) => {
      //this.presentToast(err);
      console.log(err);
     });
    
  }

  uploadImage(){
    
    this.loading = this.loadingCtrl.create({
      content: 'Uploading files, Please wait...'
    });
  
    this.loading.present();

    for(let i = 0 ; i < this.pictures.length; i++){

      console.log("uploading image #" + (i + 1));

      var ref = this.firebaseStorage.ref('pictures/' + this.uid  + '/' + this.pictures[i].details );
      ref.putString(
      this.pictures[i].uri, 'data_url').then(
       
        snapshot => {
          ref.getDownloadURL().then((url) =>{
            this.downloadUrls.push(url);
            
            console.log("url #" + (i +1) + "pushed to array. array size : " + this.downloadUrls.length);
            if(this.pictures.length == this.downloadUrls.length){
              this.saveToDB();
            }
          })
    
        }
      ).catch(
        err => {
          console.log("upload failed");
          console.log(err);
          this.loading.dismiss();
          
        }
      );
      console.log("done uploading image #" + (i + 1));
    }
    
  }

  saveToDB() {
    console.log("save to DB");
    console.log(this.downloadUrls);

    console.log(this.profilePicture);
    
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
        expire : this.expire
      }
    );

    this.loading.dismiss();
    this.navCtrl.pop();
    //console.log(this.downloadUrls);
  }

  openGallery(){
    this.fileChooser.open().then(uri => {

      console.log(uri)
    }).catch(e => {
      console.log(e)
    });
  }

}
