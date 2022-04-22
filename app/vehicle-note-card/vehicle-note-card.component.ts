import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../services/backend.service';
import { UserService } from '../services/user.service';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { AddNoteComponent } from '../modal/add-note/add-note.component';

@Component({
  selector: 'app-vehicle-note-card',
  templateUrl: './vehicle-note-card.component.html',
  styleUrls: ['./vehicle-note-card.component.scss']
})
export class VehicleNoteCardComponent implements OnInit {
  @Input() noteData: any
  @Input() page: string
  @Input() noteType: string
  showComment: number = -1
  genericError: string = "An unknown error has occurred. Please try again."
  timestamp: string
  @Input() passdownDate: string
  pendingComment: boolean = false

  constructor(private service: BackendService,
    private toastr: ToastrService,
    public datepipe: DatePipe,
    private userService: UserService,
    private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  showCommentBox(i: number) {
    if (i === this.showComment) {
      this.showComment = -1
    } else {
      this.showComment = i
    }
  }

  deleteMaintNote(id: string, index: number, passdownNoteId: string) {
    console.log(id)
    if (this.noteType === 'pinned') {
      this.deletePinned(id, index)
      return
    }

    if (this.noteType === 'passdown') {
      this.deleteNote(this.passdownDate, passdownNoteId, index)
      return
    }

    this.service.deleteMaintNote(id).subscribe(
      response => {
        if (response) {
          this.toastr.success(response.success)
          this.service.addHistory('DELETED', 'NOTE', id, 'VEHICLE', '', '').subscribe()
          this.noteData.splice(index, 1)
        } else {
          this.toastr.error(this.genericError)
        }
      }
    )
  }


  closeNote(id: string, index: number) {

    if (this.noteType === 'pinned') {
      this.closePinned(index)
      return
    }


    let payload = {
      _id: id,
      status: 'closed',
      closedTimestamp: this.getTimestamp(),
      closedBy: this.userService.getUser()
    }



    this.service.updateNote(payload).subscribe(
      response => {
        this.toastr.success(response.success)
        this.service.addHistory('CLOSED', 'NOTE', id, 'VEHICLE', '', '').subscribe()
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
          this.service.addHistory('REOPENED', 'NOTE', '', 'VEHICLE', id, '').subscribe()
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

    if (this.noteType === 'maint') {
      this.service.removeMaintComment(id, {}).subscribe(
        response => {
          if (response) {
            this.toastr.success(response.success)
            this.service.addHistory('DELETED', 'COMMENT', id, 'VEHICLE', '', '').subscribe()
            this.reload()
          } else {
            this.toastr.error(this.genericError)
          }
        }
      )
    }

    if (this.noteType === 'pinned') {
      this.service.removePinnedComment(id, {}).subscribe(
        response => {
          if (response) {
            this.toastr.success(response.success)
            this.service.addHistory('DELETED', 'COMMENT', id, 'VEHICLE', '', '').subscribe()
            this.reload()
          } else {
            this.toastr.error(this.genericError)
          }
        }
      )
    }

    if (this.noteType === 'passdown') {
      this.service.removePassdownComment(id, {}).subscribe(
        response => {
          if (response) {
            this.toastr.success(response.success)
            this.service.addHistory('DELETED', 'COMMENT', id, 'PASSDOWN NOTE', '', '').subscribe()
            this.reload()
          } else {
            this.toastr.error(this.genericError)
          }
        }
      )
    }

  }

  addComment(id: string, comment: string, passdownNoteId: string) {
    if (this.pendingComment) {
      this.toastr.error('Please wait for previous comment to post.')
      return
    }
    
    this.pendingComment = true


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

    if (this.noteType === 'maint') {
      this.service.addMaintComment(id, payload).subscribe(
        response => {
          if (response) {
            this.toastr.success(response.success)
            this.service.addHistory('ADDED', 'COMMENT', payload.commentId, 'VEHICLE', id, payload.comment).subscribe()
            this.reload()
          } else {
            this.toastr.error(this.genericError)
          }
        }
      )
    }

    if (this.noteType === 'pinned') {
      console.log('triggered')
      this.service.addPinnedComment(id, payload).subscribe(
        response => {
          if (response) {
            this.toastr.success(response.success)
            this.service.addHistory('ADDED', 'COMMENT', payload.commentId, 'VEHICLE', id, payload.comment).subscribe()
            this.reload()
          } else {
            this.toastr.error(this.genericError)
          }
        }
      )
    }

    if (this.noteType === 'passdown') {

      id = passdownNoteId

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

  closePinned(index: any) {
    this.timestamp = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss a');

    let payload = this.noteData[index]
    payload.status = 'closed'
    payload.closedBy = this.userService.getUser()
    payload.closedTimestamp = this.timestamp

    this.service.closedPinned(payload).subscribe(
      response => {
        if (response) {
          this.toastr.success(response.success)
          this.service.addHistory('CLOSED PINNED', 'PASSDOWN NOTE', this.noteData[index].noteId, '', '', '').subscribe()
          this.noteData.splice(index, 1)
        } else {
          this.toastr.error(this.genericError)
        }
      }
    )

  }

  deletePinned(id: string, index: number) {
    let payload = {
      _id: id
    }
    this.service.deletePinned(payload).subscribe(
      response => {
        if (response) {
          this.toastr.success(response.success)
          this.service.addHistory('DELETED PINNED', 'PASSDOWN NOTE', id, '', '', '').subscribe()
          this.noteData.splice(index, 1)
        } else {
          this.toastr.error(this.genericError)
        }
      }
    )
  }

  deleteNote(date: string, id: string, index: number) {
    console.log(date, id, index)

    console.log('hello')
    this.service.removePassdownNote(date, id, {}).subscribe(
      response => {
        if (response) {
          this.toastr.success(response.success)
          this.service.addHistory('DELETED', 'PASSDOWN NOTE', id, date, '', '').subscribe()
          this.noteData.splice(index, 1)
        } else {
          this.toastr.error(this.genericError)
        }
      }
    )
  }


  editNote(id: string, style: string, note: string, comments: {}) {
    console.log(id, style, note, comments)


    let type = 'editNote'

    if (this.noteType === 'passdown') {
      const dialogRef = this.dialog.open(AddNoteComponent, {
        data: { vehicle: '', id: id, type: type, style: style, note: note, comments: comments }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.saveEditedNote(id, result);
      });
    }


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

}
