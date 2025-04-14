import {
  inject,
  Injectable,
  Injector,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { doc, getDoc } from '@angular/fire/firestore';
import { onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

export type AuthUser = {
  id: string;
  username: string;
  avatar: string;
  email?: string;
  role: 'ADMIN' | 'BASIC';
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private _loading = signal(false);

  readonly currentUser = signal<AuthUser | null>(null);

  get loading() {
    return this._loading;
  }

  constructor(private injector: Injector) {
    this.restoreFromStorage();
    onAuthStateChanged(this.auth, (firebaseUser) => {
      console.log('auth state changed!', firebaseUser);
      if (!firebaseUser) {
        this.clearUser();
      } else {
        runInInjectionContext(this.injector, () => {
          this.fetchUserFromFirestore(firebaseUser.uid);
        });
      }
    });
  }

  async loginWithFirebaseToken(token: string) {
    this._loading.set(true);
    const response = await fetch(`${environment.apiUrl}api/auth?code=${token}`);
    console.log('response', response);
    const data = await response.json();

    if (!data.firebaseToken)
      throw new Error('Failed to authenticate with Firebase.');

    // Sign in with Firebase
    await signInWithCustomToken(this.auth, data.firebaseToken);
  }

  private async fetchUserFromFirestore(uid: string): Promise<void> {
    console.log('uid', uid);
    const userDoc = await getDoc(doc(this.firestore, 'players', uid));
    if (userDoc.exists()) {
      const userData = userDoc.data() as AuthUser;
      this.currentUser.set(userData);
      localStorage.setItem('authUser', JSON.stringify(userData));
    } else {
      this.clearUser();
    }
    this._loading.set(false);
  }

  private restoreFromStorage() {
    const stored = localStorage.getItem('authUser');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AuthUser;
        this.currentUser.set(parsed);
      } catch {
        this.clearUser();
      }
    }
  }

  logout(): void {
    this.auth.signOut();
    this.clearUser();
  }

  private clearUser() {
    this.currentUser.set(null);
    localStorage.removeItem('authUser');
  }

  getRole(): 'ADMIN' | 'BASIC' | null {
    return this.currentUser()?.role ?? null;
  }
}
