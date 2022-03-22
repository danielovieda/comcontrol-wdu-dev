import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup

  constructor(private userService: UserService) { 

    this.profileForm = new FormGroup({
        authId: new FormControl(),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        nickname: new FormControl(),
        phone: new FormControl(),
        picture: new FormControl()
    })

  }

  ngOnInit(): void {
    console.log('from profile')
    console.log(this.userService.getEmail())


  }

  submit() {
    
  }

}
