import { Dish } from "./dish";
import { Owner } from "./owners";

export class Restaurant {
    _id: string;
    owner: Owner; //The _id of the owner.
    restaurantName: string;
    email: string;
    address: string;
    city: string;
    description: string;
    photos: [string]; //List of URLs. The photos will be stored in the server.
    rating: number;
    creationDate: Date;
    listTags: [{
        tagName: string;
    }]
    listDishes: [Dish]; //Array containing the IDs of the dishes.

    constructor(_id: string, owner: Owner, restName: string, email: string, add: string, city: string, desc: string, photos: [string], rating: number, cDate: Date, listTags: [{_id: string, tagName: string}], listDishes: [Dish]) {
        this._id = _id;
        this.owner = owner;
        this.restaurantName = restName;
        this.email = email;
        this.address = add;
        this.city = city;
        this.description = desc;
        this.photos = photos;
        this.rating = rating;
        this.creationDate = cDate;
        this.listTags = listTags;
        this.listDishes = listDishes;
    }
}