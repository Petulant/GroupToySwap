import { Bid } from "./bid";
import { User } from "./user";
import { Item } from "./item";
import { Offer } from "./offer";
import { ProfileProvider } from "../providers/profile/profile";
import { Flag } from "./flag";
declare var firebase;
export class BidManager {

  private bid: Bid;
  bidder: User;
  private upload;
  bidDate: Date;
  itemObj;


  constructor() {

  }
  // this.uid,this.username,this.imgUrl,this.title,this.description, this.toyType
  // this.status,this.bidderUid,this.duration,this.bidDate,this.profilePicture,this.views
  perfomBid(bid: Bid, bidder: User) {
    bid.setBidder(bidder);
    firebase.database().ref('/closeBids/').push(
      {
        bid: bid
      }
    );
  }

  writePlacedBid(bid: Bid) {

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

  }

  writeUserBid(bid: Bid) {
    var userId = bid.getOwner().getUid();
    var bidId = bid.getBidId();
    var userBidsRef = firebase.database().ref('/userBids/');
    bid.setOffers(null);
    console.log(userId);
    console.log(bid);
    userBidsRef.child('/' + userId + '/' + bidId).set({
      bid: bid,
    });
  }
  delay() {
    // `delay` returns a promise
    return new Promise(function (resolve, reject) {
      // Only `delay` is able to resolve or reject the promise
      setTimeout(function () {
        resolve(42); // After 3 seconds, resolve the promise with value 42
      }, 3000);
    });
  }
  userBids: Object;
  dataList  = [];
  mySandwich(param1, param2, callback) {
    alert('Started eating my sandwich.\n\nIt has: ' + param1 + ', ' + param2);
    callback();
  }
  getUserBidsById(userId: String,callback) {
    // var userBidObjArr = {};
    // var dataList: Bid[] = [];
    // firebase.database().ref('/userBids/' + userId).on('value', (snapshot) => {
    //   snapshot.forEach(snap => {
    //     this.userBids = snap.val().bid;
    //     var bid = new Bid(this.userBids);
    //     userBidObjArr = bid;
    //     // var bid2 = bid;
    //     dataList.push(bid);

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
 

    firebase.database().ref('/userBids/' + userId).on('value', (snapshot) => {
      snapshot.forEach(snap => {
        console.log(snap)
        console.log(snap.val())
        this.userBids = snap.val().bid;
        var bid = new Bid(this.userBids);
        userBidObjArr = bid;
        // var bid2 = bid;
        this.dataList.push(bid);

        console.log(this.dataList);

      });
      // console.log(dataList.length);
      alert('Started eating my sandwich');
      callback( this.dataList);
    });
    // setTimeout(function() {
    //   resolve(42); // After 3 seconds, resolve the promise with value 42
    // }, 3000);
    // return new Promise(function (resolve, reject)  {
    //  }).then(value =>{
    //   return this.dataList;
    //   console.log("-----------------");
    // });

  }

  getAllPlacedBids() {

    var placedBidObject: Object;
    firebase.database().ref('/placedBids/').on('value', (snapshot) => {
      snapshot.forEach(snap => {
        placedBidObject = snap.val();
        console.log(placedBidObject);
        return false;
      });
    });
    if (placedBidObject != null) {
      return placedBidObject;
    }
  }

  getBidById(bidId: String) {
    var fireBaseBidObject: Object;
    firebase.database().ref('/placedBids/' + bidId).on('value', (snapshot) => {
      snapshot.forEach(snap => {
        console.log("------------------------------------------------------------");
        fireBaseBidObject = snap.val();
        console.log(fireBaseBidObject);
        return false;
      });
    });
    if (fireBaseBidObject != null) {
      return fireBaseBidObject;
    }
  }

  writeUserCancelledBids(bid: Bid) {

    //cancelled
    var cancelledBidsRef = firebase.database().ref('/userCancelledBids/');
    var cancelledBidskey = bid.getBidId();
    var userId = bid.getOwner().getUid();

    bid.setBidId(cancelledBidskey);
    console.log(userId);
    cancelledBidsRef.child("/" + userId).set({
      bid: bid,
    });

  }
  readUserCancelledBids(userId: String) {
    var successfulBids: Object;
    firebase.database().ref('/userCancelledBids/' + userId).on('value', (snapshot) => {
      snapshot.forEach(snap => {
        successfulBids = snap.val();
        console.log(successfulBids);
        return false;
      });
    });
  }
  writeUserSuccessfullBids(bid: Bid) {

    //cancelled
    var userSuccessfulBidsRef = firebase.database().ref('/userSuccessfulBids/');
    var userSuccessFulBidskey = bid.getBidId();
    var userId = bid.getOwner().getUid();
    bid.setBidId(userSuccessFulBidskey);
    console.log(userId);
    userSuccessfulBidsRef.child("/" + userId).set({
      bid: bid,
    });

  }
  readUserSuccesfullBids(userId: String) {

    var successfulBids: Object;
    firebase.database().ref('/userSuccessfulBids/' + userId).on('value', (snapshot) => {
      snapshot.forEach(snap => {
        successfulBids = snap.val();
        console.log(successfulBids);
        return false;
      });
    });

  }
  writeAllCancelled(cancelledBid: Bid) {
    var userId = cancelledBid.getOwner().getUid();
    var allCancelledBidsRef = firebase.database().ref('/cancelledBids/');
    var cancelledBidskey = cancelledBid.getBidId();

    // userBidsRef.child('/' + userId + '/' + bidId).set({

    console.log(cancelledBidskey);
    allCancelledBidsRef.child('/' + userId + '/' + cancelledBidskey).set({
      cancelledBid: cancelledBid,
    });
  }

