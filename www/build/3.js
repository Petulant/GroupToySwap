webpackJsonp([3],{

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home__ = __webpack_require__(310);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]),
            ],
        })
    ], HomePageModule);
    return HomePageModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_user__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_profile_profile__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = /** @class */ (function () {
    function HomePage(alertCtrl, toastCtrl, navCtrl, navParams, fb, profile, loadingCtrl) {
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.profile = profile;
        this.loadingCtrl = loadingCtrl;
        this.counter = 0;
        //error messages
        this.validation_messages = {
            'name': [
                { type: 'required', message: 'first name names is required.' },
                { type: 'minlength', message: 'first name must be at least 1 characters long.' },
                { type: 'maxlength', message: 'first name cannot be more than 50 characters long.' }
            ],
            'surname': [
                { type: 'required', message: 'surname is required.' },
                { type: 'minlength', message: 'surname must be at least 1 characters long.' },
                { type: 'maxlength', message: 'surname cannot be more than 50 characters long.' }
            ],
            'email': [
                { type: 'required', message: 'email is required.' },
                { type: 'minlength', message: 'email must be at least 5 characters long.' },
                { type: 'maxlength', message: 'email cannot be more than 25 characters long.' },
                { type: 'pattern', message: 'Your email must contain only numbers and letters.' },
                { type: 'validUsername', message: 'Your email has already been taken.' }
            ],
            'pass': [
                { type: 'required', message: 'Password is required.' }
            ],
            'confirmpass': [
                { type: 'required', message: 'Confirm Password is required.' }
            ],
        };
        //log in formgroup
        this.logInForm = this.fb.group({
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(25),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(5),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required
            ])),
            pass: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(5),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
            ]))
        });
        //register formgroup
        this.registerForm = this.fb.group({
            name: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(50),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(1),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required
            ])),
            surname: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(50),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(1),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required
            ])),
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(25),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(5),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required
            ])),
            pass: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(5),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
            ])),
            cpass: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(5),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
            ]))
        });
    }
    HomePage.prototype.toggle = function (x) {
        if (x) {
            this.slides.slideTo(1, 300);
        }
        else {
            this.slides.slideTo(0, 300);
        }
    };
    HomePage.prototype.login = function () {
        var _this = this;
        if (this.logInForm.value.email != "" && this.logInForm.value.pass != "") {
            this.loading = this.loadingCtrl.create({
                content: 'Signing in, Please wait...'
            });
            this.loading.present();
            firebase.auth().signInWithEmailAndPassword(this.logInForm.value.email, this.logInForm.value.pass).then(function (user) {
                _this.instatiateUserObj(firebase.auth().currentUser.uid);
            }).catch(function (err) {
                console.log(err.code);
                if (err.code == "auth/user-not-found") {
                    _this.presentToast("create an account before login");
                }
                if (err.code == "auth/wrong-password" || err.code == "auth/invalid-email") {
                    _this.presentToast("The email or password you entered is invalid");
                }
                _this.loading.dismiss();
            });
        }
        else {
            this.presentToast("Fill in your credentials first");
        }
    };
    HomePage.prototype.googleSign = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Signing into your account, Please wait...'
        });
        this.loading.present();
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (user) {
            console.log("signed in");
            var currentUser = new __WEBPACK_IMPORTED_MODULE_3__model_user__["a" /* User */](null);
            currentUser.setUid(user.user.uid);
            currentUser.setUserName(user.user.displayName);
            currentUser.setEmail(user.user.email);
            currentUser.setProfilePic(user.user.photoURL);
            currentUser.setType("user");
            _this.profile.user = currentUser;
            firebase.database().ref('/users/' + (user.user.uid)).set(currentUser);
            _this.loading.dismiss();
            _this.navCtrl.setRoot('FeedPage');
        }).catch(function (error) {
            console.log(error.message);
            _this.loading.dismiss();
        });
    };
    HomePage.prototype.register = function () {
        var _this = this;
        if (this.registerForm.value.pass != this.registerForm.value.cpass) {
            this.presentToast("Your Passwords dont match");
        }
        if (this.registerForm.value.name != "" && this.registerForm.value.surname != "" && this.registerForm.value.email != "" && this.registerForm.value.pass != "") {
            this.loading = this.loadingCtrl.create({
                content: 'Creating your account, Please wait...'
            });
            this.loading.present();
            var user;
            user = new __WEBPACK_IMPORTED_MODULE_3__model_user__["a" /* User */](null);
            user.setUserName(this.registerForm.value.name + " " + this.registerForm.value.surname);
            user.setEmail(this.registerForm.value.email);
            user.setType("user");
            user.setProfilePic("../assets/imgs/user.svg");
            this.profile.user = user;
            firebase.auth().createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.pass).then(function (data) {
                user.setUid(data.user.uid);
                firebase.database().ref('/users/' + (data.user.uid)).set(user);
                _this.loading.dismiss();
                _this.navCtrl.setRoot('FeedPage');
            }).catch(function (err) {
                console.log(err.code);
                _this.loading.dismiss();
                if (err.code == "auth/wrong-password" || err.code == "auth/invalid-email") {
                    _this.presentToast("The email or password you entered is invalid");
                }
                if (err.code == "auth/email-already-in-use") {
                    _this.presentToast("Account already exist");
                }
            });
        }
        else {
            this.presentToast("Complete form first");
        }
    };
    HomePage.prototype.instatiateUserObj = function (key) {
        var _this = this;
        firebase.database().ref('/users/' + key).on('value', function (userSnapshot) {
            _this.user = new __WEBPACK_IMPORTED_MODULE_3__model_user__["a" /* User */](null);
            _this.user.setUid(userSnapshot.val().uid);
            _this.user.setEmail(userSnapshot.val().email);
            _this.user.setUserName(userSnapshot.val().name);
            _this.user.setType(userSnapshot.val().type);
            _this.user.setProfilePic(userSnapshot.val().profilePic);
            _this.profile.user = _this.user;
            console.log(_this.user.getType());
            _this.loading.dismiss();
            _this.navCtrl.setRoot('FeedPage');
            /*
            if(this.user.getType() == "user"){
              this.loading.dismiss();
              
            }else if(this.user.getType() != "user"){
              this.loading.dismiss();
              this.navCtrl.setRoot('DashboardPage');
            }
            */
        });
    };
    HomePage.prototype.resetPassword = function (email) {
        var _this = this;
        if (email != "") {
            var auth = firebase.auth();
            auth.sendPasswordResetEmail(email).then(function (res) {
                _this.presentToast("Email Sent, check your email");
            }).catch(function (error) {
                _this.presentToast(error.message);
            });
        }
        else {
            this.presentToast("Email not sent");
        }
    };
    HomePage.prototype.presentToast = function (message) {
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
    HomePage.prototype.showPrompt = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            subTitle: "Reset Password",
            message: "A link to reset your password will be sent to your email",
            inputs: [
                {
                    name: 'email',
                    placeholder: 'e.g user@mail.com',
                    type: "email"
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Reset',
                    handler: function (data) {
                        _this.resetPassword(data.email);
                    }
                }
            ]
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */])
    ], HomePage.prototype, "slides", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\PC\Desktop\toySwap\src\pages\home\home.html"*/'<ion-content padding id="bg">\n\n\n\n	<div id="blur">\n\n		\n\n	</div>\n\n	<div id="logo">\n\n		\n\n	</div>\n\n	<ion-slides class = "sl">\n\n\n\n		<!--login form -->\n\n		<ion-slide class = "swiper-no-swiping">\n\n			<div id="heading">Sign in to toySwap</div>\n\n			<form [formGroup]="logInForm" class = "form">\n\n				<ion-item class="clear">\n\n					<ion-label stacked class="lb">Email</ion-label>\n\n					<ion-input type="text" formControlName="email" class="tb" ></ion-input>\n\n				</ion-item>\n\n				<br>\n\n				<div class="validation-errors">\n\n					<ng-container *ngFor="let validation of validation_messages.email">\n\n						<div class="error-message" *ngIf="logInForm.get(\'email\').hasError(validation.type) && (logInForm.get(\'email\').dirty || logInForm.get(\'email\').touched)">\n\n							{{ validation.message }}\n\n						</div>\n\n					</ng-container>\n\n				</div>\n\n\n\n				<ion-item class="clear">\n\n					<ion-label stacked class="lb">Password</ion-label>\n\n					<ion-input type="password" formControlName="pass" class="tb"></ion-input>\n\n				</ion-item>\n\n				<br>\n\n				<div class="validation-errors">\n\n					<ng-container *ngFor="let validation of validation_messages.pass">\n\n						<div class="error-message" *ngIf="logInForm.get(\'pass\').hasError(validation.type) && (logInForm.get(\'pass\').dirty || logInForm.get(\'pass\').touched)">\n\n							{{ validation.message }}\n\n						</div>\n\n					</ng-container>\n\n				</div>\n\n\n\n				<ion-row>\n\n					<ion-col>\n\n						<button ion-button full (click)="toggle(true);" class="bt">create account</button>\n\n					</ion-col>\n\n					<ion-col>\n\n						<button ion-button full (click)="login();" class="bt">login</button>\n\n					</ion-col>\n\n				</ion-row>\n\n				<ion-row>\n\n					<ion-col>\n\n						<button id = "reset" (click) = "showPrompt();">forgot your password?</button>\n\n					</ion-col>\n\n				</ion-row>\n\n\n\n				<ion-row>\n\n					<h2>or sign in with your google account</h2>\n\n				</ion-row>\n\n			\n\n			<div id = "flex">\n\n				<button ion-fab color = "google" (click) = "googleSign();">\n\n						<ion-icon name="logo-google" color = "googlered"></ion-icon>\n\n				</button>\n\n			</div>\n\n			\n\n			</form>\n\n		</ion-slide>\n\n\n\n		<!--register form-->\n\n\n\n		<ion-slide  class = "swiper-no-swiping">\n\n			<div id="heading">Create a new account</div>\n\n			<form [formGroup]="registerForm" class = "form">\n\n				<ion-item class="clear">\n\n					<ion-label stacked class="lb">First Name</ion-label>\n\n					<ion-input type="text" formControlName="name" class="tb"></ion-input>\n\n				</ion-item>\n\n\n\n				<div class="validation-errors">\n\n					<ng-container *ngFor="let validation of validation_messages.name">\n\n						<div class="error-message" *ngIf="registerForm.get(\'name\').hasError(validation.type) && (registerForm.get(\'name\').dirty || registerForm.get(\'name\').touched)">\n\n							{{ validation.message }}\n\n						</div>\n\n					</ng-container>\n\n				</div>\n\n\n\n				<ion-item class="clear">\n\n					<ion-label stacked class="lb">Surname</ion-label>\n\n					<ion-input type="text" formControlName="surname" class="tb"></ion-input>\n\n				</ion-item>\n\n\n\n				<div class="validation-errors">\n\n					<ng-container *ngFor="let validation of validation_messages.name">\n\n						<div class="error-message" *ngIf="registerForm.get(\'surname\').hasError(validation.type) && (registerForm.get(\'surname\').dirty || registerForm.get(\'surname\').touched)">\n\n							{{ validation.message }}\n\n						</div>\n\n					</ng-container>\n\n				</div>\n\n	\n\n				<ion-item class="clear">\n\n					<ion-label stacked class="lb">Email</ion-label>\n\n					<ion-input type="email" formControlName="email" class="tb"></ion-input>\n\n				</ion-item>\n\n\n\n				<div class="validation-errors">\n\n					<ng-container *ngFor="let validation of validation_messages.email">\n\n						<div class="error-message" *ngIf="registerForm.get(\'email\').hasError(validation.type) && (registerForm.get(\'email\').dirty || registerForm.get(\'email\').touched)">\n\n							{{ validation.message }}\n\n						</div>\n\n					</ng-container>\n\n				</div>\n\n				<ion-item class="clear">\n\n					<ion-label stacked class="lb">Password</ion-label>\n\n					<ion-input type="password" formControlName="pass" class="tb"></ion-input>\n\n				</ion-item>\n\n\n\n				<div class="validation-errors">\n\n					<ng-container *ngFor="let validation of validation_messages.pass">\n\n						<div class="error-message" *ngIf="registerForm.get(\'pass\').hasError(validation.type) && (registerForm.get(\'pass\').dirty || registerForm.get(\'pass\').touched)">\n\n							{{ validation.message }}\n\n						</div>\n\n					</ng-container>\n\n				</div>\n\n\n\n				<ion-item class="clear">\n\n					<ion-label stacked class="lb">Confirm Password</ion-label>\n\n					<ion-input type="password" formControlName="cpass" class="tb"></ion-input>\n\n				</ion-item>\n\n\n\n				<div class="validation-errors">\n\n					<ng-container *ngFor="let validation of validation_messages.pass">\n\n						<div class="error-message" *ngIf="registerForm.get(\'cpass\').hasError(validation.type) && (registerForm.get(\'cpass\').dirty || registerForm.get(\'cpass\').touched)">\n\n							{{ validation.message }}\n\n						</div>\n\n					</ng-container>\n\n				</div>\n\n				<ion-row>\n\n					<ion-col>\n\n						<button ion-button full (click)="toggle(false);" class="bt">go to login</button>\n\n					</ion-col>\n\n					<ion-col>\n\n						<button ion-button full class="bt" (click)="register();">sign up</button>\n\n					</ion-col>\n\n				</ion-row>\n\n			</form>\n\n\n\n		</ion-slide>\n\n\n\n	</ion-slides>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\PC\Desktop\toySwap\src\pages\home\home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4__providers_profile_profile__["a" /* ProfileProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

});
//# sourceMappingURL=3.js.map