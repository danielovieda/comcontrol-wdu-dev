import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  vehicle: any

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.vehicle = params.get('id')
    })

    console.log('ngonit: ' + this.vehicle)
    

  }

}
