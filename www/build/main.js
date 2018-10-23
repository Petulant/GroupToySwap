webpackJsonp([13],{

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_crop__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_profile_profile__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_bidManager__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__model_bid__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_item__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var UploadPage = /** @class */ (function () {
    function UploadPage(toastCtrl, file, crop, loadingCtrl, imagePicker, camera, navCtrl, navParams, profile) {
        this.toastCtrl = toastCtrl;
        this.file = file;
        this.crop = crop;
        this.loadingCtrl = loadingCtrl;
        this.imagePicker = imagePicker;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.profile = profile;
        this.types = [
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
        this.title = "";
        this.description = "";
        this.toyType = "";
        this.start = "";
        this.expire = "";
        this.pictures = [];
        this.downloadUrls = [];
        this.bidDuration = 3;
        this.imageUri = null;
        this.details = null;
        this.selectOptions = {
            subTitle: 'Select a category',
        };
        this.firebaseStorage = firebase.storage();
        var user = this.profile.user;
        this.uid = user.getUid();
        this.username = user.getUserName();
        this.profilePicture = user.getProfilePic();
    }
    UploadPage.prototype.close = function () {
        this.navCtrl.pop();
    };
    UploadPage.prototype.ionViewDidLoad = function () {
        this.pictures = [];
        this.downloadUrls = [];
    };
    UploadPage.prototype.takePicture = function () {
        var _this = this;
        var options = {
            quality: 25,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: false,
            cameraDirection: 0,
            targetWidth: 640,
            targetHeight: 640,
            allowEdit: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageUri = 'data:image/jpeg;base64,' + imageData;
            _this.details = "img" + Date.now().toString() + ".jpeg";
            _this.loading = _this.loadingCtrl.create({
                content: 'Optimizing image. please wait...'
            });
            _this.loading.present();
            if (_this.pictures.length <= 5) {
                _this.pictures.push({
                    name: _this.details,
                    uri: _this.imageUri
                });
                _this.loading.dismiss();
            }
            else {
                _this.presentToast("You can only add 6 images");
                _this.loading.dismiss();
            }
            console.log(_this.pictures);
        }, function (err) {
            console.log(err);
            _this.loading.dismiss();
        });
    };
    UploadPage.prototype.uploadImage = function () {
        var _this = this;
        var counter = 0;
        this.loading = this.loadingCtrl.create({
            content: 'Uploading files, Please wait...'
        });
        this.loading.present();
        for (var i = 0; i < this.pictures.length; i++) {
            var ref = this.firebaseStorage.ref('pictures/' + this.uid + '/' + this.pictures[i].name);
            ref.putString(this.pictures[i].uri, 'data_url').then(function (resp) {
                counter++;
                if (counter == _this.pictures.length) {
                    _this.getUrls();
                }
            }).catch(function (err) {
                _this.loading.dismiss();
            });
        }
    };
    UploadPage.prototype.getUrls = function () {
        var _this = this;
        console.log("fetching urls");
        var _loop_1 = function (i) {
            this_1.firebaseStorage.ref('/pictures/' + this_1.uid + '/' + this_1.pictures[i].name + '/').getDownloadURL().then(function (url) {
                _this.downloadUrls.push(url);
                console.log("saving url for image " + (1 + i));
                if (_this.downloadUrls.length == _this.pictures.length) {
                    _this.saveToDB();
                }
            }).catch(function (error) {
                console.log(error);
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.pictures.length; i++) {
            _loop_1(i);
        }
    };
    UploadPage.prototype.saveToDB = function () {
        console.log("on save to db");
        this.bidDuration *= 60 * 60 * 24 * 1000;
        this.bidDuration += Date.now();
        var itemObj = new __WEBPACK_IMPORTED_MODULE_9__model_item__["a" /* Item */](null);
        var bid = new __WEBPACK_IMPORTED_MODULE_8__model_bid__["a" /* Bid */](null);
        itemObj.setImageUri(this.downloadUrls);
        itemObj.setName(this.title);
        itemObj.setType(this.toyType);
        itemObj.setItemId("not specified");
        itemObj.setDescription(this.description);
        bid = new __WEBPACK_IMPORTED_MODULE_8__model_bid__["a" /* Bid */](null);
        bid.setOwner(this.profile.user);
        bid.setBidDate(Date.now());
        bid.setBidDuration(this.bidDuration);
        bid.setMerchandise(itemObj);
        bid.setViews(0);
        bid.setStatus("open");
        bid.setBidder(null);
        bid.setMerchandise(itemObj);
        console.log(bid);
        var bidFactory = new __WEBPACK_IMPORTED_MODULE_7__model_bidManager__["a" /* BidManager */]();
        bidFactory.writePlacedBid(bid);
        bidFactory.writeUserBid(bid);
        console.log("save db wrote data");
        this.loading.dismiss();
        this.navCtrl.setRoot('FeedPage');
    };
    UploadPage.prototype.remove = function (x) {
        this.pictures.splice(x, 1);
        this.presentToast("picture deleted");
    };
    UploadPage.prototype.openGallery = function () {
        var _this = this;
        var options = { maximumImagesCount: 1, outputType: 0 };
        this.imagePicker.getPictures(options).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                _this.crop.crop(results[i], { quality: 25, targetWidth: 640, targetHeight: 640 })
                    .then(function (newImage) {
                    console.log('new image path is: ' + newImage);
                    var path = newImage.substring(0, newImage.lastIndexOf('/') + 1);
                    var file = newImage.substring(newImage.lastIndexOf('/') + 1, newImage.lastIndexOf('?'));
                    console.log(path);
                    console.log(file);
                    _this.loading = _this.loadingCtrl.create({
                        content: 'Optimizing image. please wait...'
                    });
                    _this.loading.present();
                    _this.file.readAsDataURL(path, file).then(function (uri) {
                        _this.imageUri = uri;
                        _this.details = "img" + Date.now().toString() + ".jpeg";
                        if (_this.pictures.length <= 5) {
                            _this.pictures.push({
                                name: _this.details,
                                uri: _this.imageUri
                            });
                            _this.loading.dismiss();
                        }
                        else {
                            _this.presentToast("You can only add 6 images");
                            _this.loading.dismiss();
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }, function (error) { return console.error('Error cropping image', error); });
            }
        }, function (err) {
            console.log(err);
        });
    };
    UploadPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 4000,
            position: 'top',
            showCloseButton: true,
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    UploadPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-upload',template:/*ion-inline-start:"C:\Users\PC\Desktop\toySwap\src\pages\upload\upload.html"*/'<ion-header>\n\n	<ion-navbar>\n\n		<ion-row>\n\n			<button clear icon-only ion-button (click)="close();">\n\n				<ion-icon name="close"></ion-icon>\n\n			</button>\n\n			<ion-title>Post Item</ion-title>\n\n		</ion-row>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n	<ion-list>\n\n		<ion-item class="clear">\n\n			<ion-label floating>Title</ion-label>\n\n			<ion-input type="text" [(ngModel)]="title"></ion-input>\n\n		</ion-item>\n\n		<ion-item class="clear">\n\n			<ion-label floating>Description</ion-label>\n\n			<ion-textarea type="text" [(ngModel)]="description"></ion-textarea>\n\n		</ion-item>\n\n		<ion-item class="clear">\n\n			<ion-label floating>Choose Toy Type</ion-label>\n\n			<ion-select [selectOptions]="selectOptions" [(ngModel)]="toyType">\n\n				<ion-option *ngFor="let type of types" value="{{type}}">{{type}}</ion-option>\n\n			</ion-select>\n\n		</ion-item>\n\n	</ion-list>\n\n\n\n	<ion-list-header>\n\n		Bid duration\n\n		<ion-badge item-end>{{bidDuration}} Days</ion-badge>\n\n		<ion-icon item-end name="calendar"></ion-icon>\n\n</ion-list-header>\n\n	<ion-item>\n\n		<ion-range [(ngModel)]="bidDuration" min="3" max="21" pin="true">\n\n			<ion-label range-left>3</ion-label>\n\n			<ion-label range-right>21</ion-label>\n\n		</ion-range>\n\n	</ion-item>\n\n\n\n	<ion-card id="preview">\n\n		\n\n		<div class="thumbnails" *ngFor="let thumb of pictures; let ind = index" [ngStyle] ="{ \'background-image\' : \'url(\' + thumb.uri + \')\'}">\n\n			<button class = "remove" icon-only (click) = "remove(ind)"></button>	\n\n		</div>\n\n	</ion-card>\n\n	<ion-row>\n\n		<ion-col col-8>\n\n			<div id="status">\n\n				{{pictures.length}} added. you can still add {{6 - pictures.length}}.\n\n			</div>\n\n		</ion-col>\n\n		<ion-col col-2>\n\n			<ion-fab center>\n\n				<button ion-fab mini (click)="openGallery();">\n\n          <ion-icon name="images"></ion-icon>\n\n        </button>\n\n			</ion-fab>\n\n		</ion-col>\n\n		<ion-col col-2>\n\n			<ion-fab center>\n\n				<button ion-fab mini (click)="takePicture();">\n\n          <ion-icon name="camera"></ion-icon>\n\n        </button>\n\n			</ion-fab>\n\n    </ion-col>\n\n	</ion-row>\n\n	<ion-row>\n\n		<button ion-button full (click)="uploadImage();">\n\n			place bid\n\n		</button>\n\n	</ion-row>\n\n\n\n	\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\PC\Desktop\toySwap\src\pages\upload\upload.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_crop__["a" /* Crop */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_profile_profile__["a" /* ProfileProvider */]])
    ], UploadPage);
    return UploadPage;
}());

//# sourceMappingURL=upload.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BidPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_user__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_crop__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_profile_profile__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_image_picker__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__model_bidManager__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_offer__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__model_bid__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__model_item__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var BidPage = /** @class */ (function () {
    function BidPage(toastCtrl, file, crop, loadingCtrl, imagePicker, camera, navCtrl, navParams, profile) {
        this.toastCtrl = toastCtrl;
        this.file = file;
        this.crop = crop;
        this.loadingCtrl = loadingCtrl;
        this.imagePicker = imagePicker;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.profile = profile;
        this.types = [
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
        this.title = "";
        this.description = "";
        this.toyType = "";
        this.start = "";
        this.expire = "";
        this.pictures = [];
        this.downloadUrls = [];
        this.bidDuration = 3;
        this.imageUri = null;
        this.details = null;
        this.itemsObj = [];
        this.selectOptions = {
            subTitle: 'Select a category',
        };
        this.firebaseStorage = firebase.storage();
        this.bidder = profile.user;
        this.item = navParams.get('item');
        this.bidObj = new __WEBPACK_IMPORTED_MODULE_10__model_bid__["a" /* Bid */](this.item.bid);
        this.bidOwner = new __WEBPACK_IMPORTED_MODULE_3__model_user__["a" /* User */](this.bidObj.getOwner());
        // console.log();
        this.itemPassedItem = new __WEBPACK_IMPORTED_MODULE_11__model_item__["a" /* Item */](this.bidObj.getMerchandise());
        console.log(this.itemPassedItem);
        this.itemDescription = this.itemPassedItem.getDescription();
        this.itemName = this.itemPassedItem.getName();
        this.itemPicture = this.itemPassedItem.getImageUri();
        this.firebaseStorage = firebase.storage();
    }
    BidPage.prototype.close = function () {
        this.navCtrl.pop();
    };
    BidPage.prototype.ionViewDidLoad = function () {
        this.pictures = [];
        this.downloadUrls = [];
    };
    BidPage.prototype.takePicture = function () {
        var _this = this;
        var options = {
            quality: 25,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: false,
            cameraDirection: 0,
            targetWidth: 640,
            targetHeight: 640,
            allowEdit: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageUri = 'data:image/jpeg;base64,' + imageData;
            _this.details = "img" + Date.now().toString() + ".jpeg";
            _this.loading = _this.loadingCtrl.create({
                content: 'Optimizing image. please wait...'
            });
            _this.loading.present();
            if (_this.pictures.length <= 5) {
                _this.pictures.push({
                    name: _this.details,
                    uri: _this.imageUri
                });
                _this.loading.dismiss();
            }
            else {
                _this.presentToast("You can only add 6 images");
                _this.loading.dismiss();
            }
            console.log(_this.pictures);
        }, function (err) {
            console.log(err);
            _this.loading.dismiss();
        });
    };
    BidPage.prototype.uploadImage = function () {
        var _this = this;
        var counter = 0;
        this.loading = this.loadingCtrl.create({
            content: 'Uploading files, Please wait...'
        });
        this.loading.present();
        for (var i = 0; i < this.pictures.length; i++) {
            var ref = this.firebaseStorage.ref('bidderItemPictures/' + this.uid + '/' + this.pictures[i].name);
            ref.putString(this.pictures[i].uri, 'data_url').then(function (resp) {
                counter++;
                if (counter == _this.pictures.length) {
                    _this.getUrls();
                }
            }).catch(function (err) {
                _this.loading.dismiss();
            });
        }
    };
    BidPage.prototype.getUrls = function () {
        var _this = this;
        console.log("fetching urls");
        var _loop_1 = function (i) {
            this_1.firebaseStorage.ref('/bidderItemPictures/' + this_1.uid + '/' + this_1.pictures[i].name + '/').getDownloadURL().then(function (url) {
                _this.downloadUrls.push(url);
                console.log("saving url for image " + (1 + i));
                if (_this.downloadUrls.length == _this.pictures.length) {
                    _this.saveToDB();
                }
            }).catch(function (error) {
                console.log(error);
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.pictures.length; i++) {
            _loop_1(i);
        }
    };
    BidPage.prototype.saveToDB = function () {
        console.log("save to db");
        console.log(this.downloadUrls);
        this.bidDuration *= 60 * 60 * 24 * 1000;
        this.bidDuration += Date.now();
        var offerItemsObjArr = [];
        var bidFactory = new __WEBPACK_IMPORTED_MODULE_8__model_bidManager__["a" /* BidManager */]();
        var bidOffer = new __WEBPACK_IMPORTED_MODULE_9__model_offer__["a" /* Offer */](null);
        var offerItems = new __WEBPACK_IMPORTED_MODULE_11__model_item__["a" /* Item */](null);
        console.log(this.description);
        offerItems.setDescription(this.description);
        //this.downloadUrls.push("asdfsdfsdfsdf");
        console.log(this.downloadUrls);
        offerItems.setImageUri(this.downloadUrls);
        console.log(this.title);
        offerItems.setName(this.title);
        console.log(this.toyType);
        offerItems.setType(this.toyType);
        console.log(offerItems);
        offerItemsObjArr.push(offerItems);
        console.log(this.bidder);
        console.log(offerItemsObjArr);
        bidOffer.setItems(offerItemsObjArr);
        bidOffer.setOfferDate(Date.now());
        console.log(this.bidder);
        bidOffer.setOwner(this.bidder);
        this.bidObj.setOffers(offerItemsObjArr);
        bidFactory.writeBidOffer(bidOffer, this.bidObj.getBidId());
        bidFactory.updatePlacedBid(this.bidObj);
        bidFactory.updateUsersBid(this.bidObj, this.bidOwner.getUid());
        this.loading.dismiss();
        this.presentToast("Bid posted successfully");
        this.navCtrl.pop();
    };
    BidPage.prototype.remove = function (x) {
        this.pictures.splice(x, 1);
        this.presentToast("picture deleted");
    };
    BidPage.prototype.openGallery = function () {
        var _this = this;
        var options = { maximumImagesCount: 1, outputType: 0 };
        this.imagePicker.getPictures(options).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                _this.crop.crop(results[i], { quality: 25, targetWidth: 640, targetHeight: 640 })
                    .then(function (newImage) {
                    console.log('new image path is: ' + newImage);
                    var path = newImage.substring(0, newImage.lastIndexOf('/') + 1);
                    var file = newImage.substring(newImage.lastIndexOf('/') + 1, newImage.lastIndexOf('?'));
                    console.log(path);
                    console.log(file);
                    _this.loading = _this.loadingCtrl.create({
                        content: 'Optimizing image. please wait...'
                    });
                    _this.loading.present();
                    _this.file.readAsDataURL(path, file).then(function (uri) {
                        _this.imageUri = uri;
                        _this.details = "img" + Date.now().toString() + ".jpeg";
                        if (_this.pictures.length <= 5) {
                            _this.pictures.push({
                                name: _this.details,
                                uri: _this.imageUri
                            });
                            _this.loading.dismiss();
                        }
                        else {
                            _this.presentToast("You can only add 6 images");
                            _this.loading.dismiss();
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }, function (error) { return console.error('Error cropping image', error); });
            }
        }, function (err) {
            console.log(err);
        });
    };
    BidPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 4000,
            position: 'top',
            showCloseButton: true,
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    BidPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-bid',template:/*ion-inline-start:"C:\Users\PC\Desktop\toySwap\src\pages\bid\bid.html"*/'<ion-header>\n\n	<ion-navbar>\n\n		<ion-row>\n\n			<button icon-only clear ion-button (click)="close();">\n\n				<ion-icon name="close"></ion-icon>\n\n			</button>\n\n			<ion-title>Bid Item</ion-title>\n\n		</ion-row>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n	<div class="card-background-page">\n\n		<ion-card>\n\n			<img src="{{itemPicture}}"/>\n\n			<div class="card-title">{{itemName}}</div>\n\n			<div class="card-subtitle">{{itemDescription}}</div>\n\n		</ion-card>\n\n	</div>\n\n	\n\n	<ion-list>\n\n		<ion-item class="clear">\n\n			<ion-label floating>Title</ion-label>\n\n			<ion-input type="text" [(ngModel)]="title"></ion-input>\n\n		</ion-item>\n\n		<ion-item class="clear">\n\n			<ion-label floating>Description</ion-label>\n\n			<ion-textarea type="text" [(ngModel)]="description"></ion-textarea>\n\n		</ion-item>\n\n		<ion-item class="clear">\n\n			<ion-label floating>Choose Toy Type</ion-label>\n\n			<ion-select [selectOptions]="selectOptions" [(ngModel)]="toyType">\n\n				<ion-option *ngFor="let type of types" value="{{type}}">{{type}}</ion-option>\n\n			</ion-select>\n\n		</ion-item>\n\n	</ion-list>\n\n\n\n	<ion-card id="preview">\n\n		<div class="thumbnails" *ngFor="let thumb of pictures; let ind = index" [ngStyle] ="{ \'background-image\' : \'url(\' + thumb.uri + \')\'}">\n\n			<button ion-button icon-only clear (click) = "remove(ind)">\n\n				<ion-icon name="close-circle"></ion-icon>\n\n			</button>\n\n		</div>\n\n	</ion-card>\n\n	<ion-row>\n\n		<ion-col col-8>\n\n			<div id="status">\n\n				{{pictures.length}} added. you can still add {{6 - pictures.length}}.\n\n			</div>\n\n		</ion-col>\n\n		<ion-col col-2>\n\n			<ion-fab center>\n\n				<button ion-fab mini (click)="openGallery();">\n\n          <ion-icon name="images"></ion-icon>\n\n        </button>\n\n			</ion-fab>\n\n		</ion-col>\n\n		<ion-col col-2>\n\n			<ion-fab center>\n\n				<button ion-fab mini (click)="takePicture();">\n\n          <ion-icon name="camera"></ion-icon>\n\n        </button>\n\n			</ion-fab>\n\n    </ion-col>\n\n	</ion-row>\n\n	<ion-row>\n\n		<button ion-button full (click)="uploadImage();">\n\n			place bid\n\n		</button>\n\n	</ion-row>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\PC\Desktop\toySwap\src\pages\bid\bid.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_crop__["a" /* Crop */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_profile_profile__["a" /* ProfileProvider */]])
    ], BidPage);
    return BidPage;
}());

