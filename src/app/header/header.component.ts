import { Component } from '@angular/core';
import { ServerDataService } from '../../serverdata.service';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

       constructor(private serverDataService: ServerDataService,
                   private customerService: CustomerService) {
       }

       signedIn = false;

       private customerOverride =  new Customer('invalid', '', '', '', ''); // This customer acts as the reset to sign out the current customer 

       signOutUser() {
        this.customerService.setMainCustomer(this.customerOverride);
       }

       updateData() {
          console.log("UPDATING");
          this.serverDataService.getHotels();
       }

       checkForUser() {
         console.log('CHECKING IF SIGNED IN')
          if(this.customerService.getCurrentCustomer().cid!=='invalid'){
            this.signedIn = true;
          } else {
            this.signedIn = false;
          }
       }

}