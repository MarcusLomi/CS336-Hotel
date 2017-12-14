export class IncludedService {
    public invoice_No: number;
    public s_type: string;
    public hotel_id: string;

    constructor(invoice_No: number, s_type: string, hotel_id: string) {
        this.invoice_No = invoice_No;
        this.s_type = s_type;
        this.hotel_id = hotel_id;
    }
}