import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users: any
  listUsers: boolean = true

  constructor(private service: BackendService, private toastr: ToastrService, private dataService: DataService) { }

  ngOnInit(): void {
    this.users = this.dataService.returnDrivers()
  }

}
