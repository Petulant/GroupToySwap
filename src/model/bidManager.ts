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
    perfomBid(bid: Bid, bidder: User) {

        if (bid != null && bid instanceof Bid && bidder != null && bidder instanceof User) {
            this.bidder = bidder;
            this.bid = bid;
            this.bid.setBidder(bidder);
            this.bidDate = new Date();
            this.bid.setBidDate(this.bidDate);
            //consult team
            this.bid.setStatus("successfull");
            this.upload = firebase.database().ref('/bids/');
            this.upload.push(bid);
        }
    }
    getBid() {
        if (this.bid != null) {
            return this.bid;
        } else {
            console.log("bid object is not initialised, please perfom a bid first before calling this method")
            return null;
        }
    }
}