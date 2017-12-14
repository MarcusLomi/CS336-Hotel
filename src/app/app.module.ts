import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { SigninComponent} from './signin/signin.component';
import { WarningComponent} from './warning/warning.component';
import { SuccessComponent } from './success/success.component';
import { SignupComponent } from './signup/signup.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HotelpageComponent } from './hotelpage/hotelpage.component';
import { ReviewlistComponent } from './reviewlist/reviewlist.component';
import { ReviewitemComponent } from './reviewitem/reviewitem.component';
import { HotelfinderComponent } from './hotelfinder/hotelfinder.component';
import { PagefooterComponent } from './pagefooter/pagefooter.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelService} from './hotelfinder/hotel.service';
import { ServerDataService} from '../serverdata.service';
import {HttpClientModule} from '@angular/common/http';
import { RoomListComponent } from './hotelpage/room/room-list/room-list.component';
import { RoomService } from './hotelpage/room/room-list/room.service';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { AddcardComponent } from './addcard/addcard.component';
import { CustomerService } from './customer.service';
import { AddreviewComponent } from './addreview/addreview.component';
// Add in your app routes here!
const appRoutes: Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'hotelpage', component: HotelpageComponent},
  { path: 'hotelfinder', component: HotelfinderComponent},
  { path: 'profilepage', component: ProfilepageComponent},
  { path: '', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    WarningComponent,
    SuccessComponent,
    SignupComponent,
    HomeComponent,
    HotelpageComponent,
    ReviewlistComponent,
    ReviewitemComponent,
    HotelfinderComponent,
    PagefooterComponent,
    HotelListComponent,
    RoomListComponent,
    ProfilepageComponent,
    AddcardComponent,
    AddreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HotelService, ServerDataService, RoomService, CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
