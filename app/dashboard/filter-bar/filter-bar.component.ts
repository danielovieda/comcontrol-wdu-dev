import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  @Input() totalActive: number
  @Input() totalFlag: number
  @Input() totalOOS: number
  @Input() totalPM: number
  @Input() totalSpare: number


  @Output() filterEvent = new EventEmitter();
  @Output() refreshDashboard = new EventEmitter();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    
  }

  filter(status: string) {
    this.filterEvent.emit(status)
  }

  refresh() {
    this.refreshDashboard.emit()
  }

}
