export class Customer {

    public cid: string;
    public email: string;
    public address: string;
    public customer_name: string;
    public pass: string;

    constructor( cid: string, email: string, address: string, customer_name: string, pass: string) {

        this.cid = cid;
        this.email = email;
        this.address = address;
        this.customer_name = customer_name; 
        this.pass = pass;

    }

}