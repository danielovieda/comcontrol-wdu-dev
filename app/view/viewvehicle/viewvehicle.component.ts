import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from "@angular/material/dialog";
import { AddNoteComponent } from 'src/app/modal/add-note/add-note.component';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-viewvehicle',
  templateUrl: './viewvehicle.component.html',
  styleUrls: ['./viewvehicle.component.scss']
})
export class ViewvehicleComponent implements OnInit {

  @Input() whichVehicle: string

  vehicleId: any
  vehicleData: any
  noteData:any
  timestamp: any
  showComment: number = -1
  genericError: string = 'An error has occurred. Please try again.'
  

  constructor(private service: BackendService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public datepipe: DatePipe,
    private userService: UserService) { }

  ngOnInit(): void {
    
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.vehicleId = params.get('id')
        
      })

      if (this.vehicleId === null) {
        this.loadData(this.whichVehicle)
        this.vehicleId = this.whichVehicle
      } else {
        this.loadData(this.vehicleId)
      }
     
    
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

    this.service.addMaintComment(id, payload).subscribe(
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

  showCommentBox(i: number) {
    if (i === this.showComment) {
      this.showComment = -1
    } else {
      this.showComment = i
    }
  }

  loadData(id: string) {
    this.service.getVehicle(id).subscribe(
      response => {
        if (response) {
          this.vehicleData = response
          console.log(this.vehicleData)
        } else {
          this.toastr.error('Error.')
        }
        
      }
    )

    this.service.getNotes(id).subscribe(
      response => {
        if (response) {
          this.noteData = response
          console.log(this.noteData)
        } else {
          this.toastr.error('Error.')
        }
        
      }
    )

    
    
    
  }

  doSomething() {
    console.log(this.vehicleData)
    console.log(this.noteData)
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
    setTimeout(() => {}, 1000);
    this.noteData = {}
    setTimeout(() => {}, 1000);

    this.service.getNotes(this.vehicleId).subscribe(
      response => this.noteData = response
    )
  }

  checkNull(string: string): boolean {
    if (typeof string != 'undefined' && string) {
      return true;
    }
    return false;
  }

  addNoteDialog(vehicleId: string): void {

    console.log('vehicleId: ' + vehicleId)

    

    const dialogRef = this.dialog.open(AddNoteComponent, {
      data: { vehicle: vehicleId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.saveNote(result);
    });
  }


  saveNote(data: any) {
    if (!data) {
      console.log('no data to save note')
      return
    }

    this.timestamp = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss a');

    let payload = {
      vehicleId: data.vehicleId,
      number: this.vehicleData.vehicle.number,
      timestamp: this.timestamp,
      userId: this.userService.getUserId(),
      username: this.userService.getUser(),
      status: 'open',
      type: data.type,
      note: data.note
    }

    console.log('from note')
    console.log(payload)

    this.service.addNote(payload).subscribe(
      response => this.toastr.success(response.success)
    )

    this.refreshNotes()

  }

  reload() {
    setTimeout(() => {
      location.reload()
    }, 1700);
  }

}
