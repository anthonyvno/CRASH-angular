import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ReportDataService } from '../report-data.service';
import { Insurer } from '../model/insurer.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Report } from '../model/report.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()],
    providers: [ReportDataService]
})
export class DashboardComponent implements OnInit {
    private _insurers: Insurer[];
    public isLoaded = false;
    private _today: Date;
    private errorMsg: string;
    private _reports: Report[];
    public monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    // lineChart
    public lineChartData: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
        { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
    ];
    public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
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
    public doughnutChartLabels: string[];
    public doughnutChartData: number[] = [350, 100, 50];
    public doughnutChartType: string;

    // BARCHART
    public barChartOptions: any;
    public barChartLabels: string[];
    public barChartType: string;
    public barChartLegend: boolean;

    public barChartData: any[];

    constructor(private reportDataService: ReportDataService) {}

    ngOnInit() {
        this._today = new Date();
        this.reportDataService.reportsByInsurer.subscribe(
            reports => {
                this._reports = reports;
                this.initializeCharts(reports);
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        );



    }

    public getMonthName(month: number) {
        if (month < 0) {
            month = month + 12;
        }
        return this.monthNames[month];
    }

    initializeCharts(reports: Report[]) {
        this.initializeBarChart(reports);
        this.initializeDoughnutChart(reports);
        this.initializeLineChart(reports);
        this.isLoaded = true;
    }

    initializeBarChart(reports: Report[]) {
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartLabels = [
            this.getMonthName(this._today.getMonth() - 5),
            this.getMonthName(this._today.getMonth() - 4),
            this.getMonthName(this._today.getMonth() - 3),
            this.getMonthName(this._today.getMonth() - 2),
            this.getMonthName(this._today.getMonth() - 1),
            this.getMonthName(this._today.getMonth())
        ];

        this.barChartData = [{ data: [2, 2, 3, 4, 5, 6], label: 'Aantal reports' }];
        const lastSixMonthsReports = reports.filter(
            report => new Date(report.dateReportReceived) > new Date(new Date().setMonth(this._today.getMonth() - 6))
        );

        let dataForBarChart: number[];
    }
    initializeDoughnutChart(reports: Report[]) {
        this.doughnutChartType = 'doughnut';
        this.doughnutChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];

    }
    initializeLineChart(reports: Report[]) {
        this.lineChartLegend = true;
        this.lineChartType = 'line';
    }

    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    public randomize(): void {
        // Only Change 3 values
        const data = [Math.round(Math.random() * 100), 59, 80, Math.random() * 100, 56, Math.random() * 100, 40];
        const clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
    }
}
