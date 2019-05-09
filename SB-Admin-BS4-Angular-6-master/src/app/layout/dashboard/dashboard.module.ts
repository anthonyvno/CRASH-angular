import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ChartsModule as Ng2Charts} from 'ng2-charts';
import {
    NotificationComponent,
} from './components';
import { StatModule } from '../../shared';
import { ReportDataService } from '../report-data.service';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        Ng2Charts,
        NgbAlertModule,
        DashboardRoutingModule,
        StatModule
    ],
    declarations: [
        DashboardComponent,
        NotificationComponent
    ],
    providers:[ReportDataService]
})
export class DashboardModule {}
