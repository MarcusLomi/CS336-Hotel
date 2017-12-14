import { Component, OnInit } from '@angular/core';
import { RoomReview } from '../reviewitem/roomReview.model';
import { RoomService } from '../hotelpage/room/room-list/room.service';
import { ServerDataService } from '../../serverdata.service';
import { Subscription } from 'rxjs/Subscription';
import { ServiceReview } from './servicereview.model';
import { BreakfastReview } from './breakfastreview.model';

@Component({
  selector: 'app-reviewlist',
  templateUrl: './reviewlist.component.html',
  styleUrls: ['./reviewlist.component.css']
})
export class ReviewlistComponent implements OnInit {

  reviews = false;
  roomReviews: RoomReview[];
  roomReviewSubscription: Subscription;

  serviceReviews: ServiceReview[];
  serviceReviewSubscription: Subscription;

  breakfastReviews: BreakfastReview[];
  breakfastReviewSubscription: Subscription;

  constructor(private roomService: RoomService,
              private serverDataService: ServerDataService) { }

  ngOnInit() {
    this.serverDataService.getRoomReviews();
    this.roomReviewSubscription  = this.roomService.roomReviewsChanged
    .subscribe((roomReviews:RoomReview[]) => {
      this.roomReviews = roomReviews;
    });
    //this.roomReviews = this.roomService.getRoomReviews();
    ////////////////////////////////////////////////////////
    this.serverDataService.getBreakfastReviews();
    this.breakfastReviewSubscription  = this.roomService.breakfastReviewsChanged
    .subscribe((breakfastReviews:BreakfastReview[]) => {
      this.breakfastReviews = breakfastReviews;
    });
    //this.breakfastReviews = this.roomService.getBreakfastReviews();
    ///////////////////////////////////////////////////////
    this.serverDataService.getServiceReviews();
    this.serviceReviewSubscription  = this.roomService.serviceReviewsChanged
    .subscribe((serviceReviews:ServiceReview[]) => {
      this.serviceReviews = serviceReviews;
    });
    //this.serviceReviews = this.roomService.getServiceReviews();
  }

  toggleReviews(hotelName) {
    this.roomService.setCurrentHotelName(hotelName);
    this.serverDataService.getBreakfastReviews();
    this.serverDataService.getServiceReviews();
    this.serverDataService.getRoomReviews();
    this.reviews = !this.reviews;
  }

}
