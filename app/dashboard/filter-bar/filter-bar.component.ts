import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {

  @Output() filterEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  filter(status: string) {
    this.filterEvent.emit(status)
  }

}
