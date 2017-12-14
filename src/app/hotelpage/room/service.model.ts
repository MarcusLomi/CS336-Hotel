export class Service {
    public s_type: string;
    public s_Cost: number;
    public hotel_id: string;

    constructor(s_type: string, s_Cost: number, hotel_id: string) {
        this.s_type = s_type;
        this.s_Cost = s_Cost;
        this.hotel_id = hotel_id;
    }
}