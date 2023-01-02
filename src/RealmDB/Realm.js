import Realm from "realm";
const key = new Int8Array(64);

class Contact extends Realm.Object { }
Contact.schema = {
    name: "Contact",
    properties: {
        uid: "string?",
        phoneNumber: "string",
        Name: "string",
        bike: "Bike?"
    },
    primaryKey: "uid",
};

class Bike extends Realm.Object { }
Bike.schema = {
    name: "Bike",
    properties: {
        uid: "string?",
        Name: "string",
    },
    primaryKey: "uid",
};


export default new Realm({ schema: [Contact, Bike] });