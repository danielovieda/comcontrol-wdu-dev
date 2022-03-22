import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  loggedIn = true
  opened: boolean = false

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  getProfile() {
    return this.userService.getProfile()
  }

}