//# sourceMappingURL=bid.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewOfferPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_offer__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_item__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_user__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_bidManager__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_bid__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_profile_profile__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the ViewOfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ViewOfferPage = /** @class */ (function () {
    function ViewOfferPage(navCtrl, navParams, profile) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.profile = profile;
        this.offerItem = [];
        this.offeritemsFormatted = []; // ngModel bind
        console.log(navParams.get('item'));
        this.bid = new __WEBPACK_IMPORTED_MODULE_6__model_bid__["a" /* Bid */](navParams.get('bid'));
        console.log(this.bid.getBidId());
        console.log(profile.user.getUserName());
    }
    ViewOfferPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ViewOfferPage');
        this.offerObj = new __WEBPACK_IMPORTED_MODULE_2__model_offer__["a" /* Offer */](this.navParams.get('item'));
        console.log(this.offerObj);
        this.offerOwner = new __WEBPACK_IMPORTED_MODULE_4__model_user__["a" /* User */](this.offerObj.getOwner());
        console.log(this.offerOwner);
        this.ownerName = this.offerOwner.getUserName() + " " + this.offerOwner.getSurname();
        this.profilePic = this.offerOwner.getProfilePic();
        this.offerItem = this.offerObj.getItems();
        "";
        console.log(this.offerItem[0]);
        this.offerItemObj = new __WEBPACK_IMPORTED_MODULE_3__model_item__["a" /* Item */](this.offerItem[0]);
        this.itemname = this.offerItemObj.getName();
        this.itemDescription = this.offerItemObj.getDescription();
        console.log(this.offerItemObj);
        this.offeritemsFormatted = this.offerItemObj.getImageUri();
        console.log(this.offeritemsFormatted);
    };
    ViewOfferPage.prototype.acceptBid = function () {
        var bidFactory = new __WEBPACK_IMPORTED_MODULE_5__model_bidManager__["a" /* BidManager */]();
        bidFactory.writeUserSuccessfullBids(this.bid);
        console.log(this.bid.getBidId());
        bidFactory.removePlacedBid(this.bid.getBidId());
        bidFactory.removeUserPlacedBid(this.profile.user.getUid(), this.bid.getBidId());
        this.navCtrl.push("MapboxPage");
    };
    ViewOfferPage.prototype.rejectBid = function () {
        var bidFactory = new __WEBPACK_IMPORTED_MODULE_5__model_bidManager__["a" /* BidManager */]();
        bidFactory.removeBidOffer(this.bid.getBidId(), this.offerObj.getOfferId());
        bidFactory.writeUserRejectedOffer(this.offerObj, this.offerOwner.getUid());
    };
    ViewOfferPage.prototype.close = function () {
        this.navCtrl.pop();
    };
    ViewOfferPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-view-offer',template:/*ion-inline-start:"C:\Users\PC\Desktop\toySwap\src\pages\view-offer\view-offer.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-row>\n\n      <button clear icon-only ion-button (click)="close();">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n      <ion-title>Offer</ion-title>\n\n    </ion-row>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <ion-card>\n\n\n\n      <ion-item>\n\n        <ion-avatar item-start>\n\n          <img src="{{profilePic}}">\n\n        </ion-avatar>\n\n        <h2>{{ownerName}}</h2>\n\n        <p>{{itemname}}</p>\n\n      </ion-item>\n\n    \n\n      <ion-slides pager>\n\n        <ion-slide *ngFor="let slideUrls of offeritemsFormatted; let j = index">\n\n          <img class="ph" src="{{slideUrls}}" />\n\n        </ion-slide>\n\n      </ion-slides>\n\n    \n\n      <ion-card-content>\n\n        <p>{{itemDescription}}</p>\n\n      </ion-card-content>\n\n    \n\n      <ion-row>\n\n        <ion-col>\n\n          <button ion-button full (click)="acceptBid()">\n\n            Accept Bid\n\n          </button>\n\n        </ion-col>\n\n        <ion-col>\n\n          <button ion-button full (click)="rejectBid()">\n\n            Reject Bid\n\n          </button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-card>\n\n</ion-content>'/*ion-inline-end:"C:\Users\PC\Desktop\toySwap\src\pages\view-offer\view-offer.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_7__providers_profile_profile__["a" /* ProfileProvider */]])
    ], ViewOfferPage);
    return ViewOfferPage;
}());

