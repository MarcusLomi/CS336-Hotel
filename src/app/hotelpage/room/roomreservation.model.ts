export class RoomReservation {

    public in_Date: Date;
    public out_Date: Date;
    public no_Of_Days: number;
    public room_no: string;
    public hotel_id: string;
    public invoice_No: number;

    constructor(in_Date: Date,  out_Date: Date, no_Of_Days: number, room_no: string, hotel_id: string, invoice_No: number) {
        this.in_Date = in_Date;
        this.out_Date = out_Date;
        this.no_Of_Days = no_Of_Days;
        this.room_no = room_no;
        this.hotel_id = hotel_id;
        this.invoice_No = invoice_No;
    }

}