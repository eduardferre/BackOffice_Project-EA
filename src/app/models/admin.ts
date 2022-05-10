export class Admin {
    _id: string;
    adminName: string;
    fullName: string;
    email: string;
    password: string;
    creationDate: Date;

    constructor(_id: string, name: string, fullName: string, email: string, pass: string, cDate: Date) {
        this._id = _id;
        this.adminName = name;
        this.fullName = fullName;
        this.email = email;
        this.password = pass;
        this.creationDate = cDate;
    }
}