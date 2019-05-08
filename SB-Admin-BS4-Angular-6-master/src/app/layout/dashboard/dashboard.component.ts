import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {

    // lineChart
   public lineChartData: Array<any> = [
       { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
       { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
       { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
   ];
   public lineChartLabels: Array<any> = [
       'January',
       'February',
       'March',
       'April',
       'May',
       'June',
       'July'
   ];
   public lineChartOptions: any = {
       responsive: true
   };
   public lineChartColors: Array<any> = [
       {
           // grey
           backgroundColor: 'rgba(148,159,177,0.2)',
           borderColor: 'rgba(148,159,177,1)',
           pointBackgroundColor: 'rgba(148,159,177,1)',
           pointBorderColor: '#fff',
           pointHoverBackgroundColor: '#fff',
           pointHoverBorderColor: 'rgba(148,159,177,0.8)'
       },
       {
           // dark grey
           backgroundColor: 'rgba(77,83,96,0.2)',
           borderColor: 'rgba(77,83,96,1)',
           pointBackgroundColor: 'rgba(77,83,96,1)',
           pointBorderColor: '#fff',
           pointHoverBackgroundColor: '#fff',
           pointHoverBorderColor: 'rgba(77,83,96,1)'
       },
       {
           // grey
           backgroundColor: 'rgba(148,159,177,0.2)',
           borderColor: 'rgba(148,159,177,1)',
           pointBackgroundColor: 'rgba(148,159,177,1)',
           pointBorderColor: '#fff',
           pointHoverBackgroundColor: '#fff',
           pointHoverBorderColor: 'rgba(148,159,177,0.8)'
       }
   ];
   public lineChartLegend: boolean;
   public lineChartType: string;

    // Doughnut
   public doughnutChartLabels: string[] = [
       'Download Sales',
       'In-Store Sales',
       'Mail-Order Sales'
   ];
   public doughnutChartData: number[] = [350, 450, 100];
   public doughnutChartType: string;

    // BARCHART
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = [
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012'
    ];
    public barChartType: string;
    public barChartLegend: boolean;

    public barChartData: any[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ];


    public alerts: Array<any> = [];

    constructor() {
        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    // events
   public chartClicked(e: any): void {
    // console.log(e);
}

public chartHovered(e: any): void {
    // console.log(e);
}

public randomize(): void {
    // Only Change 3 values
    const data = [
        Math.round(Math.random() * 100),
        59,
        80,
        Math.random() * 100,
        56,
        Math.random() * 100,
        40
    ];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
}

    ngOnInit() {
        this.barChartType = 'bar';
       this.barChartLegend = true;
       this.doughnutChartType = 'doughnut';
       this.lineChartLegend = true;
       this.lineChartType = 'line';
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
