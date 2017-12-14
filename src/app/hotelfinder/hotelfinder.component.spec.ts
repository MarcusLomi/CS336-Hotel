import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelfinderComponent } from './hotelfinder.component';

describe('HotelfinderComponent', () => {
  let component: HotelfinderComponent;
  let fixture: ComponentFixture<HotelfinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelfinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelfinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
