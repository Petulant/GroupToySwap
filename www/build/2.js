webpackJsonp([2],{

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapboxPageModule", function() { return MapboxPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mapbox__ = __webpack_require__(311);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MapboxPageModule = /** @class */ (function () {
    function MapboxPageModule() {
    }
    MapboxPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__mapbox__["a" /* MapboxPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__mapbox__["a" /* MapboxPage */]),
            ],
        })
    ], MapboxPageModule);
    return MapboxPageModule;
}());

//# sourceMappingURL=mapbox.module.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapboxPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(215);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MapboxPage = /** @class */ (function () {
    function MapboxPage(geolocation, navCtrl, navParams) {
        this.geolocation = geolocation;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.lat = -25.7516976;
        this.long = 28.2632217;
    }
    MapboxPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var watch = this.geolocation.watchPosition();
        watch.subscribe(function (data) {
            // data can be a set of coordinates, or an error (if an error occurred).
            // data.coords.latitude
            console.log(" data.coords.latitude");
            console.log(data.coords.latitude);
            _this.lat = data.coords.latitude;
            console.log(" data.coords.longitude");
            console.log(data.coords.longitude);
            _this.long = data.coords.longitude;
        }, function (err) {
            console.log(err);
        });
        mapboxgl.accessToken = 'pk.eyJ1IjoiaW9uLWRldnMiLCJhIjoiY2puazR4ajNxMTBheTNwdGF2aTBzb2lidCJ9.0ufGeZk9qOrbp_pPPc0NlA';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [-79.4512, 43.6568],
            zoom: 18 // starting zoom
        });
        map.addControl(new MapboxDirections({
            accessToken: mapboxgl.accessToken
        }), 'top-left');
    };
    MapboxPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mapbox',template:/*ion-inline-start:"C:\Users\codeTribe\Pictures\TOY APPLICATION\toySwap\src\pages\mapbox\mapbox.html"*/'<script src=\'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v3.1.3/mapbox-gl-directions.js\'></script>\n\n<link rel=\'stylesheet\' href=\'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v3.1.3/mapbox-gl-directions.css\' type=\'text/css\' />\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>mapbox</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <div id=\'map\' style=\'width: 100vw; height: calc(100vh - 56px);\'></div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\codeTribe\Pictures\TOY APPLICATION\toySwap\src\pages\mapbox\mapbox.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], MapboxPage);
    return MapboxPage;
}());

//# sourceMappingURL=mapbox.js.map

/***/ })

});
//# sourceMappingURL=2.js.map