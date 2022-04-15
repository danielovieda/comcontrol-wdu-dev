import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewhistory',
  templateUrl: './viewhistory.component.html',
  styleUrls: ['./viewhistory.component.scss']
})
export class ViewhistoryComponent implements OnInit {
  @Input() history: any

  constructor() { }

  ngOnInit(): void {
  }

}
