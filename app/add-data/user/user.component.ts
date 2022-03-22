import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userForm: FormGroup
  editUserId: any
  genericError: string = 'An unknown error occurred.'
  editMode: boolean = false

  constructor(private route: ActivatedRoute, private service: BackendService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router) {

      this.userForm = new FormGroup({
        _id: new FormControl(),
        email: new FormControl('', Validators.required),
        company: new FormControl(''),
        site: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        nickname: new FormControl(),
        phone: new FormControl()


      })


     }

  ngOnInit(): void {


    this.route.paramMap.subscribe((params: ParamMap) => {
      this.editUserId = params.get('id')
      console.log(this.editUserId + ' user id')
    })

    if (this.editUserId != null) {
      
      this.service.getUserData(this.editUserId).subscribe(
        response => {
          if (response) {
            this.spinner.show()
            this.loadUserData(response)
            this.editMode = true
          } else {
            this.toastr.error(this.genericError)
          }
        }
      )
    }
    
  }


  submit() {
    console.log(this.userForm.value)

    if (!this.userForm.valid) {
      this.toastr.error('Ensure form is valid before submission.')
      return
    }

    if (this.userForm.get('_id').value == null) {
      this.userForm.get('_id').setValue('')
    }

    this.saveUserData(this.userForm.value)
  }

  saveUserData(data: any) {
    this.service.updateUser(data).subscribe(
      response => this.toastr.success(response.success)
    )
    if (!this.editMode) {
      this.userForm.reset()
    }
  }

  loadUserData(data: any) {
    if (data == null) {
      this.spinner.hide();
      this.toastr.error(this.genericError)
      return
    }

    this.userForm.reset()

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1500);

    this.userForm.setValue({
      _id: data._id,
      email: data.email,
      company: data.company,
      site: data.site,
      role: data.role,
      firstName: data.firstName,
      lastName: data.lastName,
      nickname: data.nickname,
      phone: data.phone
    })
  }
  

}
