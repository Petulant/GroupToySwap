export class Item{

    itemId: String;
    type: String;
    name: String;
    color: String;
    imageUri: String;

    constructor(){

    }
    setItemId(itemId: String){
        //validate item id
        this.itemId = itemId;
    }
    setType(type: String){
        //validate item id
        this.itemId = type;
    }
    setName(name: String){
        //validate item id
        this.itemId = name;
    }
    setColor(color: String){
        //validate item id
        this.itemId = color;
    }
    setImageUri(imgaeUri: String){
        //validate item id
        this.itemId = this.imageUri;
    }
    getItemId(){
        return this.itemId;
    }
    getType(){
        return this.type;
    }
    getName(){
        return this.name;
    }
    getColor(){
        return this.color;
    }
    getImageUri(){
        return this.imageUri;
    }
}