//# sourceMappingURL=view-offer.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NotificationsPage = /** @class */ (function () {
    function NotificationsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    NotificationsPage.prototype.cancel = function () {
        this.navCtrl.pop();
    };
    NotificationsPage.prototype.viewBid = function () {
        console.log("clicked");
    };
    NotificationsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-notifications',template:/*ion-inline-start:"C:\Users\PC\Desktop\toySwap\src\pages\notifications\notifications.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n      <ion-row>\n\n          <button clear ion-button icon-only (click) = "cancel();">\n\n              <ion-icon name="arrow-back"></ion-icon>\n\n          </button>\n\n          <ion-title>Notifications</ion-title>\n\n      </ion-row>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="notification" (click) = "viewBid();">\n\n    <ion-row>\n\n      <ion-col col-10>\n\n        this person made an offer\n\n      </ion-col>\n\n      <ion-col col-2>\n\n          <img src="../../assets/imgs/user.svg" alt="">\n\n        </ion-col>\n\n    </ion-row>\n\n  </div>\n\n  <div class="notification" (click) = "viewBid();">\n\n    <ion-row>\n\n      <ion-col col-10>\n\n        this person made an offer\n\n      </ion-col>\n\n      <ion-col col-2>\n\n        <img src="../../assets/imgs/user.svg" alt="">\n\n      </ion-col>\n\n    </ion-row>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\PC\Desktop\toySwap\src\pages\notifications\notifications.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], NotificationsPage);
    return NotificationsPage;
}());

