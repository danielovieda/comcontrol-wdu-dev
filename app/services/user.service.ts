import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  name: any
  email: any
  profile: any

  constructor(public auth: AuthService) { }

  login(force: boolean) {
    
  }

  logout() {
    this.auth.logout()
  }

  isLoggedIn() {
    if (this.auth.isAuthenticated$) {
      return true
    } else {
      return false
    }
  }

  loadProfile() {
    console.log('loading profile')
    this.auth.user$.subscribe(
      profile => this.profile = profile
    )
    console.log(this.profile)
  }

  getProfile() {
    if (this.profile) {
      return this.profile
    } else {
      return false
    }
  }

  saveProfile(data: any) {
    this.profile = data
    console.log('from the service....')
    console.log(this.profile)
  }

  logProfile() {
    console.log(this.profile)
  }

  getUser() {
    return this.profile.name
  }

  getUserId() {
    return this.profile.sub
  }

  getEmail() {
    return this.profile.email
  }


}
