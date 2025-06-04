import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-rules',
  imports: [RouterModule, ButtonModule],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.scss',
})
export class RulesComponent {
  constructor(public authService: AuthService) {}

  getDiscordOAuthUrl() {
    return `https://discord.com/oauth2/authorize?client_id=${
      environment.discordClientId
    }&redirect_uri=${encodeURIComponent(
      environment.discordRedirectUri
    )}&response_type=code&scope=identify+email`;
  }
}
