export class Breakfast {
    public b_type: string;
    public b_Cost: number;
    public description: string;
    public hotel_id: string;

    constructor(b_type: string, b_Cost: number, hotel_id: string, description: string) {
        this.b_type = b_type;
        this.b_Cost = b_Cost;
        this.hotel_id = hotel_id;
        this.description = description;
    }
}