//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_bid__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_item__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_user__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_flag__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_bidManager__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__feed_feed__ = __webpack_require__(215);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ReportPage = /** @class */ (function () {
    function ReportPage(toastCtrl, navCtrl, navParams) {
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        console.log(navParams.get('item').bid);
        this.complaintBid = new __WEBPACK_IMPORTED_MODULE_2__model_bid__["a" /* Bid */](navParams.get('item').bid);
        console.log(this.complaintBid.merchandise);
        this.merchandise = new __WEBPACK_IMPORTED_MODULE_3__model_item__["a" /* Item */](this.complaintBid.merchandise);
        console.log(this.complaintBid.owner);
        this.bidOwner = new __WEBPACK_IMPORTED_MODULE_4__model_user__["a" /* User */](this.complaintBid.owner);
        console.log(this.bidOwner.getUid());
        this.ownerName = this.bidOwner.getUserName();
        console.log(this.ownerName);
        this.complaintBidType = this.merchandise.getType();
        this.complaintBidName = this.merchandise.getName();
        console.log(this.complaintBidType);
        console.log(this.complaintBidName);
    }
    ReportPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReportPage');
    };
    ReportPage.prototype.submitComplaint = function () {
        console.log(this.complaint);
        var flag = new __WEBPACK_IMPORTED_MODULE_5__model_flag__["a" /* Flag */](null);
        var bidId = this.complaintBid.getBidId();
        flag.setReportDate(Date.now());
        flag.setIssue(this.complaint);
        flag.setBidId(bidId);
        flag.setStatus("Open");
        flag.setAdminComment("none");
        console.log(flag);
        console.log(bidId);
        var BidFactory = new __WEBPACK_IMPORTED_MODULE_6__model_bidManager__["a" /* BidManager */]();
        BidFactory.writeFlag(flag, bidId);
        this.presentToast("your report has been submitted, thank you");
        // go back to feed page
    };
    ReportPage.prototype.presentToast = function (message) {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: message,
            duration: 4000,
            position: 'top',
            showCloseButton: true,
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__feed_feed__["a" /* FeedPage */]);
        });
        toast.present();
    };
    ReportPage.prototype.close = function () {
        this.navCtrl.pop();
    };
    ReportPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-report',template:/*ion-inline-start:"C:\Users\PC\Desktop\toySwap\src\pages\report\report.html"*/'<!--\n\n  Generated template for the ReportPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n	<ion-navbar>\n\n		<ion-row>\n\n			<button clear icon-only ion-button (click)="close();">\n\n				<ion-icon name="close"></ion-icon>\n\n			</button>\n\n			<ion-title>Report</ion-title>\n\n		</ion-row>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-item>\n\n    <p>\n\n      Bid Owner: {{ownerName}}\n\n    </p>\n\n  </ion-item>\n\n  <ion-item>\n\n    <p>\n\n      Bid Item: {{complaintBidName}}\n\n    </p>\n\n  </ion-item>\n\n  <ion-item>\n\n    <p>\n\n     Toy Type: {{complaintBidType}} \n\n    </p>\n\n  </ion-item>\n\n  <ion-item class="clear">\n\n    <ion-label floating>please write your detailed complaint here</ion-label>\n\n    <ion-input type="text" [(ngModel)]="complaint"></ion-input>\n\n  </ion-item>\n\n  <button ion-button full (click)="submitComplaint();">\n\n    Submit Report\n\n  </button>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\PC\Desktop\toySwap\src\pages\report\report.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ReportPage);
    return ReportPage;
}());

//# sourceMappingURL=report.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BiddersProfilesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_bid__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_user__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the BiddersProfilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BiddersProfilesPage = /** @class */ (function () {
    function BiddersProfilesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        console.log(navParams.get('item'));
        this.bid = new __WEBPACK_IMPORTED_MODULE_2__model_bid__["a" /* Bid */](navParams.get('item').bid);
        console.log(this.bid);
        this.profileOwner = new __WEBPACK_IMPORTED_MODULE_3__model_user__["a" /* User */](this.bid.getOwner());
        console.log(this.profileOwner);
        this.profilePic = this.profileOwner.getProfilePic();
        console.log(this.profilePic);
        this.userName = this.profileOwner.getUserName() + " " + this.profileOwner.getSurname();
    }
    BiddersProfilesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BiddersProfilesPage');
        console.log(this.profileOwner);
    };
    BiddersProfilesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-bidders-profiles',template:/*ion-inline-start:"C:\Users\PC\Desktop\toySwap\src\pages\bidders-profiles\bidders-profiles.html"*/'<!--\n\n  Generated template for the BiddersProfilesPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>biddersProfiles</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-card>\n\n\n\n    <img src="{{profilePic}}">\n\n    <ion-fab right top>\n\n      <button ion-fab>\n\n        <ion-icon name="pin"></ion-icon>\n\n      </button>\n\n    </ion-fab>\n\n  \n\n    <ion-item>\n\n      <ion-icon name="football" item-start large></ion-icon>\n\n      <h2>User Name: {{profilePic}}</h2>\n\n    </ion-item>\n\n  \n\n    <ion-item>\n\n      <ion-icon name="wine" item-start large ></ion-icon>\n\n      <h2>User Name: {{userName}}</h2>\n\n    </ion-item>\n\n  \n\n    <ion-item>\n\n      <span item-start>18 min</span>\n\n      <span item-start>(2.6 mi)</span>\n\n      <button ion-button icon-start clear item-end>\n\n        <ion-icon name="navigate"></ion-icon>\n\n        Start\n\n      </button>\n\n    </ion-item>\n\n  \n\n  </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\PC\Desktop\toySwap\src\pages\bidders-profiles\bidders-profiles.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], BiddersProfilesPage);
    return BiddersProfilesPage;
}());

//# sourceMappingURL=bidders-profiles.js.map

/***/ }),

/***/ 128:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 128;

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/bid-info/bid-info.module": [
		297,
		12
	],
	"../pages/bid/bid.module": [
		296,
		11
	],
	"../pages/bidders-profiles/bidders-profiles.module": [
		308,
		10
	],
	"../pages/dashboard/dashboard.module": [
		298,
		4
	],
	"../pages/feed/feed.module": [
		299,
		9
	],
	"../pages/home/home.module": [
		300,
		3
	],
	"../pages/mapbox/mapbox.module": [
		301,
		2
	],
	"../pages/notifications/notifications.module": [
		302,
		8
	],
	"../pages/profile/profile.module": [
		303,
		1
	],
	"../pages/report/report.module": [
		304,
		7
	],
	"../pages/splash/splash.module": [
		305,
		0
	],
	"../pages/upload/upload.module": [
		307,
		6
	],
	"../pages/view-offer/view-offer.module": [
		306,
		5
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 170;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BidInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_bid__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_profile_profile__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_offer__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_item__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_bidManager__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_user__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__view_offer_view_offer__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var BidInfoPage = /** @class */ (function () {
    // consumedData;
    function BidInfoPage(modalCtrl, navCtrl, navParams, profile) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.profile = profile;
        this.offersObjArr = [];
        this.itemImageUri = [];
        this.itemObjects = [];
        console.log(navParams.get('item'));
        this.bidInfo = navParams.get('item');
        this.bid = new __WEBPACK_IMPORTED_MODULE_2__model_bid__["a" /* Bid */](this.bidInfo);
        console.log(this.bidInfo);
        this.merchandise = new __WEBPACK_IMPORTED_MODULE_5__model_item__["a" /* Item */](this.bid.getMerchandise());
        this.itemImageUri = this.merchandise.getImageUri();
        this.offerOwner = new __WEBPACK_IMPORTED_MODULE_7__model_user__["a" /* User */](this.bid.getOwner());
        this.ownerName = this.offerOwner.getUserName();
        this.ownerProfilePic = this.offerOwner.getProfilePic();
        this.itemName = this.merchandise.getName();
        this.itemType = this.merchandise.getType();
        this.itemDescription = this.merchandise.getDescription();
        this.views = this.bid.getViews();
        this.bidDate = this.bid.getBidDate();
        this.formattedDate = new Date(this.bidDate);
        this.formattedDate.toString("MMM dd YYYY");
        var count = 0;
        var bidFactory = new __WEBPACK_IMPORTED_MODULE_6__model_bidManager__["a" /* BidManager */]();
        var items;
        var offerOwners;
        var offerMechandises;
        bidFactory.readBidOffersById(this.bid.getBidId(), function (consumedData, ownerArr, offerMechandiseArr) {
            console.log(consumedData);
            // this.offersObjArr = consumedData;
            items = [];
            items = consumedData;
            offerOwners = ownerArr;
            offerMechandises = offerMechandiseArr;
            count++;
        });
        this.offersObjArr = items;
        this.offerOwnersArr = offerOwners;
        this.offerObj = new __WEBPACK_IMPORTED_MODULE_4__model_offer__["a" /* Offer */](items);
        this.offerMechandisesArr = offerMechandises;
        //this.offerSize = this.offersObjArr.length;
        console.log(count);
        this.offerSize = count;
    }
    BidInfoPage.prototype.close = function () {
        this.navCtrl.pop();
    };
    BidInfoPage.prototype.viewOffer = function (item) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__view_offer_view_offer__["a" /* ViewOfferPage */], {
            item: item
        });
        modal.present();
    };
    BidInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-bid-info',template:/*ion-inline-start:"C:\Users\PC\Desktop\toySwap\src\pages\bid-info\bid-info.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-row>\n\n      <button clear icon-only ion-button (click) = "close();">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n      <ion-title>Item Details</ion-title>\n\n    </ion-row>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  \n\n\n\n  <ion-card>\n\n    <div id="bid-preview">\n\n      <ion-slides pager>\n\n        <ion-slide *ngFor = "let slideUrls of itemImageUri; let j = index">\n\n          <img class = "ph" src="{{slideUrls}}"/>\n\n        </ion-slide>\n\n      </ion-slides>\n\n    </div>\n\n    <ion-card-content>\n\n      <ion-card-title>\n\n        {{itemName}}\n\n      </ion-card-title>\n\n      <p>\n\n        {{itemDescription}}\n\n      </p>\n\n    </ion-card-content>\n\n  </ion-card>\n\n  \n\n\n\n  <div id="bid-main">    \n\n    <ion-list>\n\n      <ion-list-header>\n\n       <p>\n\n        Available Offers \n\n       </p>\n\n       <ion-badge item-end>{{ offerSize }}</ion-badge>\n\n      </ion-list-header>\n\n      <ion-item *ngFor="let offer of offersObjArr; let i = index" (click)="viewOffer(offer)">\n\n        <ion-avatar item-start>\n\n          <img src={{ownerProfilePic}}>\n\n        </ion-avatar>\n\n        <p>\n\n          {{offerOwnersArr[i].name}}\n\n        </p>\n\n        <p>\n\n          {{offerMechandisesArr[i].name}}\n\n        </p>\n\n      </ion-item>\n\n    </ion-list>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\PC\Desktop\toySwap\src\pages\bid-info\bid-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_profile_profile__["a" /* ProfileProvider */]])
    ], BidInfoPage);
    return BidInfoPage;
}());

