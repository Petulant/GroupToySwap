export class Item{

    itemId: String;
    type: String;
    name: String;
    color: String;
    imageUri: String[];
    description: String;

    constructor(){

    }
    setItemId(itemId: String){
        //validate item id
        this.itemId = itemId;
    }
    setType(type: String){
        //validate item id
        this.type = type;
    }
    setName(name: String){
        //validate item id
        this.name = name;
    }
    setColor(color: String){
        //validate item id
        this.color = color;
    }
    setImageUri(imageUri: String[]){
        //validate item id
        this.imageUri = imageUri;
    }
    setDescription(description: String){
        this.description = description;
    }
    getDescription(){
        return this.description;
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