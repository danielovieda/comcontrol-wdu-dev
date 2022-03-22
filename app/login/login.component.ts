import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  error: string = ''
  profileJson: string

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // if (!this.userService.auth.isAuthenticated$) {
    //   console.log('not auth')
    //   this.userService.login(false)
    // } else if (!this.userService.getProfile()) {
    //   console.log('no profile')
    //   this.userService.login(false)
    // } else {
    //   this.userService.loadProfile()
    // }

    

  }

  submit() {
    this.error = "Submitted."
  }

  force() {
    this.userService.login(true)
  }

  doSomething() {
    console.log(this.userService.getProfile().email)
  }

  logout() {
    this.userService.logout()
  }

}
