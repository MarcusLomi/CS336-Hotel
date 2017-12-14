import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelpageComponent } from './hotelpage.component';

describe('HotelpageComponent', () => {
  let component: HotelpageComponent;
  let fixture: ComponentFixture<HotelpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
