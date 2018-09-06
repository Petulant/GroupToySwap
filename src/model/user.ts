

export class User{

    private uid: String;
    private name: String;
    private email: String;
    private contact: String;
    private gender: String;
    private location: String;

    constructor() {

    }    
    getUid(){
        return this.uid;

    }
    getUserName(){
        return this.name;
    }
    getEmail(){
        return this.email;
    }
    getContact(){
        return this.contact;
    }
    getLocation(){
        return this.location;
    }
    getGender(){
        return this.gender;
    }
    setUid(uid:String){
        this.uid = uid;
    }
    setUserName(userName:String){
        if(userName != ""){
            this.name = userName;
        }
    }
    setContact(contact:String){
        this.contact = contact;
    }

    setGender(gender:String){
        this.gender = gender;
    }
    setEmail(email){
        this.email = email;
    }
    toString(){
        return "User name : "+ this.name + "/n" + " email : "+ this.email;  
    }
    equals(object:User){
        //compare two user object and return true if condition is met
        if(object != null && object.getEmail() === this.email){
            return true;
        }else{
            return false;
        }
    }
}