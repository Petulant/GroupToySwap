import { User } from "./user";
import { Item } from "../../node_modules/ionic-angular/umd";


export class Offer{

    bidId: String;
    items: Item[];

    constructor(){

    }
    setOfferId(offerId: String){
        this.bidId = offerId;
    }
    getOfferId(){
        return this.bidId;
    }
    setItems(items: Item[]){
        this.items = items; 
    }
    getItems(){
        return this.items;
    }
}