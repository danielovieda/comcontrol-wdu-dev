import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';


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
    
    this.auth.user$.subscribe(
      profile => this.profile = profile
    )
    
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
  
  }

  logProfile() {
    
  }

  getUser() {
    if (this.auth.isAuthenticated$) return this.profile.name
    if (!this.auth.isAuthenticated$) this.logout()
  }

  getUserId() {
    return this.profile.sub
  }

  getEmail() {
    return this.profile.email
  }


}