//# sourceMappingURL=bid-info.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bid_bid__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__upload_upload__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__notifications_notifications__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__report_report__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_profile_profile__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__bidders_profiles_bidders_profiles__ = __webpack_require__(116);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var FeedPage = /** @class */ (function () {
    function FeedPage(toastCtrl, platform, loadingCtrl, modalCtrl, navCtrl, navParams, userProfile) {
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userProfile = userProfile;
        this.items = [];
        this.itemsObjArr = [];
        this.merchandiseObjArr = [];
        this.imgObjUri = [];
        this.testImageArr = [];
        this.bidItemImgList = [];
        this.ownerObjArr = [];
        this.views = [];
        this.searchResults = [];
        this.searchUrls = [];
        this.currentDay = Date.now();
        if (this.userProfile.user === undefined) {
            console.log("user not loaded properly please reload the splash page");
        }
        else {
        }
        this.retrieveData();
    }
    FeedPage.prototype.retrieveData = function () {
        var _this = this;
        this.searchResults.length = 0;
        this.date = new Date();
        var loading = this.loadingCtrl.create({
            content: "Loading please wait",
            spinner: "crescent",
            showBackdrop: false
        });
        loading.present();
        var g = 0;
        this.items = [];
        var dummyOwner = [];
        var dummyItemObj = [];
        firebase.database().ref('/placedBids/').on('value', function (snapshot) {
            _this.items = [];
            g = 0;
            snapshot.forEach(function (snap) {
                if (snap.val() != undefined) {
                    _this.items.push(snap.val());
                    dummyItemObj.push(_this.items[g].bid);
                    dummyOwner.push(dummyItemObj[g].owner);
                    _this.itemsObjArr.push(_this.items[g].bid);
                    _this.views.push(_this.itemsObjArr[g].views);
                    _this.merchandiseObjArr.push(_this.itemsObjArr[g].merchandise);
                    _this.ownerObjArr.push(_this.itemsObjArr[g].owner);
                    _this.imgObjUri.push(_this.merchandiseObjArr[g]);
                    g++;
                }
                return false;
            });
            _this.items.reverse();
            _this.merchandiseObjArr.reverse();
            _this.imgObjUri.reverse();
            _this.itemsObjArr.reverse();
            _this.ownerObjArr.reverse();
            _this.views.reverse();
            console.log(_this.items);
            loading.dismiss();
        });
    };
    FeedPage.prototype.profile = function () {
        this.navCtrl.push("ProfilePage");
    };
    FeedPage.prototype.viewBidderProfiles = function (item) {
        console.log(item);
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__bidders_profiles_bidders_profiles__["a" /* BiddersProfilesPage */], {
            item: item
        });
        modal.present();
    };
    FeedPage.prototype.bidFor = function (activeItem) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__bid_bid__["a" /* BidPage */], {
            item: activeItem
        });
        modal.present();
    };
    FeedPage.prototype.reportBid = function (activeItem) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__report_report__["a" /* ReportPage */], {
            item: activeItem
        });
        modal.present();
    };
    FeedPage.prototype.notify = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__notifications_notifications__["a" /* NotificationsPage */]);
        modal.present();
    };
    FeedPage.prototype.doRefresh = function (refresher) {
        this.retrieveData();
        refresher.complete();
        this.myInput = "";
    };
    FeedPage.prototype.addItem = function () {
        console.log("called");
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__upload_upload__["a" /* UploadPage */]);
        modal.present();
    };
    FeedPage.prototype.search = function ($event) {
        this.searchResults = [];
        this.searchUrls = [];
        //|| this.items[i].bid.merchandise.name.toLowerCase() == this.myInput.toLowerCase()
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].bid.merchandise.name.toLowerCase() === this.myInput.toLowerCase()) {
                this.searchResults.push(this.items[i]);
                this.searchUrls.push({
                    imageUri: this.items[i].bid.merchandise.imageUri
                });
            }
        }
        if (this.searchResults.length > 0) {
            console.log("theres results");
            this.items = [];
            this.imgObjUri = [];
            this.items = this.searchResults;
            this.imgObjUri = this.searchUrls;
            this.presentToast("Now showing " + this.myInput);
            this.myInput = "";
        }
        else {
            this.presentToast(this.myInput + " not found");
        }
    };
    FeedPage.prototype.onClear = function ($event) {
        console.log("cancel");
        this.myInput = "";
        this.retrieveData();
    };
    FeedPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 4000,
            position: 'top',
            showCloseButton: true,
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    FeedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-feed',template:/*ion-inline-start:"C:\Users\PC\Desktop\toySwap\src\pages\feed\feed.html"*/'<ion-content id = "feed">\n\n  <ion-fab id="nav">\n\n    <button ion-fab style="display: none;"></button>\n\n    <ion-row>\n\n      <ion-col  col-2>\n\n        <button ion-button icon-only  clear medium (click) = "profile();">\n\n          <ion-icon name = "person"></ion-icon>\n\n        </button>\n\n      </ion-col>\n\n      <ion-col  col->\n\n          <ion-searchbar\n\n          [(ngModel)]="myInput"\n\n          [showCancelButton]="True"\n\n          (search)="search($event)"\n\n          (ionClear)="onClear($event)"\n\n          (ionCancel)="onCancel($event)">\n\n        </ion-searchbar>\n\n      </ion-col>\n\n      <ion-col  col-2>\n\n        <button ion-button icon-only  clear medium (click) = "notify();">\n\n          <ion-icon name="notifications"></ion-icon>\n\n        </button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-fab>\n\n  <div id="activity">\n\n    Activity feed <small>{{date | date:\'yyyy-MM-dd\'}}</small>\n\n  </div>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <div *ngIf= "searchResults.length > 0">\n\n    <button ion-button id = "resetSearch" (click) = "retrieveData();">clear search</button>  \n\n  </div>\n\n  <div id = "main"> \n\n    <ion-card  *ngFor = "let item of items; let i = index" class = "cards">\n\n      <ion-slides pager>\n\n        <ion-slide *ngFor = "let slideUrls of imgObjUri[i].imageUri; let j = index">\n\n          <div class="img-ph">\n\n            <img class = "img" src="{{slideUrls}}"/>\n\n          </div>\n\n        </ion-slide>\n\n      </ion-slides>\n\n      <div class = "profile">\n\n  \n\n        <ion-fab class = "img-fab">\n\n          <button ion-fab (click)="viewBidderProfiles(item)"><img src="{{ownerObjArr[i].profilePic}}"></button>\n\n        </ion-fab>\n\n        <ion-row>\n\n          <ion-col>\n\n            <h3 ion-text>{{ownerObjArr[i].name}}</h3>\n\n          </ion-col>\n\n          <ion-col>\n\n            <h3 ion-text id = "right">{{(itemsObjArr[i].bidDuration - currentDay) / 60 / 60 / 24 / 1000   | number : \'2.0-0\' }} days left</h3>\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n            <ion-col col-4>\n\n              <button ion-button icon-start clear medium (click) = "bidFor(item)">\n\n                <ion-icon name="add-circle" color = "light"></ion-icon>\n\n                <div>bid</div>\n\n              </button>\n\n            </ion-col>\n\n            <ion-col col-4>\n\n              <button ion-button icon-start clear medium (click)="reportBid(item)">\n\n                <ion-icon name="flag" color = "light"></ion-icon>\n\n                <div>report</div>\n\n              </button>\n\n            </ion-col>\n\n            <ion-col col-4 center text-center>\n\n              <button ion-button icon-start clear medium>\n\n                <ion-icon name="eye"color = "light" ></ion-icon>\n\n                <ion-badge color = "light" item-end>{{views[i]}}</ion-badge>\n\n              </button>\n\n            </ion-col>\n\n          </ion-row>\n\n      </div>\n\n    </ion-card>\n\n  </div>\n\n\n\n  <ion-fab bottom right fixed>\n\n    <button ion-fab color = "dark" (click) = "addItem();"><ion-icon name="add"></ion-icon></button>\n\n  </ion-fab>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\PC\Desktop\toySwap\src\pages\feed\feed.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_6__providers_profile_profile__["a" /* ProfileProvider */]])
    ], FeedPage);
    return FeedPage;
}());

