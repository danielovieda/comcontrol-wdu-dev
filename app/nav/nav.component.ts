import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  loggedIn = true
  opened: boolean = false
  date: any

  constructor(private userService: UserService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.date = this.datepipe.transform((new Date), 'MM-dd-yyyy')
  }

  getProfile() {
    return this.userService.getProfile()
  }

  logout() {
    this.userService.logout()
  }
}
