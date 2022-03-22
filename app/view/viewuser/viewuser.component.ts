import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from "@angular/material/dialog";
import { AddNoteComponent } from 'src/app/modal/add-note/add-note.component';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss']
})
export class ViewuserComponent implements OnInit {

  userData: any
  userId: string
  noteData: any
  genericError: string = "An error has occurred. Please try again."

  constructor(private service: BackendService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public datepipe: DatePipe,
    private userService: UserService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get('id')
      this.loadData(this.userId)
      console.log('user stuff for ' + params.get('id'))
      console.log(this.userData)
    })

  }

  addNoteDialog(some: string) {

  }

  closeNote(id: string) {

  }

  loadData(id: string) {
    this.service.getUserData(id).subscribe(
      response => {
        if (response) {
          this.userData = response
        } else {
          this.toastr.error(this.genericError)
        }
      }
    )
  }

}
