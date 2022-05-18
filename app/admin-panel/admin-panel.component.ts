import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  addUserForm: any

  constructor() { }

  ngOnInit(): void {

    this.addUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      account: new FormControl(''),
      role: new FormControl('')
    })

  }

}
