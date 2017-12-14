import { Component, OnInit } from '@angular/core';
import { ServerDataService } from '../../serverdata.service';
import { Name } from './name.model';
import { CustomerService } from '../customer.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  firstName = '';
  lastName = '';
  username = '';
  email = '';
  address = '';
  password = '';
  confirmedPassword = '';
  phone_no = '';
  success = false;
  failure = false;
  badPasswords = false;
  usernameTaken = false;

  subscription: Subscription;
  names: Name[];

  constructor(private serverDataService: ServerDataService,
              private customerService: CustomerService) { }

  ngOnInit() {
    this.serverDataService.getAllUsernames();
    this.subscription = this.customerService.namesChanged
    .subscribe((newNames: Name[]) => {
      this.names = newNames;
    });
    this.names = this.customerService.getNewNames();
  }

  onRegister() {
    console.log(this.username);
    for(let name of this.names){
      if (this.username === name.cid) {
        this.usernameTaken = true;
        return;
      }
    }
    if (this.password !== this.confirmedPassword) {
      console.log('Passwords do not match');
      this.badPasswords = true;
      this.success = false;
    } else {
      this.badPasswords = false;
      this.success = true;
      this.usernameTaken = false;
      this.serverDataService.createCustomer(this.username, this.email, this.address, this.phone_no, (this.firstName+ ' '+this.lastName),this.password);
      this.serverDataService.signInUser(this.username,this.password);
    }
  }


}
