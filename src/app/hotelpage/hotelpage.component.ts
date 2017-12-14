import { Component, OnInit } from '@angular/core';
import { RoomService } from './room/room-list/room.service';

@Component({
  selector: 'app-hotelpage',
  templateUrl: './hotelpage.component.html',
  styleUrls: ['./hotelpage.component.css', './vendor/bootstrap/css/bootstrap.min.css',
 './css/modern-business.css']
})
export class HotelpageComponent implements OnInit {

  constructor(private roomService: RoomService) { }

  // currentHotel = '';
  ngOnInit() {
    // this.currentHotel = this.roomService.getCurrentHotelName();
    // console.log('Hotelpage init complete: ' + this.currentHotel ) 
  }

}
