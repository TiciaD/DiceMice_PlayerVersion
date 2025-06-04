import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHouseFormComponent } from './create-house-form.component';

describe('CreateHouseFormComponent', () => {
  let component: CreateHouseFormComponent;
  let fixture: ComponentFixture<CreateHouseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHouseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHouseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
