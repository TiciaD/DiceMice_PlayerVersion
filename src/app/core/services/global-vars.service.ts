import { Injectable, signal } from '@angular/core';
import { FirestoreService } from '../../shared/services/firestore.service';
import { County } from '../../shared/models/county.model';
import { House } from '../../shared/models/house.model';

@Injectable({
  providedIn: 'root',
})
export class GlobalVarsService {
  selectedCampaignId = signal<string | null>(null);
  currentHouse = signal<House | null>(null);
  allCounties = signal<County[]>([]);

  constructor(private firestoreService: FirestoreService) {
    this.loadBaseData();
  }

  loadBaseData = async () => {
    // Fetch counties
    const counties = await this.firestoreService.fetchCounties();
    this.allCounties.set(counties);
  };
}
