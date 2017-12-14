import { Component, OnInit } from '@angular/core';
import { Hotel } from './hotel.model';
import { HotelService } from '../hotelfinder/hotel.service';
import { ServerDataService } from '../../serverdata.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { RoomService } from '../hotelpage/room/room-list/room.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit, OnDestroy {

  // Later i'm going to be using php to populate this hotel list.
  hotels: Hotel[];
  subscription: Subscription;
  clickedHotel = '';
  reviews = false;
  filterState = null;
  filterCountry = null;

  constructor(private hotelService: HotelService,
              private roomService: RoomService) {}

  ngOnInit() {
    this.subscription = this.hotelService.hotelsChanged
    .subscribe(
      (newHotels: Hotel[]) => {
        this.hotels = newHotels;
      }
    );
    this.hotels = this.hotelService.getHotels();
  }

  onInfoClick(hotelName) {
    this.clickedHotel = hotelName;
    this.roomService.setCurrentHotelName(hotelName);
  }

  toggleReviews() {
    this.reviews = !this.reviews;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  resetHotelFilter() {
    console.log("Resetting filter");
    this.hotels = this.hotelService.getHotels();
  }

  setFilter(){
    if(this.filterCountry!==null){
      if(this.filterCountry=='FR'){
        this.hotels = this.hotelService.getHotels().slice().filter(hotel => hotel.state=='FR');
        return;
      } else if(this.filterCountry=='USA'){
          this.hotels = this.hotelService.getHotels().slice().filter(hotel => hotel.state!='FR');
          if(this.filterState!==null){
            this.hotels = this.hotelService.getHotels().slice().filter(hotel => hotel.state==this.filterState);
          }
      }
    } else if(this.filterState!==null){
      this.hotels = this.hotelService.getHotels().slice().filter(hotel => hotel.state==this.filterState);
    }
    
  }

}
