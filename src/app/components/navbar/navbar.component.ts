import { Component, OnInit } from '@angular/core';
import { User } from '@app/entities/user';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { ShareRequestService } from '@app/services/share-request/share-request.service';
import { ShareRequest } from '@app/entities/share-request';

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
  shareRequests: ShareRequest[];

  iconNotification = faBell;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private shareRequestService: ShareRequestService) { }

  ngOnInit(): void {
    this.loadUser();
    this.listShareRequests();
  }

  async loadUser() {
    this.user = await this.authService.getUser();
  }

  signOut(): void {
    this.authService.destroySession();
    this.router.navigateByUrl('/auth/signIn');
  }

  async listShareRequests() {
    this.shareRequestService.findAll().subscribe(
      (requests: ShareRequest[]) => this.shareRequests = requests)
  }
}
