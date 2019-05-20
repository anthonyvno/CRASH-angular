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
    public reportsToday: number;
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
    public username: string;
    // lineChart
    public lineChartData: Array<any> = [
        { data: [17, 30, 30, 44, 60, 67, 71], label: 'Jelle Vossen' },
        { data: [12, 39, 39, 51, 56, 78, 103], label: 'Hamdi Harbaoui' },
        { data: [12, 12, 32, 32, 42, 52, 59], label: 'Jérémy Perbet' }
    ];
    public lineChartLabels: Array<any> = ['2013', '2014', '2015', '2016', '2017', '2018', '2019'];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any>;
    public lineChartLegend: boolean;
    public lineChartType: string;

    // Doughnut
    public doughnutChartLabels: string[];
    public doughnutChartData: number[] = [0, 0, 0, 0];
    public doughnutChartType: string;

    // BARCHART
    public barChartOptions: any;
    public barChartLabels: string[];
    public barChartType: string;
    public barChartLegend: boolean;

    public barChartData: any[];

    // StackedBarChart
    public stackedBarChartOptions: any;
    public stackedBarChartData: any[];
    public stackedBarChartLabels: string[];
    public stackedBarChartType: string;
    public stackedBarChartLegend: boolean;

    constructor(private reportDataService: ReportDataService) {}

    ngOnInit() {
        this._today = new Date();
        this.reportDataService.reportsByInsurer.subscribe(
            reports => {
                this._reports = reports.sort((a: Report, b: Report) => {
                    if (new Date(a.dateReportReceived) < new Date(b.dateReportReceived)) {
                      return -1;
                    } else if (new Date(a.dateReportReceived) > new Date(b.dateReportReceived)) {
                      return 1;
                    } else {
                      return 0;
                    }
                  });
                 
                this.reportsToday = reports.filter(
                    report =>
                        new Date(report.dateReportReceived) >=
                        new Date(this._today.getFullYear(), this._today.getMonth(), this._today.getDate())
                ).length;
                this.initializeCharts(reports);
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        );
        this.username = atob(sessionStorage.getItem('token')).split(':')[0];
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
        this.initializeStackedBarChart(reports);
        this.isLoaded = true;
    }

    initializeBarChart(reports: Report[]) {
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true,

            scales: {
                yAxes: [
                    {
                        ticks: {
                            min: 0, // it is for ignoring negative step.
                            beginAtZero: true,
                            precision: 0
                        }
                    }
                ]
            }
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

        const lastSixMonthsReports = reports.filter(
            report =>
                new Date(report.dateCrash) > new Date(new Date(this._today.getFullYear(), this._today.getMonth() - 6)) &&
                new Date(report.dateCrash) < this._today
        );

        const dataForBarChart = [0, 0, 0, 0, 0, 0];
        lastSixMonthsReports.forEach(report => {
            let counter = 0;
            let counter2 = 0;
            for (let i = this._today.getMonth() - 5; i <= this._today.getMonth(); i++) {
                if (i < 0) {
                    counter = i + 12;
                } else {
                    counter = i;
                }
                if (new Date(report.dateCrash).getMonth() === counter) {
                    dataForBarChart[counter2]++;
                }
                counter2++;
            }
        });
        this.barChartData = [{ data: dataForBarChart, label: 'Aantal reports' }];
    }

    initializeStackedBarChart(reports: Report[]) {
        this.stackedBarChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true,
            scales: {
                xAxes: [
                    {
                        stacked: true
                    }
                ],
                yAxes: [
                    {
                        stacked: true,
                        ticks: {
                            min: 0, // it is for ignoring negative step.
                            beginAtZero: true,
                            precision: 0
                        }
                    }
                ]
            }
        };
        this.stackedBarChartType = 'horizontalBar';
        this.stackedBarChartLegend = true;
        this.stackedBarChartLabels = [
            this.getMonthName(this._today.getMonth() - 5),
            this.getMonthName(this._today.getMonth() - 4),
            this.getMonthName(this._today.getMonth() - 3),
            this.getMonthName(this._today.getMonth() - 2),
            this.getMonthName(this._today.getMonth() - 1),
            this.getMonthName(this._today.getMonth())
        ];

        const lastSixMonthsReports = reports.filter(
            report =>
                new Date(report.dateCrash) > new Date(new Date(this._today.getFullYear(), this._today.getMonth() - 6)) &&
                new Date(report.dateCrash) < this._today
        );

        const carDataForStackedBarChart = [0, 0, 0, 0, 0, 0];
        const truckDataForStackedBarChart = [0, 0, 0, 0, 0, 0];
        const motorBikeDataForStackedBarChart = [0, 0, 0, 0, 0, 0];
        const busDataForStackedBarChart = [0, 0, 0, 0, 0, 0];

        lastSixMonthsReports.forEach(report => {
            let counter = 0;
            let counter2 = 0;
            for (let i = this._today.getMonth() - 5; i <= this._today.getMonth(); i++) {
                if (i < 0) {
                    counter = i + 12;
                } else {
                    counter = i;
                }
                if (new Date(report.dateCrash).getMonth() === counter) {
                    report.profiles.forEach(profile => {
                        if (profile.vehicles[0].insurance.insurer.name.toLowerCase() === this.username.toLowerCase()) {
                            switch (profile.vehicles[0].type) {
                                case 'Auto':
                                    carDataForStackedBarChart[counter2]++;
                                    break;
                                case 'Vrachtwagen':
                                    truckDataForStackedBarChart[counter2]++;
                                    break;
                                case 'Motorfiets':
                                    motorBikeDataForStackedBarChart[counter2]++;
                                    break;
                                case 'Bus':
                                    busDataForStackedBarChart[counter2]++;
                                    break;
                            }
                        }
                    });
                }
                counter2++;
            }
        });
        this.stackedBarChartData = [
            {
                data: carDataForStackedBarChart,
                label: 'Auto\'s'
            },
            {
                data: truckDataForStackedBarChart,
                label: 'Vrachtwagens'
            },
            {
                data: motorBikeDataForStackedBarChart,
                label: 'Motorfietsen'
            },
            {
                data: busDataForStackedBarChart,
                label: 'Bussen'
            }
        ];
    }

    initializeDoughnutChart(reports: Report[]) {
        this.doughnutChartType = 'doughnut';
        this.doughnutChartLabels = ['Auto', 'Vrachtwagen', 'Bus', 'Motorfiets'];
        this._reports.forEach(report => {
            report.profiles.forEach(profile => {
                switch (profile.vehicles[0].type) {
                    case 'Auto': {
                        this.doughnutChartData[0]++;
                        break;
                    }
                    case 'Vrachtwagen': {
                        this.doughnutChartData[1]++;
                        break;
                    }
                    case 'Bus': {
                        this.doughnutChartData[2]++;
                        break;
                    }
                    case 'Motorfiets': {
                        this.doughnutChartData[3]++;
                        break;
                    }
                    default: {
                        break;
                    }
                }
            });
        });
    }
    initializeLineChart(reports: Report[]) {
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.initializeLines();
    }

    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    public initializeLines() {
        this.lineChartColors = [
            {
                // grey
                backgroundColor: 'rgb(170,10,47, 0.0)',
                borderColor: 'rgba(0,120,191,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                // dark grey
                backgroundColor: 'rgb(170,10,47, 0.0)',
                borderColor: 'rgba(170,10,47, 1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                // grey
                backgroundColor: 'rgba(148,159,177,0.0)',
                borderColor: 'rgb(0,0,0)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
    }
}
