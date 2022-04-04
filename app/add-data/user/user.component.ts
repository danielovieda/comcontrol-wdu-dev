import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userForm: FormGroup
  editUserId: any
  genericError: string = 'User does not exist.'
  editMode: boolean = false
  deleteMode: boolean = false
  routeList: any
  availableRoutes: any = []
  knownRoutes: any = []

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

    this.service.getRouteList().subscribe(
      response => {
        if (response) {
          this.availableRoutes = response
        } else {
          this.toastr.error('Could not load route list.')
        }
      }
    )



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
            this.toastr.success('Editing user')




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

    let payload = this.userForm.value
    payload.knownRoutes = this.knownRoutes

    console.log('logging payload')
    console.log(JSON.stringify(payload))

    this.saveUserData(payload)
  }

  saveUserData(data: any) {
    this.service.updateUser(data).subscribe(
      response => {
        if (response.success) {
          this.toastr.success(response.success)
          this.userForm.reset()
          this.deleteMode = false
          setTimeout(() => {
            this.router.navigateByUrl('/manage/user/' + data._id)
          }, 1000)
        } else {
          this.toastr.error('Could not delete user.')
        }
      }
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
      phone: data.phone,
    })

    if (data.knownRoutes) {
      this.knownRoutes = data.knownRoutes


    
      for (let y = 0; y < this.knownRoutes.length; y++) {
        let removeIndex = this.availableRoutes.findIndex(item => item._id === this.knownRoutes[y]._id)


          this.availableRoutes.splice(removeIndex, 1)

        
      }

      
      
    }
  }

  filterTest(obj: any, obj2: any) {
    console.log('object 1')
    console.log(obj)
    console.log('object 2')
    console.log(obj2)
    let index = obj.findIndex((x: { _id: string; }) => x._id === obj2._id)
    if (index >= 0) {
      return false
    } else {
      return true
    }
  }

  delete() {
    let del = new FormControl('user_id')
    this.userForm.addControl('delete', del)
    this.deleteMode = true
    this.toastr.warning('Click update to confirm deletion.')
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  logIt() {
    console.log(this.knownRoutes)
  }
  

}