  writeAllSuccessful(successfulBid: Bid) {

    var allSuccessfulBidsRef = firebase.database().ref('/successfulBids/');
    var successfulBidskey = allSuccessfulBidsRef.getBidId();

    console.log(successfulBidskey);
    allSuccessfulBidsRef.child('/' + successfulBid + '/').set({
      bsuccessfulBidskeyid: successfulBidskey,
    });
  }
  readAllSuccessfulBids() {
    var successfulBids: Object;
    firebase.database().ref('/successfulBids/').on('value', (snapshot) => {
      snapshot.forEach(snap => {
        successfulBids = snap.val();
        console.log(successfulBids);
        return false;
      });
    });
  }
  readAllCancelledBids() {
    var cancelledBids: Object;
    firebase.database().ref('/cancelledBids/').on('value', (snapshot) => {
      snapshot.forEach(snap => {
        cancelledBids = snap.val();
        console.log(cancelledBids);
        return false;
      });
    });
    if (cancelledBids != null) {
      return cancelledBids;
    }
  }
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
  incrementViews(bid: Bid) {
    console.log(bid)
    var placedBidsRef = firebase.database().ref('/placedBids/');
    var placedBidskey = bid.getBidId();
    // bid.setBidId(placedBidskey);
    var views = bid.getViews();
    views++;
    bid.setViews(views);
    placedBidsRef.child("/" + placedBidskey).set({
      bid: bid,
    });

    var user = new User(bid.getOwner());
    console.log(user);
    var userBidsRef = firebase.database().ref('/userBids/' + user.getUid());
    userBidsRef.child('/' + placedBidskey + '/').set({
      bid: bid,
    });
  }
  updateUserBid(userId: String, property: String, newVal: String) {
    var updates: Object;
    updates['/userBids/' + userId + '/bid/' + property] = newVal;
    return firebase.database().ref().update(updates);
  }
  writeBidOffer(offer: Offer, bidId: String) {

    var bidOfferRef = firebase.database().ref('/bidOffers/');
    var Offerkey = bidOfferRef.push().getKey();

    offer.setOfferId(Offerkey);
    console.log(Offerkey)
    bidOfferRef.child('/' + bidId + '/' + Offerkey).set({
      offer: offer,
    });
  }

  readBidOffer() {

    var bidOffer: Object;
    firebase.database().ref('/bidOffers/').on('value', (snapshot) => {
      snapshot.forEach(snap => {
        bidOffer = snap.val();
        console.log(bidOffer);
        return false;
      });
    });
  }
  readBidOffersById(bidId: String) {
    bidId = "-LNK6QX0PLmFLehrD-2P"
    var bidOffer: Object;
    firebase.database().ref('/bidOffers/' + bidId).on('value', (snapshot) => {
      snapshot.forEach(snap => {
        bidOffer = snap.val();
        console.log(bidOffer);
        return false;
      });
    });
  }
  updateOffer(bidId: String, property: String, newVal: String) {
    var updates: Object;
    updates['/placedBids/' + bidId + '/bid/' + property] = newVal;
    return firebase.database().ref().update(updates);
  }

  writeFlag(flag: Flag, bidId: String) {

    var bidFlagRef = firebase.database().ref('/bidFlags/');
    var bidFlagkey = bidFlagRef.push().getKey();
    flag.setBidId(bidId);
    console.log(flag);
    bidFlagRef.child('/' + bidId + '/' + bidFlagkey).set({
      flag: flag,
    });
  }
  readAllBidFlags() {
    var flags: Object;
    firebase.database().ref('/bidFlags/').on('value', (snapshot) => {
      snapshot.forEach(snap => {
        flags = snap.val();
        console.log(flags);
        return false;
      });
    });
    if (flags != null) {
      return flags;
    }
  }
  readBidFlagById(bidId: String) {
    var flag: Object;
    firebase.database().ref('/bidFlags/' + bidId).on('value', (snapshot) => {
      snapshot.forEach(snap => {
        flag = snap.val();
        console.log(flag);
        return false;
      });
    });
    if (flag != null) {
      return flag;
    }
  }
  writeDeviceData(userId: String) {
    var deviceRef = firebase.database().ref('/userDevices/');
    deviceRef.child("/" + userId + "/").set({
      uid: "not yet specified",
      deviceId: "not yet specified"
    });
  }
  readDeviceData() {
    var deviceData = [];
    firebase.database().ref('/userDevices/').on('value', (snapshot) => {
      snapshot.forEach(snap => {
        deviceData.push(snap.val());
        console.log(deviceData);
        return false;
      });
    });
  }
  readDeviceDataById(deviceId: String) {
    var deviceData = [];
    firebase.database().ref('/userDevices/' + deviceId).on('value', (snapshot) => {
      snapshot.forEach(snap => {
        deviceData.push(snap.val());
        console.log(deviceData);
        return false;
      });
    });
  }
  cloneObject() {
    this.userBids
    var bids = new Bid(this.userBids);
    console.log(bids);
  }
}