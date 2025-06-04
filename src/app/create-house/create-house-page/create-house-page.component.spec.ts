import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHousePageComponent } from './create-house-page.component';

describe('CreateHousePageComponent', () => {
  let component: CreateHousePageComponent;
  let fixture: ComponentFixture<CreateHousePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHousePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHousePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
