import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mentions',
  templateUrl: './mentions.component.html',
  styleUrls: ['./mentions.component.scss']
})
export class MentionsComponent implements OnInit {
  track: boolean = false
  string: string = ''
  stringToSave: string
  finalize: boolean = false

  temp: string
  taggedUsers: string[]

  userList = [{
    user: 'Daniel',
    userId: '1'
  },
  {
    user: 'Tanika',
    userId: '2'
  },
  {
    user: 'Lupe',
    userId: '3'
  },]

  constructor() { }

  ngOnInit(): void {
  }

  trackChange(event: any) {
    let key = event.key
    if (key === 'Shift') {
      return
    }
    if (key === 'Backspace') {
      this.string = this.string.slice(0,-1)
      return
    }
    

    if (key === '@' || this.track) {
      
      this.track = true
      this.string = this.string + key

      if (key === ' ') {
        this.track = false
        this.stringToSave = this.string
        this.finalize = true
        this.string = ''
      }

    }

    console.log(this.string)
  }

  check() {
    console.log(this.stringToSave)
  }



}
