export class Room {

        public room_no: string;
        public hotel_id: string;
        public price: number;
        public capacity: string;
        public floor_no: string;
        public description: string;
        public room_type: string;

        constructor(hotel_id: string, room_no: string, capacity: string,
             price: number, floor_no: string, description: string, room_type: string) {
            this.hotel_id = hotel_id;
            this.room_no = room_no;
            this.price = price;
            this.capacity = capacity;
            this.floor_no = floor_no;
            this.description = description;
            this.room_type = room_type;
        }

}