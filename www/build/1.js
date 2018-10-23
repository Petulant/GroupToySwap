webpackJsonp([1],{

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile__ = __webpack_require__(312);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProfilePageModule = /** @class */ (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */]),
            ],
        })
    ], ProfilePageModule);
    return ProfilePageModule;
}());

//# sourceMappingURL=profile.module.js.map

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_profile_profile__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_user__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__upload_upload__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_bid__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_item__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_bid_info_bid_info__ = __webpack_require__(214);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ProfilePage = /** @class */ (function () {
    function ProfilePage(modalCtrl, navCtrl, navParams, profile) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.profile = profile;
        this.h = [];
        this.datalist = [];
        this.items = [];
        this.itemProfileImg = [];
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var d = [];
        if (this.profile.user != null) {
            this.username = this.profile.user.getUserName();
            this.email = this.profile.user.getEmail();
            this.surname = this.profile.user.getUid();
            this.profilePhoto = this.profile.user.getProfilePic();
            this.userType = this.profile.user.getType();
            firebase.database().ref('/userBids/' + this.profile.user.getUid()).on('value', function (snapshot) {
                snapshot.forEach(function (snap) {
                    var bid = new __WEBPACK_IMPORTED_MODULE_5__model_bid__["a" /* Bid */](snap.val().bid);
                    _this.h.push(bid);
                    _this.items.push(bid.getMerchandise());
                    var itemObj = new __WEBPACK_IMPORTED_MODULE_6__model_item__["a" /* Item */](bid.getMerchandise());
                    _this.itemProfileImg = itemObj.getImageUri();
                });
            });
            this.user = new __WEBPACK_IMPORTED_MODULE_3__model_user__["a" /* User */](null);
            this.user.setUserName(this.username);
            this.user.setEmail(this.email);
            if (this.user != null && this.user instanceof __WEBPACK_IMPORTED_MODULE_3__model_user__["a" /* User */]) {
                console.log("user is instance of user object");
            }
        }
        else {
            console.log("profile provider object is null, Reload the app");
        }
    };
    ProfilePage.prototype.userBidClick = function (obj) {
        console.log(obj);
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__pages_bid_info_bid_info__["a" /* BidInfoPage */], {
            item: obj,
        });
        modal.present();
    };
    ProfilePage.prototype.addItem = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__upload_upload__["a" /* UploadPage */]);
        modal.present();
    };
    ProfilePage.prototype.addUserItem = function () {
        this.navCtrl.push('AddUserItemPage');
    };
    ProfilePage.prototype.signOut = function () {
        var _this = this;
        firebase.auth().signOut().then(function (resp) {
            _this.navCtrl.setRoot("HomePage");
        }).catch(function (error) {
            // An error happened.
            console.log(error);
        });
    };
    ProfilePage.prototype.dash = function () {
        this.navCtrl.setRoot("DashboardPage");
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"C:\Users\codeTribe\Pictures\TOY APPLICATION\toySwap\src\pages\profile\profile.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-row>\n\n      <ion-title>Profile</ion-title>\n\n      <ion-col  col-2>\n\n        <button ion-button icon-only  clear medium (click) = "signOut();">\n\n          <ion-icon name = "log-out" ></ion-icon>\n\n        </button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <div id="header">\n\n    <ion-fab id = "cont" >\n\n      <button ion-fab id = "myFab" >\n\n        <img src="{{profilePhoto}}" alt="">\n\n      </button>\n\n      <ion-fab-list side="left">\n\n        <button ion-fab><ion-icon name="images"></ion-icon></button>\n\n      </ion-fab-list>\n\n      <ion-fab-list side="top">\n\n        <button ion-fab><ion-icon name="camera"></ion-icon></button>\n\n      </ion-fab-list>\n\n      <ion-fab-list side="right">\n\n        <button ion-fab><ion-icon name="link"></ion-icon></button>\n\n      </ion-fab-list>\n\n    </ion-fab>\n\n    <div id="username">{{username}}</div>\n\n  </div>\n\n\n\n  <ion-list id = "posts">\n\n    <ion-list-header>\n\n      recent posts | tap item for more info\n\n    </ion-list-header>\n\n    <ion-item *ngFor= "let bid of h; let i = index" (click)="userBidClick(bid)">\n\n      <ion-avatar item-start>\n\n        <img src={{itemProfileImg[0]}}>\n\n      </ion-avatar>\n\n      <p>{{items[i].name}}</p>\n\n      <p>{{items[i].description}}</p>\n\n    </ion-item>\n\n  </ion-list>\n\n  <ion-fab bottom right>\n\n    <button ion-fab color = "dark" (click) = "dash();" *ngIf = "userType == \'admin\'"><ion-icon name="options"></ion-icon></button>\n\n  </ion-fab>\n\n  \n\n  \n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\codeTribe\Pictures\TOY APPLICATION\toySwap\src\pages\profile\profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_profile_profile__["a" /* ProfileProvider */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ })

});
//# sourceMappingURL=1.js.map