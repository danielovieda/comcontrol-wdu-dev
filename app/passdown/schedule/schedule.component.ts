import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from "@angular/material/dialog";
import { AddNoteComponent } from 'src/app/modal/add-note/add-note.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

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
    private router: Router) { }

    driverList: any
    routeList: any
    vehicleList: any
    timestamp: any
    pinnedNotes: any

    genericError: string = 'An error has occurred. Please try again.'

  ngOnInit(): void {
    

    this.service.getDriverList('mini').subscribe(
      response => {
        this.driverList = response
      }
    )

    this.service.getRouteList().subscribe(
      response => {
        this.routeList = response
      }
    )

    this.service.getVehicleMiniList().subscribe(
      response => {
        this.vehicleList = response
      }
    )

    this.service.getPinned().subscribe(
      response => {
        this.pinnedNotes = response
      }
    )

  }

  navBack() {
    let yesterday = new Date(this.data.date)
    yesterday.setDate(yesterday.getDate() - 1)
    console.log(yesterday)

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

    console.log('adding to passdown...')


    const dialogRef = this.dialog.open(AddNoteComponent, {
      data: { vehicle: '', type: type, drivers: this.driverList, routes: this.routeList, vehicles: this.vehicleList }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.saveNote(result, type, this.data.date);
    });

  }

  saveNote(data: any, type: string, date: string) {
    console.log('what data are we trying to save?')
    console.log(data)
    console.log('date?')
    console.log(date)
    if (!data) {
      console.log('no data to save')
      return
    }

    if (type == 'off') {
      this.service.addOfftime(date, data).subscribe(
        response => {
          if (response) {
            this.toastr.success(response.success)
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
    console.log('delete note?')
    this.service.removePassdownNote(date, id, {}).subscribe(
        response => {
          if (response) {
            this.toastr.success(response.success)
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
    console.log(date + ' ' + id)
    this.service.removeCallout(date, id, {}).subscribe(
      response => {
        if (response) {
          this.toastr.success(response.success)
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
          this.reload()
        } else {
          this.toastr.error(this.genericError)
        }
      }
    )
  }

  confirmProtection(id: string) {
    console.log(id)
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

}
