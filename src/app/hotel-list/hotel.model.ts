
export class Hotel {

    public hotel_id: string;
    public street: string;
    public city: string;
    public state: string;
    public phone_no: string;

    constructor(hotel_id: string, street: string, city: string, state: string, phone_no: string) {
        this.hotel_id = hotel_id;
        this.street = street;
        this.city = city;
        this.state = state;
        this.phone_no = phone_no;
    }

}