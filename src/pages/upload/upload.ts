import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
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
  
  constructor(private fileChooser: FileChooser, private camera: Camera, public navCtrl: NavController, public navParams: NavParams, public profile: ProfileProvider) {
    this.selectOptions = {
      title: 'Categories',
      subTitle: 'Select your category',
    };
    this.firebaseStorage = firebase.storage();
    console.log(this.pictures);
    
  }

  close(){
    this.navCtrl.pop();
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
      correctOrientation : true
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
    let user = this.profile.user;
    //user.getUid()
    
    for(let i = 0 ; i < this.pictures.length; i++){
      console.log("uploading image #" + (i + 1));
      var ref = this.firebaseStorage.ref('pictures/' + user.getUid() + '/' + this.pictures[i].details );
      ref.putString(
      this.pictures[i].uri, 'data_url').then(
       
        snapshot => {
          ref.getDownloadURL().then((url) =>{
            console.log(url);
            this.downloadUrls.push(url);
            //this.saveToDB(url);
          })
          console.log("upload done");
          console.log(snapshot);
          
          //this.presentToast("picture saved to storage");
        }
      ).catch(
        err => {
          console.log("upload failed");
          console.log(err);
          
        }
      );
      console.log("done uploading image #" + (i + 1));
    }
    this.saveToDB();
  }

  saveToDB() {
    console.log("save to DB");
    
    let user = this.profile.user;
    console.log(user.getUid());
    console.log(this.downloadUrls);
    
    
    firebase.database().ref('/activeBids/' + user.getUid() ).push(
      {
        imgUrl : this.downloadUrls,
        title : this.title,
        description : this.description,
        toyType : this.toyType,
        start : this.start,
        expire : this.expire
      }
    );
    
  }

  openGallery(){
    this.fileChooser.open().then(uri => {


      console.log(uri)
    }).catch(e => {
      console.log(e)
    });
  }

}