//# sourceMappingURL=feed.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(238);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_bid_bid__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_notifications_notifications__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_upload_upload__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_image_picker__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_crop__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_camera__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_test_test__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_profile_profile__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_upload_upload__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_bid_info_bid_info__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_report_report__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_android_permissions__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_view_offer_view_offer__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_bidders_profiles_bidders_profiles__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_geolocation__ = __webpack_require__(216);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_bid_bid__["a" /* BidPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_upload_upload__["a" /* UploadPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_bid_info_bid_info__["a" /* BidInfoPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_report_report__["a" /* ReportPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_view_offer_view_offer__["a" /* ViewOfferPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_bidders_profiles_bidders_profiles__["a" /* BiddersProfilesPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/bid/bid.module#BidPageModule', name: 'BidPage', segment: 'bid', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/bid-info/bid-info.module#BidInfoPageModule', name: 'BidInfoPage', segment: 'bid-info', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/feed/feed.module#FeedPageModule', name: 'FeedPage', segment: 'feed', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mapbox/mapbox.module#MapboxPageModule', name: 'MapboxPage', segment: 'mapbox', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/notifications/notifications.module#NotificationsPageModule', name: 'NotificationsPage', segment: 'notifications', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/report/report.module#ReportPageModule', name: 'ReportPage', segment: 'report', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/splash/splash.module#SplashPageModule', name: 'SplashPage', segment: 'splash', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/view-offer/view-offer.module#ViewOfferPageModule', name: 'ViewOfferPage', segment: 'view-offer', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/upload/upload.module#UploadPageModule', name: 'UploadPage', segment: 'upload', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/bidders-profiles/bidders-profiles.module#BiddersProfilesPageModule', name: 'BiddersProfilesPage', segment: 'bidders-profiles', priority: 'low', defaultHistory: [] }
                    ]
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_bid_bid__["a" /* BidPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_upload_upload__["a" /* UploadPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_bid_info_bid_info__["a" /* BidInfoPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_report_report__["a" /* ReportPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_view_offer_view_offer__["a" /* ViewOfferPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_bidders_profiles_bidders_profiles__["a" /* BiddersProfilesPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_image_picker__["a" /* ImagePicker */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_crop__["a" /* Crop */],
                __WEBPACK_IMPORTED_MODULE_14__providers_test_test__["a" /* TestProvider */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_15__providers_profile_profile__["a" /* ProfileProvider */],
                __WEBPACK_IMPORTED_MODULE_16__providers_upload_upload__["a" /* UploadProvider */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_android_permissions__["a" /* AndroidPermissions */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_geolocation__["a" /* Geolocation */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = /** @class */ (function () {
    function User(obj) {
        if (obj != null) {
            obj && Object.assign(this, obj);
        }
    }
    User.prototype.getUid = function () {
        return this.uid;
    };
    User.prototype.getUserName = function () {
        return this.name;
    };
    User.prototype.getEmail = function () {
        return this.email;
    };
    User.prototype.getType = function () {
        return this.type;
    };
    User.prototype.setUid = function (uid) {
        this.uid = uid;
    };
    User.prototype.setUserName = function (userName) {
        if (userName != "") {
            this.name = userName;
        }
    };
    User.prototype.setSurname = function (surname) {
        this.surname = surname;
    };
    User.prototype.setType = function (type) {
        this.type = type;
    };
    User.prototype.setEmail = function (email) {
        this.email = email;
    };
    User.prototype.setProfilePic = function (profilePic) {
        this.profilePic = profilePic;
    };
    User.prototype.getSurname = function () {
        return this.surname;
    };
    User.prototype.getProfilePic = function () {
        return this.profilePic;
    };
    User.prototype.toString = function () {
        return "User name : " + this.name + "/n" + " email : " + this.email;
    };
    User.prototype.equals = function (object) {
        //compare two user object and return true if condition is met
        if (object != null && object.getEmail() === this.email) {
            return true;
        }
        else {
            return false;
        }
    };
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Flag; });
var Flag = /** @class */ (function () {
    function Flag(obj) {
        if (obj != null) {
            obj && Object.assign(this, obj);
        }
    }
    Flag.prototype.setBidId = function (bidId) {
        this.bidId = bidId;
    };
    Flag.prototype.getBidId = function () {
        return this.bidId;
    };
    Flag.prototype.setReportDate = function (date) {
        this.reportDate = date;
    };
    Flag.prototype.getReportDate = function () {
        return this.reportDate;
    };
    Flag.prototype.setStatus = function (status) {
        this.status = status;
    };
    Flag.prototype.getStatus = function () {
        return this.status;
    };
    Flag.prototype.setIssue = function (issue) {
        this.issue = issue;
    };
    Flag.prototype.getIssue = function () {
        return this.issue;
    };
    Flag.prototype.setAdminComment = function (comment) {
        this.adminComment = comment;
    };
    Flag.prototype.getAdminComment = function () {
        return this.adminComment;
    };
    return Flag;
}());

//# sourceMappingURL=flag.js.map

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bid; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user__ = __webpack_require__(27);

var Bid = /** @class */ (function () {
    function Bid(obj) {
        if (obj != null) {
            obj && Object.assign(this, obj);
        }
        else {
            this.views = 0;
        }
    }
    Bid.prototype.setOwner = function (owner) {
        if (owner != null && owner instanceof __WEBPACK_IMPORTED_MODULE_0__user__["a" /* User */]) {
            this.owner = owner;
        }
    };
    Bid.prototype.setBidDuration = function (expireDate) {
        this.bidDuration = expireDate;
    };
    Bid.prototype.setBidder = function (bidder) {
        if (bidder != null && bidder instanceof __WEBPACK_IMPORTED_MODULE_0__user__["a" /* User */]) {
            this.bidder = bidder;
        }
    };
    Bid.prototype.setViews = function (views) {
        this.views = views;
    };
    Bid.prototype.setMerchandise = function (merchandise) {
        this.merchandise = merchandise;
    };
    Bid.prototype.setBidDate = function (bidDate) {
        this.bidDate = bidDate;
    };
    Bid.prototype.setOffers = function (offers) {
        //null check ofers
        this.offers = offers;
    };
    Bid.prototype.setStatus = function (status) {
        //null check status
        this.status = status;
    };
    Bid.prototype.setBidId = function (bidId) {
        //null check status
        this.bidId = bidId;
    };
    Bid.prototype.setFlagId = function (flagId) {
        this.flagId = flagId;
    };
    Bid.prototype.getFlagId = function () {
        return;
    };
    Bid.prototype.getBidId = function () {
        return this.bidId;
    };
    Bid.prototype.getOffers = function () {
        return this.offers;
    };
    Bid.prototype.getOwner = function () {
        return this.owner;
    };
    Bid.prototype.getBidders = function () {
        return this.bidder;
    };
    Bid.prototype.getViews = function () {
        return this.views;
    };
    Bid.prototype.getMerchandise = function () {
        return this.merchandise;
    };
    Bid.prototype.getBidDate = function () {
        return this.bidDate;
    };
    Bid.prototype.getStatus = function () {
        return this.status;
    };
    Bid.prototype.getExpireDate = function () {
        return this.expireDate;
    };
    Bid.prototype.getBidDuration = function () {
        return this.bidDuration;
    };
    return Bid;
}());

//# sourceMappingURL=bid.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_android_permissions__ = __webpack_require__(213);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(androidPermissions, platform, statusBar, splashScreen) {
        var _this = this;
        this.androidPermissions = androidPermissions;
        this.rootPage = "SplashPage";
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //statusBar.backgroundColorByHexString("#00BCD4");
            statusBar.styleBlackTranslucent();
            _this.androidPermissions.checkPermission(_this.androidPermissions.PERMISSION.CAMERA).then(function (result) {
                console.log('Has permission?', result.hasPermission);
                if (result.hasPermission == false) {
                    _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.CAMERA);
                    _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
                    console.log("asked for camera permission");
                }
            }, function (err) {
                _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.CAMERA);
                console.log("error occured : ");
                console.log(err);
            });
            //this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\PC\Desktop\toySwap\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\PC\Desktop\toySwap\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_android_permissions__["a" /* AndroidPermissions */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the TestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var TestProvider = /** @class */ (function () {
    function TestProvider(http) {
        this.http = http;
        console.log('Hello TestProvider Provider');
    }
    TestProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], TestProvider);
    return TestProvider;
}());

//# sourceMappingURL=test.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the UploadProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UploadProvider = /** @class */ (function () {
    function UploadProvider(http) {
        this.http = http;
        console.log('Hello UploadProvider Provider');
    }
    UploadProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], UploadProvider);
    return UploadProvider;
}());

//# sourceMappingURL=upload.js.map

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ProfileProvider = /** @class */ (function () {
    function ProfileProvider(http) {
        this.http = http;
    }
    ProfileProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], ProfileProvider);
    return ProfileProvider;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BidManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bid__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user__ = __webpack_require__(27);


