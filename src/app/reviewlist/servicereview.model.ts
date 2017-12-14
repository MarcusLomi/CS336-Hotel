export class ServiceReview {
    public review_id: string;
    public hotel_id: string;
    public rating: string;
    public s_type: string;
    public text_comment: string;
    public cid: string;

    constructor(review_id: string, hotel_id: string, rating: string, s_type: string, text_comment: string, cid:string) {
        this.review_id = review_id;
        this.hotel_id = hotel_id;
        this.rating = rating;
        this.s_type = s_type;
        this.text_comment = text_comment; 
        this.cid = cid;
    }
}