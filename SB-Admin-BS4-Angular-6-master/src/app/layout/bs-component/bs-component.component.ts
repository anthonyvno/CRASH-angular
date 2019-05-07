import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-bs-component',
    templateUrl: './bs-component.component.html',
    styleUrls: ['./bs-component.component.scss']
})
export class BsComponentComponent implements OnInit {
    defaultPagination: number;
   advancedPagination: number;
   paginationSize: number;
   disabledPagination: number;
   isDisabled: boolean;
   constructor() {
    this.defaultPagination = 1;
    this.advancedPagination = 1;
    this.paginationSize = 1;
    this.disabledPagination = 1;
    this.isDisabled = true;
}

    ngOnInit() {}
}
