import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import { ServerDataService } from '../../serverdata.service';
import { CreditCard } from '../creditcard.model';
import { Subscription } from 'rxjs/Subscription';
import { Reservation } from '../hotelpage/room/reservation.model';
import { RoomReservation } from '../hotelpage/room/roomreservation.model';
import { Subscribable } from 'rxjs/Observable';
import { IncludedBreakfast } from '../hotelpage/room/IncludedBreakfast.model';
import { RoomService } from '../hotelpage/room/room-list/room.service';
import { IncludedService } from '../hotelpage/room/IncludedService.model';
import { ServiceReview } from '../reviewlist/servicereview.model';
import { BreakfastReview } from '../reviewlist/breakfastreview.model';
import { RoomReview } from '../reviewitem/roomReview.model';
import { Breakfast } from '../hotelpage/room/breakfast.model';
import { HotelService } from '../hotelfinder/hotel.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {
  private customer = new Customer('PlaceholderName', 'placeholder@email.com', '123 placeholder St', 'Place Holder', 'password'); // Dummy customer dat

  constructor( private customerService: CustomerService,
               private serverDataService: ServerDataService,
               private roomService: RoomService,
               private hotelService: HotelService ) { }

  private cards: CreditCard[];
  subscription: Subscription;

  private reservations: Reservation[];
  reservationSubscription: Subscription;

  private roomReservations: RoomReservation[];
  roomReservationSubscription: Subscription;

  private includedService: IncludedService[];
  includedServicesSubscription: Subscription;

  private includedBreakfast: IncludedBreakfast[];
  includedBreakfastSubscription: Subscription;

  selectedInvoice = 0;
  serviceReviewText = '';
  serviceReview = false;
  serviceRating = null;
  finalServiceReview: ServiceReview;

  breakfastReviewText = '';
  breakfastReview = false;
  breakfastRating = null;
  finalBreakfastReview: BreakfastReview;

  invalidRating = false;

  inDate: Date;
  outDate: Date;

  roomReviewText = '';
  roomReview = false;
  roomRating = null;
  finalRoomReview: RoomReview;

  finishedSR=false;
  finishedRR=false;
  finishedBR=false;

  addCard = false;
  cardToggle = false;

  ngOnInit() {

    this.serverDataService.getHotels();
    this.customer = this.customerService.getCurrentCustomer();
    this.serverDataService.getCreditCards();
    this.subscription = this.customerService.cardsChanged
    .subscribe((newCards:CreditCard[]) => {
      this.cards = newCards;
    });
    //this.cards = this.customerService.getCards();

    this.reservationSubscription = this.roomService.reservationsChanged
    .subscribe( (newRes:Reservation[]) =>{
      this.reservations = newRes;
    })
    this.serverDataService.getReservation();
    
    this.roomReservationSubscription = this.roomService.roomReservationsChanged
    .subscribe( (newRoomReservations: RoomReservation[]) => {
        this.roomReservations = newRoomReservations;
    })
    this.serverDataService.getRoomReservations();

    this.includedBreakfastSubscription = this.roomService.includedBreakfastsChanged
    .subscribe( (nIB: IncludedBreakfast[]) => {
        this.includedBreakfast = nIB;
    })
    this.serverDataService.getIncludedBreakfast();

    this.includedServicesSubscription = this.roomService.includedServicesChanged
    .subscribe( (nIS: IncludedService[]) => {
        this.includedService = nIS;
    })
    this.serverDataService.getIncludedService();

  }

  addCardToggle() {
    this.addCard = !this.addCard;
  }

  toggleCardInfo() {
    this.cardToggle = !this.cardToggle;
  }

  toggleBreakfastReview(invoice) {
    this.selectedInvoice = Number(invoice);
    console.log(this.selectedInvoice);
    this.breakfastReview = !this.breakfastReview;
  }

  toggleRoomReview(invoice) {
    this.selectedInvoice = Number(invoice);
    console.log(this.selectedInvoice);
    this.roomReview = !this.roomReview;
  }

  toggleServiceReview(invoice) {
    this.selectedInvoice = Number(invoice);
    console.log(this.selectedInvoice);
    this.serviceReview = !this.serviceReview;
  }

  submitRoomReview(hotel_id,room_no) {
    console.log("Submitting room review:" +this.roomRating);
    if(this.roomRating>10||this.roomRating<0) {
      this.invalidRating = true;
      return;
    }
    this.invalidRating = false;
    this.finalRoomReview = new RoomReview(this.getReviewId(),hotel_id,this.roomRating,room_no,this.roomReviewText,this.customerService.getCurrentCustomer().cid);
    console.log(this.finalRoomReview);
    this.serverDataService.createRoomReview(this.finalRoomReview);
    this.finishedRR=true;
  }
  
  submitBreakfastReview(hotel_id, type) {
    console.log("Submitting breakfast review:"+this.breakfastRating);
    if(this.serviceRating>10||this.serviceRating<0) {
      this.invalidRating = true;
      return;
    }
    this.invalidRating = false;
    this.finalBreakfastReview = new BreakfastReview(String(this.getReviewId()),hotel_id,this.breakfastRating,type,this.breakfastReviewText,this.customerService.getCurrentCustomer().cid);
    console.log(this.finalBreakfastReview);
    this.serverDataService.createBreakfastReview(this.finalBreakfastReview);
    this.finishedBR = true;
  }

  submitServiceReview(hotel_id, type) {
    console.log("Submitting service review:"+this.serviceRating);
    if(this.breakfastRating>10||this.breakfastRating<0) {
      this.invalidRating = true;
      return;
    }
    this.invalidRating = false;
    this.finalServiceReview = new ServiceReview(String(this.getReviewId()),hotel_id,this.serviceRating,type,this.serviceReviewText,this.customerService.getCurrentCustomer().cid);
    console.log(this.finalServiceReview);
    this.serverDataService.createServiceReview(this.finalServiceReview);
    this.finishedSR = true;
  }

  getReviewId() {
    return Math.floor(Math.random() * (800000 - 0 + 1)) + 0;
  }

}

