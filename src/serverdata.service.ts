import { Injectable } from '@angular/core';
// import { Http } from '@angular/http'
import { HttpClient} from '@angular/common/http';
import {Hotel} from './app/hotel-list/hotel.model';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HotelService } from './app/hotelfinder/hotel.service';
import { RoomService } from './app/hotelpage/room/room-list/room.service';
import { Room } from './app/hotelpage/room/room.model';
import { Customer } from './app/customer.model';
import { CustomerService } from './app/customer.service';
import { Name } from './app/signup/name.model';
import { RoomReview } from './app/reviewitem/roomReview.model';
import { CreditCard } from './app/creditcard.model';
import { BreakfastReview } from './app/reviewlist/breakfastreview.model';
import { ServiceReview } from './app/reviewlist/servicereview.model';
import { Breakfast } from './app/hotelpage/room/breakfast.model';
import { Service } from './app/hotelpage/room/service.model';
import { RoomReservation } from './app/hotelpage/room/roomreservation.model';
import { Reservation } from './app/hotelpage/room/reservation.model';
import { IncludedService } from './app/hotelpage/room/IncludedService.model';
import { IncludedBreakfast } from './app/hotelpage/room/IncludedBreakfast.model';

@Injectable() 
export class ServerDataService {
    constructor( private _http: HttpClient,
                 private hotelService: HotelService,
                 private roomService: RoomService,
                 private customerService: CustomerService ){
    }
    getHotels() {
        return this._http.get("http://localhost/api/select.php")
        .map(
            (hotels: Hotel[]) =>{
                for(let hotel of hotels){
                }
                return hotels;
            } 
        ).subscribe((newHotels: Hotel[]) =>{
            this.hotelService.setHotels(newHotels);
            // Try without slice later
            console.log(newHotels)
        })
    }

    getRoomReservations() {
        return this._http.get("http://localhost/api/roomReservation.php")
        .map(
            (reservations: RoomReservation[]) =>{
                return reservations;
            } 
        ).subscribe((reservations: RoomReservation[]) =>{
            this.roomService.setRoomReservations(reservations);
            // Try without slice later
            console.log(reservations);
        })
    }

    getRooms(id) {
        console.log('Request to get rooms received: ' + id)
        return this._http.get('http://localhost/api/hotelrooms.php')
        .map(
            (rooms: Room[]) =>{
                for(let room of rooms){
                }
                return rooms;
            } 
        ).subscribe((newRooms: Room[]) =>{
            this.roomService.setRooms(newRooms);
            //console.log(newRooms)
        });
    }

    signInUser(user, password){
        console.log('Trying to sign in user: ' + user + 'with password: '+ password);
        return this._http.post('http://localhost/api/signin.php',{'id':user,'password': password})
        .map( (customer: Customer[]) =>{
          console.log("Got a Customer, mapping now");
          console.log(customer);
          return customer;  
        }).subscribe( (customer: Customer[]) =>{
            //Need the customer service subscription here
            this.customerService.setMainCustomer(customer[0]); 
        });
    }

    createCustomer(cid, email, address, phone_no, customer_name, pass) {
        console.log('Trying to create user' + cid);
        this._http.post('http://localhost/api/createCustomer.php',{'cid': cid, 
        'email':email, 'address':address, 'phone_no':phone_no, 'customer_name':customer_name, 'pass':pass})
        .map((res: Response)=>{
            // console.log(res.toString());
        }).subscribe((res) => { console.log(res); });
      
    }

    getRoomReviews() {
        this._http.get('http://localhost/api/roomReview.php')
        .map((roomReviews: RoomReview[])=>{
            return roomReviews;
        }).subscribe((roomReviews:RoomReview[]) => this.roomService
        .setRoomReviews(roomReviews.slice()
        .filter(review => review.hotel_id === this.roomService.getCurrentHotelName())));
    }

    getBreakfasts() {
        this._http.get('http://localhost/api/breakfast.php')
        .map((breakfasts: Breakfast[])=>{
            return breakfasts;
        }).subscribe((breakfasts:Breakfast[]) => this.roomService
        .setBreakfasts(breakfasts.slice()
        .filter(review => review.hotel_id === this.roomService.getCurrentHotelName())));
    }

    getBreakfastReviews() {
        this._http.get('http://localhost/api/breakfastReview.php')
        .map((breakfastReviews: BreakfastReview[])=>{
            return breakfastReviews;
        }).subscribe((breakfastReviews:BreakfastReview[]) => this.roomService
        .setBreakfastReviews(breakfastReviews.slice()
        .filter(review => review.hotel_id === this.roomService.getCurrentHotelName())));
    }

    getServices() {
        this._http.get('http://localhost/api/service.php')
        .map((services: Service[])=>{
            return services;
        }).subscribe((services:Service[]) => this.roomService
        .setServices(services.slice()
        .filter(review => review.hotel_id === this.roomService.getCurrentHotelName())));
    }

    getServiceReviews() {
        this._http.get('http://localhost/api/serviceReview.php')
        .map((serviceReviews: ServiceReview[])=>{
            return serviceReviews;
        }).subscribe((serviceReviews:ServiceReview[]) => this.roomService
        .setServiceReviews(serviceReviews.slice()
        .filter(review => review.hotel_id === this.roomService.getCurrentHotelName())));
    }

