export class CreditCard {

    public Cnumber: string;
    public cid: string;
    private billing_Addr: string;
    private cardholder_name: string;
    private sec_Code: number;
    private card_type: string;
    private exp_date: string;
    
    constructor(Cnumber: string,
        cid: string,
        billing_Addr: string,
        cardholder_name: string,
        sec_Code: number,
        card_type: string,
        exp_date: string) {

           this.Cnumber = Cnumber;
           this.cid = cid;
           this.billing_Addr = billing_Addr;
           this.cardholder_name = cardholder_name;
           this.sec_Code = sec_Code;

    }

}