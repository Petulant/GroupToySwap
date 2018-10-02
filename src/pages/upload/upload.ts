import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, LoadingController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { User } from '../../model/user';
import { Crop } from '@ionic-native/crop';
import { ProfileProvider } from '../../providers/profile/profile';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
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
    "Wooden toys",
    "Other"
  ];


  title : string = "";
  description : string = "";
  toyType : string = "";
  start  : string = "";
  expire : string = "";
  pictures = [];
  downloadUrls = [];
  bidDuration : number = 3;

  selectOptions : any;
  firebaseStorage : any;
  imageUri : any = null;
  details : string = null;
  uid : any;
  username : any;
  profilePicture : any;
  loading: any;
  
  constructor(public toastCtrl: ToastController, private file: File, private crop: Crop, public loadingCtrl: LoadingController, private imagePicker: ImagePicker, private camera: Camera, public navCtrl: NavController, public navParams: NavParams, public profile: ProfileProvider) {
    this.selectOptions = {
      subTitle: 'Select a category',
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
       
    let options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum : false,
      cameraDirection : 0,
      targetWidth : 640,
      targetHeight : 640,
      allowEdit : true

    };

    this.camera.getPicture(options).then((imageData) => {
      
      this.imageUri = 'data:image/jpeg;base64,' + imageData;
      this.details =  "img" + Date.now().toString() + ".jpeg";

      

      if(this.pictures.length <= 5){
        this.pictures.push({
          name :this.details,
          uri : this.imageUri
        });
      }else{
        this.presentToast("You can only add 6 images");
      }
      console.log(this.pictures);
      
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
    console.log("fetching urls");
    
    for(let i = 0; i <  this.pictures.length ; i++){

        this.firebaseStorage.ref('/pictures/' + this.uid +  '/' +  this.pictures[i].name + '/').getDownloadURL().then(url => {
        this.downloadUrls.push(url);
        
        console.log("saving url for image " + (1+i));
        
        if(this.downloadUrls.length == this.pictures.length){
          this.saveToDB();
        }
        
      }).catch(error => {
       
        console.log(error);
      });
    }
  }

  saveToDB() {
    console.log("save to db");
    console.log(this.downloadUrls);
    
    this.bidDuration *= 60*60*24*1000;

    this.bidDuration +=  Date.now();
  

    firebase.database().ref('/activeBids/' ).push(
      {
        uid: this.uid,
        username : this.username,
        imgUrl : this.downloadUrls,
        title : this.title,
        description : this.description,
        toyType : this.toyType,
        duration : this.bidDuration,
        profilePicture : this.profilePicture,
        status:"open",
        views : 0,
        itemId: "not specified",
        bidderUid: "not specified",
        bidDate: new Date()
      }
    );

    this.loading.dismiss();
    this.presentToast("Bid posted successfully");
    this.navCtrl.pop();


  }

  remove(x){
    this.pictures.splice(x,1);
    this.presentToast("picture deleted");
  }
  openGallery(){

    let options = {maximumImagesCount: 1, outputType : 0};
    
    this.imagePicker.getPictures(options).then( results => {
      for (var i = 0; i < results.length; i++) {

        this.crop.crop(results[i], {quality: 40, targetWidth : 640, targetHeight : 640})
        .then(
        newImage => {

          let path = newImage.substring(0, newImage.lastIndexOf('/')+1);
          let file = newImage.substring(newImage.lastIndexOf('/') + 1, newImage.lastIndexOf('?'));       
          
          this.file.readAsDataURL(path, file).then(
            uri =>{
              this.imageUri = uri ;
              this.details =  "img" + Date.now().toString() + ".jpeg";
              

              if(this.pictures.length <= 5){
                               
                this.pictures.push(
                  {
                    name :this.details,
                    uri : this.imageUri
                  }
                );
              }else{
                this.presentToast("You can only add 6 images");
              }
            }
          ).catch( error =>{
              console.log(error);
            }
          );
        },
        error => console.error('Error cropping image', error)
        );
      }
    }, err => { console.log(err);
     });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'top',
      showCloseButton : true,
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