    getAllUsernames() {
        this._http.get('http://localhost/api/customerNames.php')
        .map((names: Name[]) => {
            for(let name of names){
            }
            return names;
        }).subscribe((names:Name[])=>{
            this.customerService.setNewNames(names.slice());
        })
        // put subscribe at the end of this
    }

    getCreditCards() {
        this._http.get('http://localhost/api/getCreditCards.php')
        .map((creditcards: CreditCard[]) => {
            return creditcards;
           
        }).subscribe((newCards: CreditCard[]) => {
            this.customerService.setNewCards(newCards.slice().filter((card:CreditCard)=> 
                card.cid === this.customerService.getCurrentCustomer().cid
            ));
        });
      
    }

    createRoomReservation(rr:RoomReservation) {
        console.log(rr);
        this._http.post('http://localhost/api/createRoomReservation.php',{'hotel_id': rr.hotel_id, 
        'in_Date':rr.in_Date, 'invoice_No':rr.invoice_No, 'no_Of_Days':rr.no_Of_Days, 'out_Date':rr.out_Date, 'room_no':rr.room_no})
        .map((res: Response)=>{
            // console.log(res.toString());
        }).subscribe((res) => { console.log(res); });
    }

    createReservation(r: Reservation) {
        console.log("Creating reservation");
        console.log(r);
        this._http.post('http://localhost/api/createReservation.php',{'invoice_No':r.invoice_No, 
        'res_Date':r.res_Date, 'Total_Amt':r.Total_Amt, 'cid':r.cid, 'Cnumber':r.Cnumber})
        .map((res: Response)=>{
            // console.log(res.toString());
        }).subscribe((res) => { console.log(res); });
    }

    getReservation() {
        return this._http.get("http://localhost/api/getReservation.php")
        .map(
            (reservations: Reservation[]) =>{
                return reservations;
            } 
        ).subscribe((reservations: Reservation[]) =>{
            this.roomService.setReservations(reservations);
            // Try without slice later
            
        })      
    }

    getIncludedService() {
        return this._http.get("http://localhost/api/getIncludedService.php")
        .map(
            (includedServices: IncludedService[]) =>{
                return includedServices;
            } 
        ).subscribe((includedServices: IncludedService[]) =>{
            this.roomService.setIncludedServices(includedServices);
            // Try without slice later

        })
    }

 

    getIncludedBreakfast() {
        return this._http.get("http://localhost/api/getIncludedBreakfast.php")
        .map(
            (includedBreakfasts: IncludedBreakfast[]) =>{
                return includedBreakfasts;
            } 
        ).subscribe((includedBreakfasts: IncludedBreakfast[]) =>{
            this.roomService.setIncludedBreakfasts(includedBreakfasts);
            // Try without slice later
        })
    }

    createIncludedService(is: IncludedService) {
        console.log("Creating Included Service");
        console.log(is);
        this._http.post('http://localhost/api/createIncludedService.php',{'invoice_No':is.invoice_No, 
        's_type': is.s_type, 'hotel_id':is.hotel_id})
        .map((res: Response)=>{
            // console.log(res.toString());
        }).subscribe((res) => { console.log(res); });
    }

    createIncludedBreakfast(ib: IncludedBreakfast) {
        console.log("Creating Included Breakfast");
        console.log(ib)
        this._http.post('http://localhost/api/createIncludedBreakfast.php',{'invoice_No':ib.invoice_No, 
        'b_type': ib.b_type, 'hotel_id':ib.hotel_id})
        .map((res: Response)=>{
            // console.log(res.toString());
        }).subscribe((res) => { console.log(res); });
    }

    createRoomReview(rr: RoomReview) {
        console.log("Creating new Room Review");
        this._http.post('http://localhost/api/createRoomReview.php',{'review_id':rr.reviewId, 
        'hotel_id': rr.hotel_id, 'rating':rr.rating, 'room_no':rr.room_no, 'text_comment':rr.text_comment, 'cid':rr.cid})
        .map((res: Response)=>{
            // console.log(res.toString());
        }).subscribe((res) => { console.log(res); });
    }

    createServiceReview(sr: ServiceReview) {   
        console.log("Creating new Service Review");
        this._http.post('http://localhost/api/createServiceReview.php',{'review_id':sr.review_id, 
        'hotel_id': sr.hotel_id, 'rating':sr.rating, 's_type':sr.s_type, 'text_comment':sr.text_comment, 'cid':sr.cid})
        .map((res: Response)=>{
            // console.log(res.toString());
        }).subscribe((res) => { console.log(res); });        
    }

    createBreakfastReview(br: BreakfastReview) {
        console.log("Creating new BreakfastReview");
        this._http.post('http://localhost/api/createBreakfastReview.php',{'review_id':br.review_id, 
        'hotel_id': br.hotel_id, 'rating':br.rating, 'b_type':br.b_type, 'text_comment':br.text_comment, 'cid':br.cid})
        .map((res: Response)=>{
            // console.log(res.toString());
        }).subscribe((res) => { console.log(res); });          
    }

    createCard(Cnumber, cid, billing_Addr, cardholder_name, sec_Code, card_type, exp_date) {
        console.log('Adding card to:' + cid);
        this._http.post('http://localhost/api/createCard.php',{'Cnumber':Cnumber, 'cid':cid, 'billing_Addr':billing_Addr, 
        'cardholder_name':cardholder_name, 'sec_Code':sec_Code, 'card_type':card_type, 'exp_date':exp_date})
        .map((res: Response)=>{
            // console.log(res.toString());
        }).subscribe((res) => { console.log(res); });
      
    }

}
