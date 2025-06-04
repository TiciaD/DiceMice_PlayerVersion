import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { authGuard } from './core/services/auth.guard';

export const routes: Routes = [
  // {
  //   path: 'faqs',
  //   loadComponent: () =>
  //     import('./faqs/faqs/faqs.component').then((f) => f.FaqsComponent),
  // },
  {
    path: 'create-campaign',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./campaign/create-campaign/create-campaign.component').then(
        (c) => c.CreateCampaignComponent
      ),
  },
  {
    path: 'join-campaign',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./campaign/join-campaign/join-campaign.component').then(
        (c) => c.JoinCampaignComponent
      ),
  },
  {
    path: 'rules',
    loadComponent: () =>
      import('./rules/rules/rules.component').then((r) => r.RulesComponent),
  },
  // {
  //   path: 'compendium',
  //   loadComponent: () =>
  //     import('./compendium/compendium/compendium.component').then(
  //       (c) => c.CompendiumComponent
  //     ),
  // },
  // {
  //   path: 'community',
  //   loadComponent: () =>
  //     import('./community/community/community.component').then(
  //       (c) => c.CommunityComponent
  //     ),
  // },
  {
    path: 'characters',
    loadComponent: () =>
      import('./characters/characters/characters.component').then(
        (c) => c.CharactersComponent
      ),
  },
  {
    path: 'preferences',
    loadComponent: () =>
      import('./preferences/preferences.component').then(
        (p) => p.PreferencesComponent
      ),
  },
  {
    path: 'create-house',
    canActivate: [authGuard],
    loadComponent: () =>
      import(
        './create-house/create-house-page/create-house-page.component'
      ).then((h) => h.CreateHousePageComponent),
  },
  {
    path: 'house',
    loadComponent: () =>
      import('./house/house/house.component').then((h) => h.HouseComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'logout',
    loadComponent: () =>
      import('./logout/logout.component').then((m) => m.LogoutComponent),
  },
  {
    path: 'callback',
    loadComponent: () =>
      import('./auth-callback/auth-callback.component').then(
        (c) => c.AuthCallbackComponent
      ),
  },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