var BidManager = /** @class */ (function () {
    function BidManager() {
        this.offerItemsMerchandise = [];
        this.dataList = [];
        this.offerItems = [];
        this.ownerArr = [];
        this.offerMechandiseArr = [];
    }
    // this.uid,this.username,this.imgUrl,this.title,this.description, this.toyType
    // this.status,this.bidderUid,this.duration,this.bidDate,this.profilePicture,this.views
    BidManager.prototype.perfomBid = function (bid, bidder) {
        bid.setBidder(bidder);
        firebase.database().ref('/closeBids/').push({
            bid: bid
        });
    };
    BidManager.prototype.writePlacedBid = function (bid) {
        var placedBidskey;
        var placedBidsRef = firebase.database().ref('/placedBids/');
        placedBidskey = placedBidsRef.push().getKey();
        bid.setBidId(placedBidskey);
        bid.setOffers(null);
        console.log(placedBidskey);
        console.log(bid);
        placedBidsRef.child('/' + placedBidskey + '/').set({
            bid: bid,
        });
    };
    BidManager.prototype.updatePlacedBid = function (bid) {
        console.log(bid);
        console.log(bid.getBidId());
        var placedBidsRef = firebase.database().ref('/placedBids/');
        var placedBidskey = bid.getBidId();
        placedBidsRef.child('/' + placedBidskey + '/').set({
            bid: bid,
        });
    };
    BidManager.prototype.updateUsersBid = function (bid, userId) {
        console.log(bid);
        var placedBidsRef = firebase.database().ref('/userBids/');
        var userBidkey = bid.getBidId();
        console.log(userBidkey);
        console.log(userId);
        placedBidsRef.child('/' + userId + '/' + userBidkey + '/').set({
            bid: bid,
        });
    };
    BidManager.prototype.writeUserBid = function (bid) {
        var userId = bid.getOwner().getUid();
        var bidId = bid.getBidId();
        var userBidsRef = firebase.database().ref('/userBids/');
        bid.setOffers(null);
        console.log(userId);
        console.log(bid);
        userBidsRef.child('/' + userId + '/' + bidId).set({
            bid: bid,
        });
    };
    BidManager.prototype.delay = function () {
        // `delay` returns a promise
        return new Promise(function (resolve, reject) {
            // Only `delay` is able to resolve or reject the promise
            setTimeout(function () {
                resolve(42); // After 3 seconds, resolve the promise with value 42
            }, 3000);
        });
    };
    BidManager.prototype.mySandwich = function (param1, param2, callback) {
        alert('Started eating my sandwich.\n\nIt has: ' + param1 + ', ' + param2);
        callback();
    };
    BidManager.prototype.getUserBidsById = function (userId, callback) {
        // var userBidObjArr = {};
        // var dataList: Bid[] = [];
        // firebase.database().ref('/userBids/' + userId).on('value', (snapshot) => {
        //   snapshot.forEach(snap => {
        //     this.userBids = snap.val().bid;
        //     var bid = new Bid(this.userBids);
        //     userBidObjArr = bid;
        //     // var bid2 = bid;
        //     dataList.push(bid);
        var _this = this;
        //     console.log(dataList);
        //   });
        //   console.log(dataList.length);
        // });
        // if(dataList.length > 0){
        //   console.log(dataList);
        //   return dataList;
        // }
        // `delay` returns a promise
        // Only `delay` is able to resolve or reject the promise
        var userBidObjArr = {};
        firebase.database().ref('/userBids/' + userId).on('value', function (snapshot) {
            snapshot.forEach(function (snap) {
                console.log(snap);
                console.log(snap.val());
                _this.userBids = snap.val().bid;
                var bid = new __WEBPACK_IMPORTED_MODULE_0__bid__["a" /* Bid */](_this.userBids);
                userBidObjArr = bid;
                // var bid2 = bid;
                _this.dataList.push(bid);
                console.log(_this.dataList);
            });
            // console.log(dataList.length);
            alert('Started eating my sandwich');
            callback(_this.dataList);
        });
        // setTimeout(function() {
        //   resolve(42); // After 3 seconds, resolve the promise with value 42
        // }, 3000);
        // return new Promise(function (resolve, reject)  {
        //  }).then(value =>{
        //   return this.dataList;
        //   console.log("-----------------");
        // });
    };
    BidManager.prototype.getUserById = function (uid, callback) {
        var currentUser;
        firebase.database().ref('/users/' + uid).on('value', function (snapshot) {
            console.log(snapshot.val().name);
            currentUser = new __WEBPACK_IMPORTED_MODULE_1__user__["a" /* User */](snapshot.val());
            console.log(currentUser);
            callback(currentUser);
        });
    };
    BidManager.prototype.getAllPlacedBids = function () {
        var placedBidObject;
        firebase.database().ref('/placedBids/').on('value', function (snapshot) {
            snapshot.forEach(function (snap) {
                placedBidObject = snap.val();
                console.log(placedBidObject);
                return false;
            });
        });
        if (placedBidObject != null) {
            return placedBidObject;
        }
    };
    BidManager.prototype.getBidById = function (bidId, consumedData) {
        var fireBaseBidObject;
        firebase.database().ref('/placedBids/' + bidId).on('value', function (snapshot) {
            snapshot.forEach(function (snap) {
                console.log("------------------------------------------------------------");
                fireBaseBidObject = snap.val();
                console.log(snap.val());
                console.log(fireBaseBidObject);
                return false;
            });
            consumedData(fireBaseBidObject);
        });
        // if (fireBaseBidObject != null) {
        //   return fireBaseBidObject;
        // }
    };
    BidManager.prototype.writeUserCancelledBids = function (bid, uid) {
        //cancelled
        var cancelledBidsRef = firebase.database().ref('/userCancelledBids/');
        var cancelledBidskey = bid.getBidId();
        cancelledBidsRef.child("/" + uid + '/' + cancelledBidskey).set({
            bid: bid,
        });
    };
    BidManager.prototype.readUserCancelledBids = function (userId) {
        var successfulBids;
        firebase.database().ref('/userCancelledBids/' + userId).on('value', function (snapshot) {
            snapshot.forEach(function (snap) {
                successfulBids = snap.val();
                console.log(successfulBids);
                return false;
            });
        });
    };
    BidManager.prototype.writeUserSuccessfullBids = function (bid) {
        // cancelled
        var userSuccessfulBidsRef = firebase.database().ref('/userSuccessfulBids/');
        var userSuccessFulBidskey = bid.getBidId();
        var bidOwner = new __WEBPACK_IMPORTED_MODULE_1__user__["a" /* User */](bid.getOwner());
        var userId = bidOwner.getUid();
        bid.setStatus("completed");
        console.log(userId);
        userSuccessfulBidsRef.child("/" + userId + '/' + userSuccessFulBidskey).set({
            bid: bid,
        });
    };
    BidManager.prototype.writeUserRejectedOffer = function (offer, ownerId) {
        var bidOfferRef = firebase.database().ref('/userRejectedOffers/');
        var Offerkey = bidOfferRef.push().getKey();
        // offer.setOfferId(Offerkey);
        // console.log(offer);
        // console.log(Offerkey);
        // console.log(bidId);
        bidOfferRef.child('/' + ownerId + '/' + offer.getOfferId()).set({
            offer: offer,
        });
    };
    BidManager.prototype.removePlacedBid = function (bidId) {
        firebase.database().ref('/placedBids/').child(bidId).remove();
    };
    BidManager.prototype.removeBidOffer = function (bidId, offerId) {
        firebase.database().ref('/bidOffers/' + bidId).child(offerId).remove();
    };
    BidManager.prototype.removeUserPlacedBid = function (uid, bidId) {
        firebase.database().ref('/userBids/' + uid).child(bidId).remove();
    };
    BidManager.prototype.readUserSuccesfullBids = function (userId) {
        var successfulBids;
        firebase.database().ref('/userSuccessfulBids/' + userId).on('value', function (snapshot) {
            snapshot.forEach(function (snap) {
                successfulBids = snap.val();
                console.log(successfulBids);
                return false;
            });
        });
    };
    BidManager.prototype.writeAllCancelled = function (cancelledBid) {
        var userId = cancelledBid.getOwner().getUid();
        var allCancelledBidsRef = firebase.database().ref('/cancelledBids/');
        var cancelledBidskey = cancelledBid.getBidId();
        // userBidsRef.child('/' + userId + '/' + bidId).set({
        console.log(cancelledBidskey);
        allCancelledBidsRef.child('/' + userId + '/' + cancelledBidskey).set({
            cancelledBid: cancelledBid,
        });
    };
    BidManager.prototype.writeAllSuccessful = function (successfulBid) {
        var allSuccessfulBidsRef = firebase.database().ref('/successfulBids/');
        var successfulBidskey = allSuccessfulBidsRef.getBidId();
        console.log(successfulBidskey);
        allSuccessfulBidsRef.child('/' + successfulBid + '/').set({
            bsuccessfulBidskeyid: successfulBidskey,
        });
    };
    BidManager.prototype.readAllSuccessfulBids = function () {
        var successfulBids;
        firebase.database().ref('/successfulBids/').on('value', function (snapshot) {
            snapshot.forEach(function (snap) {
                successfulBids = snap.val();
                console.log(successfulBids);
                return false;
            });
        });
    };
    BidManager.prototype.readAllCancelledBids = function () {
        var cancelledBids;
        firebase.database().ref('/cancelledBids/').on('value', function (snapshot) {
            snapshot.forEach(function (snap) {
                cancelledBids = snap.val();
                console.log(cancelledBids);
                return false;
            });
        });
        if (cancelledBids != null) {
            return cancelledBids;
        }
    };
    // updatePlacedBid(bid: Bid,bidId: String, property: String, newVal: number) {
    //   var placedBidsRef = firebase.database().ref('/placedBids/');
    //   var placedBidskey = bid.getBidId();
    //   var userId = bid.getOwner().getUid();
    //   bid.setBidId(placedBidKeyBidskey);
    //   console.log(userId);
    //   bid.setViews();
    //   placedBidsRef.child("/" + placedBidskey).set({
    //     bid: bid,
    //   });
    // }
    BidManager.prototype.incrementViews = function (bid) {
        console.log(bid);
        var placedBidsRef = firebase.database().ref('/placedBids/');
        var placedBidskey = bid.getBidId();
        // bid.setBidId(placedBidskey);
        var views = bid.getViews();
        views++;
        bid.setViews(views);
        placedBidsRef.child("/" + placedBidskey).set({
            bid: bid,
        });
        var user = new __WEBPACK_IMPORTED_MODULE_1__user__["a" /* User */](bid.getOwner());
        console.log(user);
        var userBidsRef = firebase.database().ref('/userBids/' + user.getUid());
        userBidsRef.child('/' + placedBidskey + '/').set({
            bid: bid,
        });
    };
    BidManager.prototype.updateUserBid = function (userId, property, newVal) {
        var updates;
        updates['/userBids/' + userId + '/bid/' + property] = newVal;
        return firebase.database().ref().update(updates);
    };
    BidManager.prototype.writeBidOffer = function (offer, bidId) {
        var bidOfferRef = firebase.database().ref('/bidOffers/');
        var Offerkey = bidOfferRef.push().getKey();
        offer.setOfferId(Offerkey);
        console.log(offer);
        console.log(Offerkey);
        console.log(bidId);
        bidOfferRef.child('/' + bidId + '/' + Offerkey).set({
            offer: offer,
        });
    };
    BidManager.prototype.writeAcceptedBids = function (bid) {
        var acceptedBidsRef = firebase.database().ref('/acceptedBids/');
        var acceptedBidKey = bid.getBidId();
        bid.setStatus("completed");
        acceptedBidsRef.child('/' + acceptedBidKey + '/').set({
            bid: bid,
        });
    };
    BidManager.prototype.readBidOffer = function () {
        var bidOffer;
        firebase.database().ref('/bidOffers/').on('value', function (snapshot) {
            snapshot.forEach(function (snap) {
                bidOffer = snap.val();
                console.log(bidOffer);
                return false;
            });
        });
    };
    BidManager.prototype.readBidOffersById = function (bidId, consumedOfferData) {
        var _this = this;
        var g = 0;
        // var bidOffer: Offer;
        firebase.database().ref('/bidOffers/' + bidId).on('value', function (snapshot) {
            g = 0;
            snapshot.forEach(function (snap) {
                // var bidOffer = new Offer(snap.val().offer);
                _this.offerItems.push(snap.val().offer);
                console.log(snap.val().offer);
                console.log(snap.val().offer.bidId);
                _this.ownerArr.push(snap.val().offer.owner);
                _this.offerItemsMerchandise.push(snap.val().offer.items);
                _this.offerMechandiseArr.push(_this.offerItemsMerchandise[g][0]);
                console.log(_this.ownerArr[g].name);
                // console.log(owner);
                g++;
                return false;
            });
            // console.log(this.offerItems);
            // console.log(this.offerItemsMerchandise[0][0]);
            // console.log(this.offerMechandiseArr);
            // console.log(this.offerMechandiseArr[0].description);
            consumedOfferData(_this.offerItems, _this.ownerArr, _this.offerMechandiseArr);
        });
    };
    BidManager.prototype.readBidByOfferId = function (uid, bidId, consumedData) {
        firebase.database().ref('/bidOffers/' + +bidId).on('value', function (snapshot) {
        });
    };
    BidManager.prototype.updateOffer = function (bidId, property, newVal) {
        var updates;
        updates['/placedBids/' + bidId + '/bid/' + property] = newVal;
        return firebase.database().ref().update(updates);
    };
    BidManager.prototype.writeFlag = function (flag, bidId) {
        var bidFlagRef = firebase.database().ref('/bidFlags/');
        var bidFlagkey = bidFlagRef.push().getKey();
        flag.setBidId(bidId);
        console.log(flag);
        bidFlagRef.child('/' + bidId + '/' + bidFlagkey).set({
            flag: flag,
        });
    };
    BidManager.prototype.readAllBidFlags = function () {
        var flags;
        firebase.database().ref('/bidFlags/').on('value', function (snapshot) {
            snapshot.forEach(function (snap) {
                flags = snap.val();
                console.log(flags);
                return false;
            });
        });
        if (flags != null) {
            return flags;
        }
    };
    BidManager.prototype.readAllBidFlagsById = function (bidId, consumedFlagsData) {
        var flags = [];
        firebase.database().ref('/bidFlags/' + bidId).on('value', function (snapshot) {
            snapshot.forEach(function (snap) {
                flags.push(snap.val());
                console.log(flags);
                return false;
            });
        });
        if (flags != null) {
            consumedFlagsData(flags);
        }
    };
    BidManager.prototype.readBidFlagById = function (bidId) {
        var flag;
        firebase.database().ref('/bidFlags/' + bidId).on('value', function (snapshot) {
            snapshot.forEach(function (snap) {
                flag = snap.val();
                console.log(flag);
                return false;
            });
        });
        if (flag != null) {
            return flag;
        }
    };
    BidManager.prototype.writeDeviceData = function (userId) {
        var deviceRef = firebase.database().ref('/userDevices/');
        deviceRef.child("/" + userId + "/").set({
            uid: "not yet specified",
            deviceId: "not yet specified"
        });
    };
    BidManager.prototype.readDeviceData = function () {
        var deviceData = [];
        firebase.database().ref('/userDevices/').on('value', function (snapshot) {
            snapshot.forEach(function (snap) {
                deviceData.push(snap.val());
                console.log(deviceData);
                return false;
            });
        });
    };
    BidManager.prototype.readDeviceDataById = function (deviceId) {
        var deviceData = [];
        firebase.database().ref('/userDevices/' + deviceId).on('value', function (snapshot) {
            snapshot.forEach(function (snap) {
                deviceData.push(snap.val());
                console.log(deviceData);
                return false;
            });
        });
    };
    BidManager.prototype.cloneObject = function () {
        this.userBids;
        var bids = new __WEBPACK_IMPORTED_MODULE_0__bid__["a" /* Bid */](this.userBids);
        console.log(bids);
    };
    return BidManager;
}());

