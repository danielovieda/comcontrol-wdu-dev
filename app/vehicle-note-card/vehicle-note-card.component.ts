import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../services/backend.service';
import { UserService } from '../services/user.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-vehicle-note-card',
  templateUrl: './vehicle-note-card.component.html',
  styleUrls: ['./vehicle-note-card.component.scss']
})
export class VehicleNoteCardComponent implements OnInit {
  @Input() noteData: any
  @Input() page: string
  showComment: number = -1
  genericError: string = "An unknown error has occurred. Please try again."
  timestamp: string

  constructor(private service: BackendService,
    private toastr: ToastrService,
    public datepipe: DatePipe,
    private userService: UserService) { }

  ngOnInit(): void {

  }

  showCommentBox(i: number) {
    if (i === this.showComment) {
      this.showComment = -1
    } else {
      this.showComment = i
    }
  }

  deleteMaintNote(id: string, index: number) {
    console.log('delete note', id)

    this.service.deleteMaintNote(id).subscribe(
      response => {
        if (response) {
          this.toastr.success(response.success)
          this.noteData.splice(index, 1)
        } else {
          this.toastr.error(this.genericError)
        }
      }
    )
  }


  closeNote(id: string, index: number) {

    let payload = {
      _id: id,
      status: 'closed',
      closedTimestamp: this.getTimestamp(),
      closedBy: this.userService.getUser()
    }



    this.service.updateNote(payload).subscribe(
      response => {
        this.toastr.success(response.success)
        if (this.page === 'passdown') {
          this.noteData.splice(index, 1)
        } else {
          this.reload()
        }

      }
    )
  }

  reOpen(id: string) {
    
    let payload = {
      _id: id,
      status: 'open',
      closedTimestamp: '',
      closedBy: ''
    }



    this.service.updateNote(payload).subscribe(
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
    if (userId != this.userService.getUserId()) {
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

  addComment(id: string, comment: string) {
    if (comment.trim().length < 3) {
      this.toastr.error("Your comment isn't long enough. Try again.")
      return
    }


    let payload = {
      commentId: uuidv4(),
      comment: comment,
      timestamp: this.getTimestamp(),
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

  reload() {
    setTimeout(() => {
      location.reload()
    }, 1700);
  }

  getTimestamp(): string {
    return this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss a');
  }

  whoAmI(): string {
    return this.userService.getUserId()
  }

}
