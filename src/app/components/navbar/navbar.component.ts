import { Component, OnInit } from '@angular/core';
import { User } from '@app/entities/user';
import { AuthService } from '@app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isCollapsed: boolean = false;

  navItems: Array<any> = [
    {link: '/home', text: 'Home'},
    {link: '/boards', text: 'Boards'},
    {link: '/friends', text: 'Friends'},
  ]

  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  async loadUser() {
    this.user = await this.authService.getUser();
  }
}
