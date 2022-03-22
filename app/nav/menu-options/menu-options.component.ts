import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-menu-options',
  templateUrl: './menu-options.component.html',
  styleUrls: ['./menu-options.component.scss']
})
export class MenuOptionsComponent implements OnInit {

  loggedIn: boolean = true
  date: any

  constructor(private datepipe: DatePipe, private userService: UserService) { }

  ngOnInit(): void {
    this.date = this.datepipe.transform((new Date), 'MM-dd-yyyy')
    console.log(this.date)
  }

  logout() {
    this.userService.logout()
  }

}
