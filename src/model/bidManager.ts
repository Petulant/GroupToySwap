import { Bid } from "./bid";
import { User } from "./user";
declare var firebase;
export class BidManager {

    private bid: Bid;
    bidder: User;
    private upload;
    bidDate: Date;
    constructor() {

    }
    // this.uid,this.username,this.imgUrl,this.title,this.description, this.toyType
    // this.status,this.bidderUid,this.duration,this.bidDate,this.profilePicture,this.views
    perfomBid(       
        uid,
        username ,
        imgUrl : String[],
        title ,
        description ,
        toyType,
        status,
        duration ,
        bidDate,
        profilePicture ,
        views,
        itemId,
        bidderUid,
        bidder: User ) {

            status = "closed";
            views = 0;
            firebase.database().ref('/closeBids/' ).push(
                {
                  uid: uid,
                  username : username,
                  imgUrl : imgUrl,
                  title : title,
                  description : description,
                  toyType : toyType,
                  itemId: itemId,
                  status:status,
                  bidderUid: bidderUid,
                  duration : duration,
                  bidDate: bidDate,
                  profilePicture : profilePicture,
                  views : views,                            
                }
              );

    //     if (bid != null && bid instanceof Bid && bidder != null && bidder instanceof User) {
    //         this.bidder = bidder;
    //         this.bid = bid;
    //         this.bid.setBidder(bidder);
    //         this.bidDate = new Date();
    //         this.bid.setBidDate(this.bidDate);
    //         //consult team
    //         this.bid.setStatus("successfull");
    //         this.upload = firebase.database().ref('/bids/');
    //         this.upload.push(bid);
    //     }
    // }
    // getBid() {
    //     if (this.bid != null) {
    //         return this.bid;
    //     } else {
    //         console.log("bid object is not initialised, please perfom a bid first before calling this method")
    //         return null;
    //     }
    }
}