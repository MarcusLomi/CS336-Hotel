

export class RoomReview {
    reviewId: number;
    hotel_id: string;
    rating: number;
    room_no: number;
    text_comment:string; 
    cid: string;

    constructor(reviewId: number,
        hotel_id: string,
        rating: number,
        room_no: number,
        text_comment:string, 
        cid: string) {
            this.hotel_id = hotel_id;
            this.reviewId = reviewId;
            this.rating = rating;
            this.room_no = room_no;
            this.text_comment = text_comment;
            this.cid = cid;
    }
}