import { Room } from "../room.model";
import { Injectable } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { Subject } from "rxjs/Subject";
import { RoomReview } from "../../../reviewitem/roomReview.model";
import { BreakfastReview } from "../../../reviewlist/breakfastreview.model";
import { ServiceReview } from "../../../reviewlist/servicereview.model";
import { Breakfast } from "../breakfast.model";
import { Service } from "../service.model";
import { RoomReservation } from "../roomreservation.model";
import { IncludedService } from "../IncludedService.model";
import { IncludedBreakfast } from "../IncludedBreakfast.model";
import { Reservation } from "../reservation.model";

@Injectable()
export class RoomService implements OnInit{

    private rooms: Room[] = [
        new Room('Aquilania',"69","5",130,'5','King sized beds. Single bathroom','Executive Suite'),
        new Room('Aquilania',"69","5",130,'5','King sized beds. Single bathroom','Executive Suite'),
        new Room('Aquilania',"69","5",130,'5','King sized beds. Single bathroom','Executive Suite'),
        new Room('Aquilania',"69","5",130,'5','King sized beds. Single bathroom','Executive Suite')
    ];
    private roomReviews: RoomReview[];
    roomReviewsChanged = new Subject<RoomReview[]>();
    roomsChanged = new Subject<Room[]>();

    private breakfastReviews: BreakfastReview[];
    breakfastReviewsChanged = new Subject<BreakfastReview[]>();
   
    private serviceReviews: ServiceReview[];
    serviceReviewsChanged = new Subject<ServiceReview[]>();

    private breakfasts:Breakfast[];
    breakfastsChanged = new Subject<Breakfast[]>();

    private includedBreakfasts: IncludedBreakfast[];
    includedBreakfastsChanged = new Subject<IncludedBreakfast[]>();

    private services: Service[];
    servicesChanged = new Subject<Service[]>();

    private includedServices: IncludedService[];
    includedServicesChanged = new Subject<IncludedService[]>();

    private roomReservations: RoomReservation[];
    roomReservationsChanged = new Subject<RoomReservation[]>();
    
    private reservations: Reservation[];
    reservationsChanged = new Subject<Reservation[]>();
    

    hotelName = '';
    constructor() {

    }

    ngOnInit() {
      
    }

    getRoomReservations() {
        return this.roomReservations.slice();
    }

    setRoomReservations(newRoomReservations: RoomReservation[]){
        this.roomReservations = newRoomReservations;
        this.roomReservationsChanged.next(this.roomReservations.slice());
    }

    getRooms(){
        return this.rooms.slice();
    }

    setRooms(newRooms: Room[]){
        this.rooms = newRooms;
        console.log('Applying filter while setting hotels: '+ this.hotelName);
        this.roomsChanged.next(this.rooms.slice().filter(room => room.hotel_id === this.hotelName));
    }

    getServices() {
        return this.services.slice();
    }

    setServices(newServices: Service[]) {
        this.services = newServices;
        this.servicesChanged.next(this.services.slice().filter(service => service.hotel_id === this.hotelName))
    }

    getBreakfasts() {
        return this.breakfasts.slice();
    }

    setBreakfasts(newBreakfasts: Breakfast[]) {
        this.breakfasts = newBreakfasts;
        this.breakfastsChanged.next(this.breakfasts.slice().filter(breakfast => breakfast.hotel_id === this.hotelName))
    }

    getRoomReviews() {
        return this.roomReviews.slice();
    }

    setRoomReviews(newReviews: RoomReview[]){
        this.roomReviews = newReviews;
        this.roomReviewsChanged.next(this.roomReviews.slice().filter(review => review.hotel_id = this.getCurrentHotelName()));
    }

    getBreakfastReviews() {
        return this.breakfastReviews.slice();
    }

    setBreakfastReviews(newReviews: BreakfastReview[]){
        this.breakfastReviews = newReviews;
        this.breakfastReviewsChanged.next(this.breakfastReviews.slice().filter(review => review.hotel_id = this.getCurrentHotelName()));
    }

    getServiceReviews() {
        return this.serviceReviews.slice();
    }

    setServiceReviews(newReviews: ServiceReview[]){
        this.serviceReviews = newReviews;
        this.serviceReviewsChanged.next(this.serviceReviews.slice().filter(review => review.hotel_id = this.getCurrentHotelName()));
    }

    setCurrentHotelName(hotel: string){
        //console.log('Name set: ' + hotel);
        this.hotelName = hotel;
    }

    getCurrentHotelName() {
        //console.log("Returning:" + this.hotelName);
        return this.hotelName;
    }

    setIncludedServices(newIncludedServices: IncludedService[]) {
        this.includedServices = newIncludedServices;
        this.includedServicesChanged.next(this.includedServices.slice());
    }

    getIncludedServices() {
        return this.includedServices.slice();
    }

    setIncludedBreakfasts(newIncludedBreakfasts: IncludedBreakfast[]) {
        this.includedBreakfasts = newIncludedBreakfasts;
        this.includedBreakfastsChanged.next(this.includedBreakfasts.slice());
    }

    getIncludedBreakfasts() {
        return this.includedBreakfasts.slice();
    }

    setReservations(newReservations: Reservation[]) {
        this.reservations = newReservations;
        this.reservationsChanged.next(this.reservations.slice());
    }

    getReservations() {
        return this.reservations.slice();
    }

}