import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinCampaignComponent } from './join-campaign.component';

describe('JoinCampaignComponent', () => {
  let component: JoinCampaignComponent;
  let fixture: ComponentFixture<JoinCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinCampaignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
