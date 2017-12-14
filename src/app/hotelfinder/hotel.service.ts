import { Hotel } from '../hotel-list/hotel.model';
import { ServerDataService } from '../../serverdata.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HotelService {

    private hotels: Hotel[] = [
        new Hotel('No Hotels Found', 'Double check server connection', 'Go to the homepage and revisit this page if needed.', '', ''),
    ];
    hotelsChanged = new Subject<Hotel[]>();
    currentHotel = new Subject<string>();
    currentHotelSet = false;
    
    constructor() {

    }

    getHotels() {
        return this.hotels.slice();
    }

    setHotels(inputHotels: Hotel[]){
        this.hotels = inputHotels;
        console.log(this.hotels);
        this.hotelsChanged.next(this.hotels.slice());
    }

}
