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
  taggedUsers: [{}] = [{}]

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
        this.save()
      }

    }


  }

  save() {
    this.track = false
    if (this.string.charAt(this.string.length -1) === ' ') {
      this.string = this.string.slice(0,-1)
    }
    let found = this.userList.find((list: {user: string}) => list.user.toLowerCase() === this.string.toLowerCase().replace('@',''))
    if (found) {
      console.log('found!')
      this.taggedUsers.push(found)
      this.string = ''
    } else {
      console.log('not found!')
      this.string = ''
    }
  }

  check() {
    if (this.track) {
      this.save()
    }
    console.log(this.taggedUsers)

    
  }



}
