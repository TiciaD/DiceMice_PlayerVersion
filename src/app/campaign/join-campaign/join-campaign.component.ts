import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FirestoreService } from '../../shared/services/firestore.service';
import { Campaign } from '../../shared/models/campaign.model';
import { AuthService } from '../../core/services/auth.service';
import { GlobalVarsService } from '../../core/services/global-vars.service';

@Component({
  selector: 'app-join-campaign',
  imports: [
    InputGroup,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    FormsModule,
    InputTextModule,
    RouterModule,
  ],
  standalone: true,
  templateUrl: './join-campaign.component.html',
  styleUrl: './join-campaign.component.scss',
})
export class JoinCampaignComponent {
  campaignId: string = '';
  isValid: boolean = false;
  errorMessage: string = '';
  foundCampaign: Campaign | null = null;

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private globalVarsService: GlobalVarsService
  ) {}

  onInputChange() {
    this.isValid = this.campaignId.trim().length > 0;
    this.errorMessage = '';
  }

  async joinCampaign() {
    const res = await this.firestoreService.fetchCampaignById(
      this.campaignId.toLowerCase().trim()
    );
    if (res) {
      this.foundCampaign = res;
      this.errorMessage = '';
      console.log('Success! Found campaign', res);
      await this.firestoreService.addUserToCampaignIfNotExists(
        this.campaignId.toLowerCase().trim(),
        this.authService.currentUser()?.id ?? '',
        this.authService.currentUser()?.username ?? '',
        'PLAYER'
      );

      await this.firestoreService.saveCampaignIdToUser(
        this.authService.currentUser()?.id ?? '',
        res.id
      );

      this.globalVarsService.selectedCampaignId.set(res.id);
    } else {
      this.errorMessage = '❌ No campaign found with that ID.';
    }
  }

  async joinDefaultCampaign() {
    const res = await this.firestoreService.fetchCampaignById(
      '0000000000' // Default Campaign ID
    );
    if (res) {
      this.foundCampaign = res;
      this.errorMessage = '';
      await this.firestoreService.addUserToCampaignIfNotExists(
        '0000000000',
        this.authService.currentUser()?.id ?? '',
        this.authService.currentUser()?.username ?? '',
        'PLAYER'
      );

      await this.firestoreService.saveCampaignIdToUser(
        this.authService.currentUser()?.id ?? '',
        '0000000000'
      );

      this.globalVarsService.selectedCampaignId.set(res.id);
      console.log('Success! Found campaign', res);
    } else {
      console.log('res error: ', res);
      this.errorMessage = '❌ No campaign found with that ID.';
    }
  }
}
