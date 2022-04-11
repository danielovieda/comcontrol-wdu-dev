import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private auth: AuthService, private userService: UserService) { }


  title = 'comcontrol';
  loggedIn = false
  profile: any
  debug = false

  ngOnInit(): void {
    
    this.auth.isLoading$.subscribe(
      response => {
        if (response) {
          
        } else {
          this.auth.isAuthenticated$.subscribe(
            response => {
              if (response) {
                
                this.loggedIn = true
                this.auth.user$.subscribe(
                  response => {
                    this.userService.saveProfile(response)
                  }
                )
              } else {
                this.triggerLogin()
                
              }
            }
          )
        }
      }
    )
  }

  triggerLogin() {
    this.auth.loginWithRedirect()
  }

}
