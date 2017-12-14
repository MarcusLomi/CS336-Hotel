import { Component, OnInit } from '@angular/core';
import { ServerDataService } from '../../serverdata.service';
import { Subscription } from 'rxjs/Subscription';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})

export class SigninComponent implements OnInit {

      username = '';
      userPassword = '';
      disabled = 'disabled';
      attemptedSignin = false;
      signinSuccess;

      private customer = new Customer('invalid', '', '', '', '');
      private customerOverride =  new Customer('invalid', '', '', '', ''); // This customer acts as the reset to sign out the current customer 

      subscription: Subscription;

      constructor( private serverDataService: ServerDataService,
                   private customerService: CustomerService) { }

      ngOnInit() {
        this.subscription = this.customerService.customersChanged
        .subscribe(
          (newCustomer: Customer) => {
            this.customer = newCustomer ;
          }
        );
        this.customer = this.customerService.getCurrentCustomer();
      }

      onUserSignin() { // Wrapper method to execute the DB call and then check to see if the user data was pulled back. 
        this.makeDBRequest(); 
        this.setSigninSuccess(); // This is done afterwards because the customer isn't during makeDBRequest
        console.log('Successful?' + this.signinSuccess)
      }

      makeDBRequest() {
        console.log('Sigining in with credentials:' + this.username + ' : ' + this.userPassword);
        this.serverDataService.signInUser(this.username, this.userPassword);
        this.attemptedSignin= true;
      }
    
      setSigninSuccess() {    // Checking to see if the request to login to the database was successful
        if(this.customer.cid === 'invalid') { // Writing this out very explicity. can be done in one line but I'm doing it in more
          this.signinSuccess = false;
        } else {
          this.signinSuccess = true;
        }
      }

      signOutUser() {
        this.customerService.setMainCustomer(this.customerOverride);
      }

}
 