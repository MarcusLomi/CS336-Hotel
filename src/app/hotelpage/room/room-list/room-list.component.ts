import { Component, OnInit } from '@angular/core';
import { Room } from '../room.model';
import { RoomService } from './room.service';
import { Subscription } from 'rxjs/Subscription';
import { ServerDataService } from '../../../../serverdata.service';
import { CustomerService } from '../../../customer.service';
import { Service } from '../service.model';
import { Subscribable } from 'rxjs/Observable';
import { Breakfast } from '../breakfast.model';
import { RoomReservation } from '../roomreservation.model';
import { CreditCard } from '../../../creditcard.model';
import { Reservation } from '../reservation.model';
import { IncludedService } from '../IncludedService.model';
import { IncludedBreakfast } from '../IncludedBreakfast.model';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  
  addCard = false;
  rooms: Room[];
  subscription: Subscription;

  roomReservations: RoomReservation[];
  roomReservationSubscription: Subscription;

  creditCards: CreditCard[];
  creditCardSubscription: Subscription;
  chosenCreditCard = new CreditCard('0','invalid','invalid','invalid', 999 ,'invalid','invalid');

  transactionInvoiceNo = 0;

  services: Service[];
  serviceSubscription: Subscription;

  breakfasts: Breakfast[];
  breakfastSubscription: Subscription;

  chosenBreakfast = new Breakfast('none',0,'','');
  chosenService =  new Service('none',0,'');

  noneService = new Service('none',0,'');
  noneBreakfast = new Breakfast('none',0,'','');

  currentHotel = '';
  maxPrice = 0;
  minCapacity = 0;
  canReserve = true;
  finalization = false;
  bIndex = 0;
  selectedRoom:Room;

  inDateObject: Date;
  compInDateObject: Date; // The comparison object that's set to compare reservation dates in the reservation array
  outDateObject: Date;
  compOutDateObject: Date; // The comparison object that's set to compare the reservation date in the array
  numDays = 0;
  totalCost = 0;
  inDate = '';
  outDate = '';

  finalIncludedService: IncludedService;
  finalIncludedBreakfast: IncludedBreakfast;
  finalReservation: RoomReservation; 

  finishedReservation = false;
  
  constructor(private roomService: RoomService,
              private serverDataService: ServerDataService,
              private customerService: CustomerService) { }

  ngOnInit() {
    this.subscription = this.roomService.roomsChanged
    .subscribe(
      (newRooms: Room[]) => {
        this.rooms = newRooms;
      }
    );
    this.currentHotel = this.roomService.getCurrentHotelName();
    console.log('Room-List init complete: ' + this.currentHotel)
    this.serverDataService.getRooms('');

    //////////////////////////////////////////

    this.roomReservationSubscription = this.roomService.roomReservationsChanged
    .subscribe( (newRoomReservations: RoomReservation[]) => {
        this.roomReservations = newRoomReservations;
    })
    this.serverDataService.getRoomReservations();

    //////////////////////////////////////////

    this.breakfastSubscription = this.roomService.breakfastsChanged
    .subscribe((newBreakfasts: Breakfast[]) => {
      this.breakfasts = newBreakfasts;
    });
    this.serverDataService.getBreakfasts();

    /////////////////////////////////////////

    this.serviceSubscription = this.roomService.servicesChanged
    .subscribe((newServices:Service[]) => {
      this.services = newServices;
    });
    this.serverDataService.getServices();

    this.creditCardSubscription = this.customerService.cardsChanged
    .subscribe( (newCards:CreditCard[]) => {
      this.creditCards = newCards;
    })
    this.serverDataService.getCreditCards();

  } // End ngOnInit()

  setFilter() {
    console.log('mp:'+ this.maxPrice +' mc:' + this.minCapacity);
    if(this.maxPrice > 0) {
      this.rooms = this.rooms.slice().filter( room => room.price <= this.maxPrice);
    }
    if(this.minCapacity != 0){
      this.rooms = this.rooms.filter(room => Number(room.capacity) >= this.minCapacity);
    }
    console.log('Filtering');
  }

  checkSignInStatusAndReserve(selectedRoom:Room) {
    this.totalCost = 0;
    this.selectedRoom=selectedRoom;
    if(this.customerService.getCurrentCustomer().cid === 'invalid'){
      this.canReserve = false;
      alert("Don't forget to sign in before reserving a hotel. ");
    } else {
      this.canReserve = true;
      if((this.inDate == '' || this.outDate == '') || (this.outDate < this.inDate)){
        alert('Please select a valid date range.');
        this.finalization = false;
        return;
      }
      this.inDateObject = new Date(this.inDate);
      this.outDateObject = new Date(this.outDate);
      this.numDays = this.calculateNumDays(Number(this.outDateObject.getTime()-this.inDateObject.getTime()));
  
      for(let res of this.roomReservations){
        if(selectedRoom.room_no == res.room_no && selectedRoom.hotel_id==res.hotel_id){
          this.compInDateObject = new Date(res.in_Date);
          this.compOutDateObject = new Date(res.out_Date);
          if((this.inDateObject.getTime() == this.compInDateObject.getTime()) ||
            (this.inDateObject.getDate() > this.compInDateObject.getDate() && this.inDateObject.getTime() < this.compOutDateObject.getTime()) ||
            (this.outDateObject.getTime() > this.compInDateObject.getTime() && this.outDateObject.getTime() < this.compOutDateObject.getTime()) ){
              this.finalization = false;
              alert("Room already reserved from: "+ res.in_Date + ' to ' + res.out_Date);
              return;
          }
        }
      }
      this.totalCost += this.numDays*Number(selectedRoom.price);
      if(this.chosenBreakfast.b_type != 'invalid') {
        this.totalCost += Number(this.chosenBreakfast.b_Cost);
      } 
      if(this.chosenService.s_type != 'invalid') {
        this.totalCost += Number(this.chosenService.s_Cost);
      }
      this.transactionInvoiceNo = this.getInvoiceNo();
      this.finalization = true;
    }

  }

  cancelFinalization() {
    this.finalization = false;
  }

  submitPayment() {
    if(this.chosenBreakfast.b_type!=='none') {
      this.finalIncludedBreakfast = new IncludedBreakfast(this.transactionInvoiceNo,this.chosenBreakfast.b_type,this.chosenBreakfast.hotel_id);
      this.serverDataService.createIncludedBreakfast(this.finalIncludedBreakfast);
    }
    if(this.chosenService.s_type!=='none') {
      this.finalIncludedService = new IncludedService(this.transactionInvoiceNo, this.chosenService.s_type, this.chosenService.hotel_id);
      this.serverDataService.createIncludedService(this.finalIncludedService);
    }
    this.serverDataService.createReservation(new Reservation(this.transactionInvoiceNo,this.inDateObject,this.totalCost,this.customerService.getCurrentCustomer().cid,this.chosenCreditCard.Cnumber));
    this.finalReservation = new RoomReservation(this.inDateObject,this.outDateObject,this.numDays,this.selectedRoom.room_no,
      this.selectedRoom.hotel_id,this.transactionInvoiceNo);
    this.serverDataService.createRoomReservation(this.finalReservation);
    this.finalization = false;
    this.finishedReservation = true;
  }

  toggleAddCard() {
    this.addCard = !this.addCard;
  }

  getInvoiceNo() {
    return Math.floor(Math.random() * (800000 - 0 + 1)) + 0;
  }

  calculateNumDays(milis: number){
    milis = milis / 1000; // Divide by 1000
    milis = milis / 3600; 
    milis = milis / 24;
    if(milis === 0) {
      return 1;
    }
    return milis;
  }

  resetFilter() {
    console.log('Resetting filters for:' + this.currentHotel);
    this.rooms = this.roomService.getRooms().filter(room => room.hotel_id === this.currentHotel);
  }

}
