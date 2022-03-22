import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from "@angular/material/dialog";
import { AddNoteComponent } from 'src/app/modal/add-note/add-note.component';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-passdown',
  templateUrl: './passdown.component.html',
  styleUrls: ['./passdown.component.scss']
})
export class PassdownComponent implements OnInit {

  passdown: any
  haveResponse: boolean
  timestamp: any
  loading: boolean = false
  scheduleData: any
  passdownDate: string
  dummySchedule: any = {
    date: '02-14-2022',
    off_time: [{}],
    protection: [{}],
    pm: [{}],
    note: [{}]
  }

  constructor(private service: BackendService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public datepipe: DatePipe,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.passdownDate = params.get('date')
    })

    console.log('passdown date ' + this.passdownDate)


    this.service.getPassdown('none').subscribe(
      response => {
        if (response) {
          this.passdown = response
          console.log(response)
        } else {
          this.haveResponse = false
        }
      }
    )


    this.service.getSchedule(this.passdownDate).subscribe(
      response => {
        if (response) {
          this.scheduleData = response
          console.log(this.scheduleData)
        } else {
          this.scheduleData = { date: this.passdownDate }
        }
      }
    )
  }

  addNote() {
    const dialogRef = this.dialog.open(AddNoteComponent, {
      data: { vehicle: '' }, minWidth: '40%', minHeight: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.savePassdownNote(result);
    });
  }

  closeNote(id: string) {
    this.timestamp = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss a');

    let payload = {
      _id: id,
      status: 'closed',
      closedTimestamp: this.timestamp,
      closedBy: this.userService.getUser()
    }
    this.service.updateNote(payload).subscribe(
      response => this.toastr.success(response.success)
    )

    this.refreshNotes()
  }

  refreshNotes() {
    this.spinner.show()
    this.loading = true
    this.passdown = [{}]

    setTimeout(() => {

      this.service.getPassdown('none').subscribe(
        response => {
          if (response) {
            this.passdown = response
            console.log(response)
            this.loading = false
           
          } else {
            this.haveResponse = false
          }
        }
      )

      this.spinner.hide()

    }, 2000);
    
  }

  savePassdownNote(data: any) {
    if (!data) {
      console.log('no passdown note to save')
      return
    }

    

    this.timestamp = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss a');

    let payload = {
      vehicleId: 'none',
      number: 'Passdown',
      timestamp: this.timestamp,
      userId: this.userService.getUserId(),
      username: this.userService.getUser(),
      status: 'open',
      type: data.type,
      note: data.note,
      pinned: data.pinned
    }

    this.service.addNote(payload).subscribe(
      response => {
        console.log(response)
        if (response) {
          this.toastr.success(response.success)
          this.refreshNotes()
        } else {
          this.toastr.error('Unable to save note. Please try again.')
        }
      }
    )

  }

}
