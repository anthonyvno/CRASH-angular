import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
   advancedPagination: number;
   constructor() {
    this.advancedPagination = 1;
}

    ngOnInit() {}
}
