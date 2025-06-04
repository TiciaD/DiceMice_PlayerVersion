import {
  EnvironmentInjector,
  inject,
  Injectable,
  runInInjectionContext,
} from '@angular/core';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  getDocs,
  getDocsFromCache,
  getDocsFromServer,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { House } from '../models/house.model';
import { Campaign } from '../models/campaign.model';
import { firstValueFrom } from 'rxjs';
import { County } from '../models/county.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector);

  fetchHouseByUserId = async (
    userId: string,
    source: 'default' | 'cache' | 'server' = 'default'
  ): Promise<House | null> => {
    const housesRef = collection(this.firestore, 'houses');
    const q = query(housesRef, where('userId', '==', userId));

    let snapshot;
    if (source === 'cache') {
      snapshot = await getDocsFromCache(q);
    } else if (source === 'server') {
      snapshot = await getDocsFromServer(q);
    } else {
      snapshot = await getDocs(q);
    }

    if (snapshot.empty) return null;

    const houseData = snapshot.docs[0].data() as House;
    return { ...houseData, id: snapshot.docs[0].id };
  };

  fetchCampaignById = async (campaignId: string): Promise<Campaign | null> => {
    return await runInInjectionContext(this.injector, async () => {
      try {
        const docRef = doc(this.firestore, `campaigns/${campaignId}`);
        const campaign = await firstValueFrom(
          docData(docRef, { idField: 'id' })
        );
        return campaign as Campaign;
      } catch {
        return null;
      }
    });
  };

  fetchCounties = async (): Promise<County[]> => {
    return await runInInjectionContext(this.injector, async () => {
      try {
        const countiesRef = collection(this.firestore, 'counties');
        const snapshot = await getDocs(countiesRef);

        if (snapshot.empty) return [] as County[];

        const countiesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as County[];
        return countiesData;
      } catch (e) {
        console.error('error fetchCounties:', e);
        return [] as County[];
      }
    });
  };

  addUserToCampaignIfNotExists = async (
    campaignId: string,
    userId: string,
    username: string,
    role: 'PLAYER' | 'DM'
  ): Promise<'alreadyExists' | 'added' | 'notAdded'> => {
    return await runInInjectionContext(this.injector, async () => {
      try {
        const memberRef = doc(
          this.firestore,
          `campaigns/${campaignId}/members/${userId}`
        );
        const memberSnap = await getDoc(memberRef);

        if (memberSnap.exists()) {
          return 'alreadyExists';
        }

        await setDoc(memberRef, {
          userId,
          username,
          role,
          joinedAt: new Date().toISOString(),
        });

        return 'added';
      } catch (e) {
        console.error('error addUserToCampaign:', e);
        return 'notAdded';
      }
    });
  };

  loadHouseForCampaign = async (userId: string, campaignId: string) => {
    return await runInInjectionContext(this.injector, async () => {
      try {
        const houseRef = doc(
          this.firestore,
          `campaigns/${campaignId}/houses/${userId}`
        );
        const houseSnap = await getDoc(houseRef);

        if (houseSnap.exists()) {
          return houseSnap.data() as House;
        } else {
          return null;
        }
      } catch (e) {
        console.error('error fetching house by campaign:', e);
        return null;
      }
    });
  };

  async saveHouseToCampaign(
    campaignId: string,
    userId: string,
    houseData: Partial<House> & { name: string; motto: string }
  ): Promise<void> {
    return await runInInjectionContext(this.injector, async () => {
      try {
        const houseRef = doc(
          this.firestore,
          `campaigns/${campaignId}/houses/${userId}`
        );

        await setDoc(houseRef, {
          ...houseData,
          userId,
          campaignId,
          gold: 0,
          createdAt: new Date().toISOString(),
        });
      } catch (e) {
        console.error('error saving house to campaign:', e);
      }
    });
  }

  saveCampaignIdToUser = async (userId: string, campaignId: string) => {
    return await runInInjectionContext(this.injector, async () => {
      try {
        const userRef = doc(this.firestore, 'players', userId);
        await setDoc(
          userRef,
          {
            lastCampaignId: campaignId,
          },
          { merge: true }
        );
      } catch (e) {
        console.error('error saving house to campaign:', e);
      }
    });
  };
}
