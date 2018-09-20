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
    expireDate: Date;
    bidDuration: number;
    

    constructor(){
    }
    setOwner(owner: User){
        if(owner != null && owner instanceof User){
            this.owner = owner;
        }
    }
    setBidDuration(expireDate: number){
        this.bidDuration = expireDate;
    }
    setBidder(bidder: User){
        if(bidder != null && bidder instanceof User){
            this.bidder = bidder;
        }
    }
    setViews(views)
    {
        this.views = views;
    }
    setMerchandise(merchandise){
        this.merchandise = merchandise;
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
    getOffers(){
        return this.offers;
    }
    getOwner(){
        return this.owner;
    }
    getBidders()
    {
        return this.bidder;
    }
    getViews(){
        return  this.views;
    }
    getMerchandise(){
        return this.merchandise;
    }
    getBidDate(){
        return this.bidDate;
    }
    getStatus(){
        return this.status;
    }
    getExpireDate(){
        return this.expireDate;
    }
}