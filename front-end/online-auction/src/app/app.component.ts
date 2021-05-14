import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  private roles: string[];

  siteLanguage: string = 'English';
  siteLocale: string;
  localesList = [
    {code: 'en', label: 'English'},
    {code: 'ru', label: 'Русский'}
  ];

  constructor(private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    // todo check split index
    this.siteLocale = window.location.pathname.split('/')[ 2 ];
    this.siteLanguage = this.localesList.find(f => f.code === this.siteLocale).label;

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
