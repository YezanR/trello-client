import { Component, OnInit } from '@angular/core';
import { User } from '../entities/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isCollapsed: boolean = false;

  navItems: Array<any> = [
    {link: '/home', text: 'Home'},
    {link: '/todolists', text: 'Todolists'},
    {link: '/friends', text: 'Friends'},
  ]

  user: User;

  constructor() { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    let user: User = new User();
    user.firstName = "Yezan";
    user.lastName = "Rafed";
    user.email = "y.rafed@gmail.com";
    user.username = "yezanr";
    this.user = user;
  }
}
