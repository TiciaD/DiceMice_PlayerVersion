import { Component, inject, signal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { County } from '../../shared/models/county.model';
import { RegionSelectorComponent } from '../region-selector/region-selector.component';
import { CreateHouseFormComponent } from '../create-house-form/create-house-form.component';
import { FirestoreService } from '../../shared/services/firestore.service';
import { AuthService } from '../../core/services/auth.service';
import { GlobalVarsService } from '../../core/services/global-vars.service';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { House } from '../../shared/models/house.model';

@Component({
  selector: 'app-create-house-page',
  imports: [
    ProgressSpinnerModule,
    ButtonModule,
    RegionSelectorComponent,
    CreateHouseFormComponent,
    RouterModule,
  ],
  templateUrl: './create-house-page.component.html',
  styleUrl: './create-house-page.component.scss',
})
export class CreateHousePageComponent {
  isLoading = signal(true);
  showRegionSelector = signal(true);
  selectedCounty = signal<County | null>(null);
  selectedCampaignId = signal<string | null>(null);
  existingHouse = signal(false);

  private firestoreService = inject(FirestoreService);
  private authService = inject(AuthService);
  private globalVarsService = inject(GlobalVarsService);

  constructor() {}

  async ngOnInit() {
    this.isLoading.set(true);
    this.selectedCampaignId = this.globalVarsService.selectedCampaignId;
    await this.findAndSetExistingHouse();

    this.isLoading.set(false);
  }

  async findAndSetExistingHouse() {
    const user = this.authService.currentUser();
    if (!user) return;

    if (!user.lastCampaignId) return;

    const house = await this.firestoreService.loadHouseForCampaign(
      user.id,
      user.lastCampaignId
    );

    if (house) {
      this.existingHouse.set(true);
      this.globalVarsService.currentHouse.set(house);
    } else {
      this.existingHouse.set(false);
    }
  }

  onSubmit = async (house: House) => {
    this.isLoading.set(true);
    const selectedCounty = this.selectedCounty();
    const campaignId = this.selectedCampaignId();

    console.log('Submit house:', house);
    console.log('campaign id', campaignId);
    console.log('selected county', selectedCounty);
    if (campaignId && selectedCounty) {
      await this.firestoreService.saveHouseToCampaign(
        campaignId,
        this.authService.currentUser()?.id ?? '',
        {
          ...house,
        }
      );

      await this.findAndSetExistingHouse();
    }
    this.isLoading.set(false);
  };
}
