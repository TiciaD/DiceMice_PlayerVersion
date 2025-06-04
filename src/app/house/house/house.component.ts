import { Component, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FirestoreService } from '../../shared/services/firestore.service';
import { House } from '../../shared/models/house.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-house',
  imports: [],
  templateUrl: './house.component.html',
  styleUrl: './house.component.scss',
})
export class HouseComponent {
  house = signal<House | null>(null);
  constructor(
    private router: Router,
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  async ngOnInit() {
    const currentUser = this.authService.currentUser();

    if (currentUser?.id) {
      // Only Authorized BASIC users should be on this page
      if (currentUser.role == 'BASIC') {
        // Check for houseId in cache
        const foundHouse = await this.firestoreService.fetchHouseByUserId(
          currentUser.id
        );
        if (foundHouse) {
          console.log('found house', foundHouse);
        }
      } else {
        // If ADMIN user, then reroute to the houses page where they can see all houses
        this.router.navigate(['/houses']);
        return;
      }
    } else {
      this.router.navigate(['/login']);
      return;
    }
  }
}
