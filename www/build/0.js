webpackJsonp([0],{

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SplashPageModule", function() { return SplashPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__splash__ = __webpack_require__(313);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SplashPageModule = /** @class */ (function () {
    function SplashPageModule() {
    }
    SplashPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__splash__["a" /* SplashPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__splash__["a" /* SplashPage */]),
            ],
        })
    ], SplashPageModule);
    return SplashPageModule;
}());

//# sourceMappingURL=splash.module.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplashPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_profile_profile__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_user__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_bidManager__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SplashPage = /** @class */ (function () {
    function SplashPage(profile, navCtrl, navParams) {
        /*
        firebase.auth().onAuthStateChanged( user => {
          if (user) {
            // User is signed in.
            console.log("user in");
            
            console.log(user.displayName);
            this.currentUser = new User(null);
            this.currentUser.setUid(user.uid)
            this.currentUser.setUserName(user.displayName);
            this.currentUser.setEmail(user.email);
            this.currentUser.setProfilePic(user.photoURL);
            this.currentUser.setType("user");
    
            profile.user = this.currentUser;
            navCtrl.setRoot("FeedPage");
          } else {
            // No user is signed in.
            console.log("user out");
          }
        });
    
        */
        var _this = this;
        this.profile = profile;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                if (user.displayName != null) {
                    _this.currentUser = new __WEBPACK_IMPORTED_MODULE_3__model_user__["a" /* User */](null);
                    _this.currentUser.setUid(user.uid);
                    _this.currentUser.setUserName(user.displayName);
                    _this.currentUser.setEmail(user.email);
                    _this.currentUser.setProfilePic(user.photoURL);
                    var type = _this.getTypeForGoogle(user.uid);
                    _this.currentUser.setType(type);
                    profile.user = _this.currentUser;
                }
                else {
                    var bidFactory = new __WEBPACK_IMPORTED_MODULE_4__model_bidManager__["a" /* BidManager */]();
                    bidFactory.getUserById(user.uid, function (user) {
                        profile.user = user;
                    });
                }
                navCtrl.setRoot("FeedPage");
            }
            else {
                // No user is signed in.
                //navCtrl.setRoot("HomePage");
                console.log("user out");
            }
        });
    }
    SplashPage.prototype.getTypeForGoogle = function (key) {
        var type;
        firebase.database().ref('/users/' + key).on('value', function (userSnapshot) {
            console.log(userSnapshot.val().type);
            type = userSnapshot.val().type;
        });
        return type;
    };
    SplashPage.prototype.start = function () {
        this.navCtrl.setRoot("HomePage");
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */])
    ], SplashPage.prototype, "slides", void 0);
    SplashPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-splash',template:/*ion-inline-start:"C:\Users\PC\Desktop\toySwap\src\pages\splash\splash.html"*/'<ion-content padding>\n\n  <div id="detail">\n\n    \n\n  </div>\n\n  <ion-slides pager = "true">\n\n    <ion-slide>\n\n      <img src="../../assets/imgs/online-payment.svg" class="ic">\n\n      <h5>instant bidding on the tip of your fingers</h5>\n\n    </ion-slide>\n\n    <ion-slide>\n\n      <img src="../../assets/imgs/location.svg" class="ic">\n\n      <h5>get great deals around your area</h5>\n\n    </ion-slide>\n\n    <ion-slide>\n\n      <img src="../../assets/imgs/search.svg" class="ic">\n\n      <h5>search through a range of items</h5>\n\n    </ion-slide>\n\n  </ion-slides>\n\n  <div id="splash-logo"></div>\n\n  <button id = "start" ion-button color = "secondary" (click) = "start();" >start</button>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\PC\Desktop\toySwap\src\pages\splash\splash.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_profile_profile__["a" /* ProfileProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], SplashPage);
    return SplashPage;
}());

//# sourceMappingURL=splash.js.map

/***/ })

});
//# sourceMappingURL=0.js.map