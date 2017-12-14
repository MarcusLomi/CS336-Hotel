export class Reservation {
    public invoice_No: number;
    public res_Date: Date;
    public Total_Amt: number;
    public cid: string;
    public Cnumber: string;

    constructor(invoice_No: number, res_Date: Date, Total_Amt: number, cid: string, Cnumber: string) {
        this.invoice_No = invoice_No;
        this.res_Date = res_Date;
        this.Total_Amt = Total_Amt;
        this.cid = cid;
        this.Cnumber = Cnumber;
    }
}