import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { Menu } from 'primeng/menu';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    Menubar,
    ButtonModule,
    AvatarModule,
    CommonModule,
    Menu,
    RouterModule,
  ],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  items: MenuItem[] | undefined;
  userNavItems: MenuItem[] | undefined;

  basicNavItems = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      route: '/',
    },
    {
      label: 'Game Rules',
      icon: 'pi pi-list',
      route: '/rules',
    },
  ];

  adminNavItems = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      route: '/',
    },
  ];

  basicUserNavItems = [
    {
      label: 'My House',
      route: '/house',
    },
    {
      label: 'My Campaigns',
      route: '/campaigns',
    },
    {
      label: 'My Characters',
      route: '/characters',
    },
    // {
    //   label: 'Preferences',
    //   route: '/preferences',
    // },
    {
      label: 'Logout',
      route: '/logout',
    },
  ];

  adminUserNavItems = [
    {
      label: 'Preferences',
      route: '/preferences',
    },
    {
      label: 'Logout',
      route: '/logout',
    },
  ];

  constructor(public authService: AuthService) {}

  ngOnInit() {
    if (this.authService.getRole() === 'ADMIN') {
      this.items = this.adminNavItems;
      this.userNavItems = this.adminUserNavItems;
    } else {
      this.items = this.basicNavItems;
      this.userNavItems = this.basicUserNavItems;
    }
  }

  getDiscordOAuthUrl() {
    return `https://discord.com/oauth2/authorize?client_id=${
      environment.discordClientId
    }&redirect_uri=${encodeURIComponent(
      environment.discordRedirectUri
    )}&response_type=code&scope=identify+email`;
  }

  getDiscordAvatarUrl() {
    const user = this.authService.currentUser();
    if (user != null) {
      const ending = user.avatar.startsWith('a_') ? 'gif' : 'png';
      return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ending}`;
    } else {
      return 'discord-logo.svg';
    }
  }
}
