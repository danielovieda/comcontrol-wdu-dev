import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from "@angular/material/dialog";
import { AddNoteComponent } from 'src/app/modal/add-note/add-note.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { ViewmodalComponent } from 'src/app/view/viewmodal/viewmodal.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  @Input() data: any

  constructor(private service: BackendService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public datepipe: DatePipe,
    private userService: UserService,
    private router: Router,
    private dataService: DataService) { }

    driverList: any
    routeList: any
    vehicleList: any
    timestamp: any
    pinnedNotes: any
    showComment = -1
    showDelete = -1
    currentComment: string = ''

    genericError: string = 'An error has occurred. Please try again.'

  ngOnInit(): void {

    this.service.getPinned().subscribe(
      response => {
        this.pinnedNotes = response
      }
    )


    this.driverList = this.dataService.returnDrivers()

    this.routeList = this.dataService.returnRoutes()

    this.vehicleList = this.dataService.returnVehicles()

    

  }

  showCommentBox(i: number) {
    if (i === this.showComment) {
      this.showComment = -1
    } else {
      this.showComment = i
    }
  }

  navBack() {
    let yesterday = new Date(this.data.date)
    yesterday.setDate(yesterday.getDate() - 1)
    

    this.router.navigateByUrl('/passdown/' + this.datepipe.transform(yesterday, 'MM-dd-yyyy')).then(() => {
      window.location.reload()
    })
  }

  navNext() {
    let tomorrow = new Date(this.data.date)
    tomorrow.setDate(tomorrow.getDate() + 1)

    this.router.navigateByUrl('/passdown/' + this.datepipe.transform(tomorrow, 'MM-dd-yyyy')).then(() => {
      window.location.reload()
    })
  }

  addToPassdown(type: string) {

    


    const dialogRef = this.dialog.open(AddNoteComponent, {
      data: { vehicle: '', type: type, drivers: this.driverList, routes: this.routeList, vehicles: this.vehicleList }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.saveNote(result, type, this.data.date);
    });

  }

  editNote(id: string, style: string, note: string, comments: {}) {
    

    let type = 'editNote'

    const dialogRef = this.dialog.open(AddNoteComponent, {
      data: { vehicle: '', id: id, type: type, style: style, note: note, comments: comments }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.saveEditedNote(id, result);
    });

  }

  saveEditedNote(id: string, data: any) {
    if (!data) {
      
      return
    }

    this.service.editNote(id, data).subscribe(
      response => {
        if (response) {
          this.toastr.success(response.success)
          this.service.addHistory('EDITED', 'NOTE', id, '', '', data.note).subscribe()
          this.reload()
        } else {
          this.toastr.error(this.genericError)
        }
      }
    )

  }


  addComment(id: string, comment: string) {
    if (comment.trim().length < 3) {
      this.toastr.error("Your comment isn't long enough. Try again.")
      return
    }
    this.timestamp = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss a');

    let payload = {
      commentId: uuidv4(),
      comment: comment,
      timestamp: this.timestamp,
      user: this.userService.getUser(),
      userId: this.userService.getUserId()
    }

    this.service.addPassdownComment(id, payload).subscribe(
      response => {
        if (response) {
          this.toastr.success(response.success)
          this.service.addHistory('ADDED', 'COMMENT', payload.commentId, 'PASSDOWN NOTE', id, payload.comment).subscribe()
          this.reload()
        } else {
          this.toastr.error(this.genericError)
        }
      }
    )


  }

  deleteComment(id: string, date: string, userId: string) {
    if (userId != this.userService.getUserId() ) {
      this.toastr.error('Unable to delete comment.')
      return
    }
    

     this.service.removePassdownComment(id, {}).subscribe(
       response => {
         if (response) {
           this.toastr.success(response.success)
           this.service.addHistory('DELETED','COMMENT', id, 'PASSDOWN NOTE', '', '').subscribe()
           this.reload()
         } else {
           this.toastr.error(this.genericError)
         }
       }
     )
  }

  saveNote(data: any, type: string, date: string) {
    
    if (!data) {
     
      return
    }

    if (type == 'off') {
      this.service.addOfftime(date, data).subscribe(
        response => {
          if (response) {
            this.toastr.success(response.success)
            this.service.addHistory('ADDED', 'DRIVER OFF TIME', '', data.driver, data.driverId, data.note).subscribe()
          } else {
            this.toastr.error(this.genericError)
          }
        }
      )
    }

    if (type == 'protection') {
      this.service.addProtection(date, data).subscribe(
        response => {
          if (response) {
            this.toastr.success(response.success)
            this.service.addHistory('ADDED', 'DRIVER PROTECTION', '', data.driver, data.driverId, data.note).subscribe()
          } else {
            this.toastr.error(this.genericError)
          }
          
        } 
      )
    }

    if (type == 'pm') {
      this.service.addPm(date, data).subscribe(
        response => {
          if (response) {
            this.toastr.success(response.success)
            this.service.addHistory('ADDED', 'VEHICLE PM', '', data.vehicle, data.vehicleId, data.note).subscribe()
          } else {
            this.toastr.error(this.genericError)
          }
          
        } 
      )
    }

    if (type =='note' && !data.pinned) {
      this.service.addPassdownNote(date, data).subscribe(
        response => {
          if (response) {
            this.toastr.success(response.success)
            this.service.addHistory('ADDED', 'PASSDOWN NOTE', '', '', date, data.note).subscribe()
          } else {
            this.toastr.error(this.genericError)
          }
          
        } 
      )
    }

    if (type =='note' && data.pinned) {
      data.status = "open"
      this.service.addPinnedNote(data).subscribe(
        response => {
          if (response) {
            this.toastr.success(response.success)
            this.service.addHistory('ADDED PINNED', 'PASSDOWN NOTE', '', '', date, data.note).subscribe()
          } else {
            this.toastr.error(this.genericError)
          }
          
        } 
      )
    }

    this.reload()

    
  }

  whoAmI() {
    return this.userService.getUserId()
  }

  deleteNote(date: string, id: string) {
    
    this.service.removePassdownNote(date, id, {}).subscribe(
        response => {
          if (response) {
            this.toastr.success(response.success)
            this.service.addHistory('DELETED', 'PASSDOWN NOTE',id,date,'','').subscribe()
            this.reload()
          } else {
            this.toastr.error(this.genericError)
          }
      }
    )    
  }

  deletePinned(id: string) {
    let payload = {
      _id: id
    }
    this.service.deletePinned(payload).subscribe(
      response => {
        if (response) {
          this.toastr.success(response.success)
          this.service.addHistory('DELETED PINNED', 'PASSDOWN NOTE',id,'','','').subscribe()
          this.reload()
        } else {
          this.toastr.error(this.genericError)
        }
      }
    )
  }

  closePinned(index: any) {
    this.timestamp = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss a');

    let payload = this.pinnedNotes[index]
    payload.status = 'closed'
    payload.closedBy = this.userService.getUser()
    payload.closedTimestamp = this.timestamp

    this.service.closedPinned(payload).subscribe(
      response => {
        if (response) {
          this.toastr.success(response.success)
          this.service.addHistory('CLOSED PINNED', 'PASSDOWN NOTE',this.pinnedNotes[index].noteId,'','','').subscribe()
          this.reload()
        } else {
          this.toastr.error(this.genericError)
        }
      }
    )

  }

  doSomething(a: string) {
    console.log('doing something ' + a)
  }

  deleteCallOut(date: string, id: string) {
    
    this.service.removeCallout(date, id, {}).subscribe(
      response => {
        if (response) {
          this.toastr.success(response.success)
          this.service.addHistory('DELETED', 'OFF TIME', id, date,'','').subscribe()
          this.reload()
        } else {
          this.toastr.error(this.genericError)
        }
      }
    )
  }

  deleteProtection(date: string, id: string) {
    this.service.removeProtection(date, id, {}).subscribe(
      response => {
        if (response) {
          this.toastr.success(response.success)
          this.service.addHistory('DELETED', 'PROTECTION', id, date,'','').subscribe()
          this.reload()
        } else {
          this.toastr.error(this.genericError)
        }
      }
    )
  }

  deletePm(date: string, id: string) {
    this.service.removePm(date, id, {}).subscribe(
      response => {
        if (response) {
          this.toastr.success(response.success)
          this.service.addHistory('DELETED', 'PM', id, date,'','').subscribe()
          this.reload()
        } else {
          this.toastr.error(this.genericError)
        }
      }
    )
  }

  confirmProtection(id: string) {
    
    this.timestamp = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss a');

    let payload = {
      uid: id,
      confirmed: this.timestamp,
      confirmedBy: this.userService.getUser()
    }

    this.service.confirmProtection(payload).subscribe(
      response => {
        if (response) {
          this.toastr.success(response.success)
          this.service.addHistory('CONFIRMED', 'PROTECTION', id, '','','').subscribe()
          this.reload()
        } else {
          this.toastr.error(this.genericError)
        }
      }
    )

  }

  reload() {
    setTimeout(() => {
      location.reload()
    }, 1700);
  }

  showHistoryDialog(): void {
   
    
    const dialogRef = this.dialog.open(ViewmodalComponent, {
      data: { history: this.data.history }
    });
  }

}
