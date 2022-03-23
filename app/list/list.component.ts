import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users: any
  listUsers: boolean = true

  constructor(private service: BackendService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.getDriverList('mini').subscribe(
      response => {
        if (response) {
          this.users = response
          console.log(this.users)
        } else {
          this.toastr.error('An error has occurred.')
        }
      }
    )
  }

}
