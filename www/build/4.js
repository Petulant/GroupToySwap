webpackJsonp([4],{

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPageModule", function() { return DashboardPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard__ = __webpack_require__(309);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DashboardPageModule = /** @class */ (function () {
    function DashboardPageModule() {
    }
    DashboardPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__dashboard__["a" /* DashboardPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__dashboard__["a" /* DashboardPage */]),
            ],
        })
    ], DashboardPageModule);
    return DashboardPageModule;
}());

//# sourceMappingURL=dashboard.module.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
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


var DashboardPage = /** @class */ (function () {
    function DashboardPage(navCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.month = "All time";
        this.numOfResults = 15;
        this.activeBids = [];
        this.closedBids = [];
        this.dispList = [];
        this.filteredList = [];
        this.users = [];
        this.months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        this.selectOptions = {
            subTitle: 'choose duration of report',
        };
        this.activeScreen = 2;
        //fetch all users
        firebase.database().ref('/users/').on('value', function (snapshot) {
            _this.users = [];
            snapshot.forEach(function (snap) {
                _this.users.push(snap.val());
                return false;
            });
            console.log(_this.users);
            _this.users.reverse();
        });
        //fetch active bids
        firebase.database().ref('/activeBids/').on('value', function (snapshot) {
            _this.activeBids = [];
            snapshot.forEach(function (snap) {
                _this.activeBids.push(snap.val());
                return false;
            });
            console.log("active");
            console.log(_this.activeBids);
            _this.activeBids.reverse();
        });
        //fetch closed bids
        firebase.database().ref('/userSuccessfulBids/').equalTo('').on('value', function (snapshot) {
            _this.closedBids = [];
            snapshot.forEach(function (snap) {
                _this.closedBids.push(snap.val());
                return false;
            });
            console.log("closed");
            console.log(_this.closedBids);
            _this.closedBids.reverse();
        });
        this.dispList = this.activeBids.concat(this.closedBids);
    }
    DashboardPage.prototype.toggleScreens = function (x) {
        this.activeScreen = x;
        console.log(x);
    };
    DashboardPage.prototype.onChange = function () {
        this.filterData(this.month);
    };
    DashboardPage.prototype.filterData = function (month) {
        this.dispList = this.closedBids.concat(this.activeBids);
        if (this.numOfResults >= this.dispList.length) {
            console.log("if");
            this.filteredList = [];
            for (var i = 0; i < this.dispList.length; i++) {
                var d = new Date(this.dispList[i].bid.bidDate);
                var monthInt = d.getMonth();
                var month_1 = this.months[monthInt];
                console.log(month_1);
                if (this.month != "All time" && month_1 == this.month) {
                    this.filteredList.push(this.dispList[i]);
                }
                if (this.month == "All time") {
                    this.filteredList.push(this.dispList[i]);
                }
                console.log(this.filteredList);
            }
        }
        else {
            console.log("else");
            this.filteredList = [];
            for (var x = 0; x < this.numOfResults; x++) {
                this.filteredList.push(this.dispList[x]);
            }
            console.log(this.filteredList);
        }
        var close = 0;
        var open = 0;
        console.log("close " + close);
        console.log("open " + open);
    };
    DashboardPage.prototype.home = function () {
        this.navCtrl.setRoot('FeedPage');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('barCanvas'),
        __metadata("design:type", Object)
    ], DashboardPage.prototype, "barCanvas", void 0);
    DashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dashboard',template:/*ion-inline-start:"C:\Users\codeTribe\Pictures\TOY APPLICATION\toySwap\src\pages\dashboard\dashboard.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-row>\n\n      <ion-col col-2>\n\n        <button class = "cb" icon-only clear (click) = "home();"><ion-icon name = "home"></ion-icon></button>\n\n      </ion-col>\n\n      <ion-col col-8><div id="dashlogo"></div></ion-col>\n\n      <ion-col col-2>\n\n        <button class = "cb" icon-only clear><ion-icon name = "more"></ion-icon></button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-navbar>\n\n  <ion-row>\n\n    <ion-col col-4>\n\n      <button small ion-button full clear (click) = "toggleScreens(1);">flagged</button>\n\n      <div class="activieScreen" *ngIf = "activeScreen == 1"></div>\n\n    </ion-col>\n\n    <ion-col col-4>\n\n      <button small ion-button full clear (click) = "toggleScreens(2);">active bids</button>\n\n      <div class="activieScreen" *ngIf = "activeScreen == 2"></div>\n\n    </ion-col>\n\n    <ion-col col-4>\n\n      <button small ion-button full clear (click) = "toggleScreens(3);">users</button>\n\n      <div class="activieScreen" *ngIf = "activeScreen == 3"></div>\n\n    </ion-col>\n\n  </ion-row>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <div *ngIf = "activeScreen == 1">\n\n    <h5>flags</h5>\n\n  </div>\n\n  <div *ngIf = "activeScreen == 2">\n\n      \n\n      <ion-list>\n\n          <ion-item>\n\n              <ion-label floating>period in months</ion-label>\n\n              <ion-select (ionChange)="onChange();" [selectOptions]="selectOptions" [(ngModel)]="month">\n\n                <ion-option value="All time">All</ion-option>\n\n                <ion-option value="January">January</ion-option>\n\n                <ion-option value="February">February</ion-option>\n\n                <ion-option value="March">March</ion-option>\n\n                <ion-option value="April">April</ion-option>\n\n                <ion-option value="June">June</ion-option>\n\n                <ion-option value="July">July</ion-option>\n\n                <ion-option value="August">August</ion-option>\n\n                <ion-option value="September">September</ion-option>\n\n                <ion-option value="October">October</ion-option>\n\n                <ion-option value="November">November</ion-option>\n\n                <ion-option value="December">December</ion-option>\n\n              </ion-select>\n\n          </ion-item>\n\n          <br>\n\n          <ion-list-header>\n\n             results per page\n\n            <ion-badge item-start>{{numOfResults}}</ion-badge>\n\n            <ion-icon small item-end name="options"></ion-icon>\n\n          </ion-list-header>\n\n          <ion-item>\n\n            <ion-range [(ngModel)]="numOfResults" (ionChange)="onChange();" min="1" max="10" pin="true">\n\n              <ion-label range-left>1</ion-label>\n\n              <ion-label range-right>10</ion-label>\n\n            </ion-range>\n\n          </ion-item>\n\n      </ion-list>\n\n      <ion-card>\n\n        <div id="chart_div"></div>\n\n      </ion-card> \n\n\n\n      <ion-item *ngFor = "let item of filteredList; let ind = index">\n\n        <ion-avatar item-start>\n\n          <img src="../assets/imgs/logo.png">\n\n        </ion-avatar>\n\n        <h2>({{ind + 1}})</h2>\n\n        <p>41 views</p>\n\n      </ion-item>\n\n  </div>\n\n  <div *ngIf = "activeScreen == 3">\n\n    <ion-list>\n\n      <ion-list-header>\n\n        Active users\n\n      </ion-list-header>\n\n      <ion-item-sliding *ngFor = "let user of users; let ind = index">\n\n        <ion-item>\n\n          <ion-avatar item-start>\n\n            <img src="{{user.profilePic}}">\n\n          </ion-avatar>\n\n          <h2>{{user.name}}</h2>\n\n        </ion-item>\n\n        <ion-item-options side="right">\n\n          <button ion-button color="primary">\n\n            <ion-icon name="close"></ion-icon>\n\n            Block\n\n          </button>\n\n          <button ion-button color="danger">\n\n            <ion-icon name="trash"></ion-icon>\n\n            Delete\n\n          </button>\n\n        </ion-item-options>\n\n      </ion-item-sliding>\n\n    </ion-list>\n\n  </div>\n\n  \n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\codeTribe\Pictures\TOY APPLICATION\toySwap\src\pages\dashboard\dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], DashboardPage);
    return DashboardPage;
}());

//# sourceMappingURL=dashboard.js.map

/***/ })

});
//# sourceMappingURL=4.js.map