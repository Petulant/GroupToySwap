import { User } from "./user";
import { Item } from "../../node_modules/ionic-angular/umd";
declare var firebase;

export class Bid{

    owner: User;
    bidder: User;
    views: number;
    merchandise: Item;
    offers: Item[];
    upload;
    bidDate: Date;
    status: String;

    constructor(){

    }
    setBidder(bidder: User){
        if(bidder != null && bidder instanceof User){
            this.bidder = bidder;
        }
    }
    setBidDate(bidDate){
        this.bidDate = bidDate;
    }
    setOffers(offers: Item[]){
        //null check ofers
        this.offers = offers;
    }
    setStatus(status: String){
        //null check status
        this.status = status;
    }
}