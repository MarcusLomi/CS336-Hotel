export class IncludedBreakfast {
    public invoice_No: number;
    public b_type: string;
    public hotel_id: string;

    constructor(invoice_No: number, b_type: string, hotel_id: string) {
        this.invoice_No = invoice_No;
        this.b_type = b_type;
        this.hotel_id = hotel_id;
    }
}