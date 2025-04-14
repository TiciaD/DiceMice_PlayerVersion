import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompendiumComponent } from './compendium.component';

describe('CompendiumComponent', () => {
  let component: CompendiumComponent;
  let fixture: ComponentFixture<CompendiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompendiumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompendiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
