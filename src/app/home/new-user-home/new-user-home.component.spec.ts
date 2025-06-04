import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserHomeComponent } from './new-user-home.component';

describe('NewUserHomeComponent', () => {
  let component: NewUserHomeComponent;
  let fixture: ComponentFixture<NewUserHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUserHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