//# sourceMappingURL=bidManager.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Item; });
var Item = /** @class */ (function () {
    function Item(obj) {
        if (obj != null) {
            obj && Object.assign(this, obj);
        }
    }
    Item.prototype.setItemId = function (itemId) {
        //validate item id
        this.itemId = itemId;
    };
    Item.prototype.setType = function (type) {
        //validate item id
        this.type = type;
    };
    Item.prototype.setName = function (name) {
        //validate item id
        this.name = name;
    };
    Item.prototype.setImageUri = function (imageUri) {
        //validate item id
        this.imageUri = imageUri;
    };
    Item.prototype.setDescription = function (description) {
        this.description = description;
    };
    Item.prototype.getDescription = function () {
        return this.description;
    };
    Item.prototype.getItemId = function () {
        return this.itemId;
    };
    Item.prototype.getType = function () {
        return this.type;
    };
    Item.prototype.getName = function () {
        return this.name;
    };
    Item.prototype.getImageUri = function () {
        return this.imageUri;
    };
    return Item;
}());

//# sourceMappingURL=item.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Offer; });
var Offer = /** @class */ (function () {
    function Offer(obj) {
        if (obj != null) {
            obj && Object.assign(this, obj);
        }
    }
    Offer.prototype.setOfferId = function (offerId) {
        this.bidId = offerId;
    };
    Offer.prototype.getOfferId = function () {
        return this.bidId;
    };
    Offer.prototype.setItems = function (items) {
        this.items = items;
    };
    Offer.prototype.getItems = function () {
        return this.items;
    };
    Offer.prototype.setOwner = function (owner) {
        this.owner = owner;
    };
    Offer.prototype.getOwner = function () {
        return this.owner;
    };
    Offer.prototype.setOfferDate = function (date) {
        this.offerDate = date;
    };
    Offer.prototype.getOfferDate = function () {
        return this.offerDate;
    };
    return Offer;
}());

//# sourceMappingURL=offer.js.map

/***/ })

},[217]);
//# sourceMappingURL=main.js.map