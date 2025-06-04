import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseOverviewComponent } from './house-overview.component';

describe('HouseOverviewComponent', () => {
  let component: HouseOverviewComponent;
  let fixture: ComponentFixture<HouseOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
