import { Component, OnInit, ViewChild } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('searchText') inputSearch: any

  searchResults: any
  results: boolean = false
  notFound: string
  timestamp: any


  constructor(private service: BackendService,
    public datepipe: DatePipe,
    private userService: UserService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
  }

  search(needle: any) {
    if (needle.target.value === '') {
      this.results = false
      return
    }
    this.service.searchForNote(needle.target.value).subscribe(
      response => {
        if (response) {
          this.searchResults = response
          this.results = true
          this.notFound = ""
        } else {
          this.results = false
          this.notFound = "No results were found."
        }
      }
    )
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

    
  }

  clearSearch() {
    this.searchResults = []
    this.results = false
    this.inputSearch.nativeElement.value = ''
    let event = new KeyboardEvent('keyup', { bubbles: true})
    this.inputSearch.nativeElement.dispatchEvent(event)
  }

}
