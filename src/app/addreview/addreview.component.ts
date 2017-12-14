import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ServerDataService } from '../../serverdata.service';

@Component({
  selector: 'app-addreview',
  templateUrl: './addreview.component.html',
  styleUrls: ['./addreview.component.css']
})
export class AddreviewComponent implements OnInit {

  constructor(private customerService: CustomerService,
              private serverDataService: ServerDataService ) { }

  ngOnInit() {
    
  }

}
