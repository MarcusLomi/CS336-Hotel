
import { Injectable } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { Subject } from "rxjs/Subject";
import { Customer } from "./customer.model";
import { Name } from "./signup/name.model";
import { CreditCard } from "./creditcard.model";

@Injectable()
export class CustomerService implements OnInit{

    private customer = new Customer('invalid', '', '', '', '');

    customersChanged = new Subject<Customer>();

    private names: Name[]; // Keeps a copy of every cid to check for validity during sign up. 
    namesChanged = new Subject<Name[]>();

    private cards: CreditCard[];
    cardsChanged = new Subject<CreditCard[]>();

    constructor() {

    }

    ngOnInit(){
        
    }

    setNewCards(newCards: CreditCard[]){
        this.cards = newCards;
        this.cardsChanged.next(newCards.slice());
    }

    getCards() {
        return this.cards.slice();
    }
    
    setNewNames(newNames: Name[]){
        this.names = newNames;
        this.namesChanged.next(this.names.slice());
    }

    getNewNames() {
        return this.names;
    }

    setMainCustomer(inputCustomer: Customer) {
        console.log("Setting new main customer")
        console.log(inputCustomer)
        this.customer = inputCustomer;
        this.customersChanged.next(this.customer);
    }

    getCurrentCustomer() {
        return this.customer;
    }

}
