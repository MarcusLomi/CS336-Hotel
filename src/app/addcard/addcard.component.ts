import { Component, OnInit } from '@angular/core';
import { ServerDataService } from '../../serverdata.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
  styleUrls: ['./addcard.component.css']
})
export class AddcardComponent implements OnInit {

  constructor(private serverDataService:ServerDataService,
              private customerService: CustomerService) { }

  cardNumber="";
  cardholder_name = "";
  billing_Addr = "";
  exp_date = "";
  sec_Code = "";
  month = "";
  year = "";
  day = "30";
  cardType = "";
  finalDate

  success = false;

  ngOnInit() {
  }

  addNewCard() {
    console.log("Adding new Card");
    this.finalDate = this.year + '-' + this.month + '-' + this.day;
    console.log(this.finalDate);
    this.serverDataService.createCard(this.cardNumber, this.customerService.getCurrentCustomer().cid, this.billing_Addr, this.cardholder_name, this.sec_Code
    ,this.cardType, this.finalDate);
    this.serverDataService.getCreditCards();
    this.success = true;
  }


}
