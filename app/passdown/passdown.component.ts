import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from "@angular/material/dialog";
import { AddNoteComponent } from 'src/app/modal/add-note/add-note.component';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

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

  search: boolean = false
  showComment: number = -1
  genericError: string = "An error has occurred. Please try again."

  constructor(private service: BackendService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public datepipe: DatePipe,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.spinner.show()

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.passdownDate = params.get('date')
    })

    


    this.service.getPassdown('none').subscribe(
      response => {
        if (response) {
          this.passdown = response
          
        } else {
          this.haveResponse = false
        }
      }
    )


    this.service.getSchedule(this.passdownDate).subscribe(
      response => {
        if (response) {
          this.scheduleData = response
          
        } else {
          this.scheduleData = { date: this.passdownDate }
        }
      }
    )

    setTimeout(() => {
      this.spinner.hide()
    },2000)
    
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

  deleteComment(id: string, userId: string) {
    if (userId != this.userService.getUserId() ) {
      this.toastr.error('Unable to delete comment.')
      return
    }
    

     this.service.removeMaintComment(id, {}).subscribe(
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

  addNote() {
    const dialogRef = this.dialog.open(AddNoteComponent, {
      data: { vehicle: '' }, minWidth: '40%', minHeight: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.savePassdownNote(result);
    });
  }

  closeNote(id: string, index: number) {
    this.timestamp = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss a');

    let payload = {
      _id: id,
      status: 'closed',
      closedTimestamp: this.timestamp,
      closedBy: this.userService.getUser()
    }

    

     this.service.updateNote(payload).subscribe(
       response => {
         this.toastr.success(response.success)
         this.passdown.splice(index, 1)
       }
       
     )


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
        
        if (response) {
          this.toastr.success(response.success)
          this.refreshNotes()
        } else {
          this.toastr.error('Unable to save note. Please try again.')
        }
      }
    )

  }

  hideNotes(e: any) {
    
    if (e.target.value === '') {
      this.search = false
    } else {
      this.search = true
    }
    
  }

  reload() {
    setTimeout(() => {
      location.reload()
    }, 1700);
  }

  

}
