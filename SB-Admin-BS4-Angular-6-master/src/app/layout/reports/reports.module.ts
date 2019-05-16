import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { PageHeaderModule } from '../../shared';
import { InsuredByLoggedInInsurerPipe } from './insured-by-logged-in-insurer.pipe';
import { InsuranceNumberFilterPipe } from './insurance-number-filter.pipe';
import { PostalCodeFilterPipe } from './postal-code-filter.pipe';
import { BeforeDateFilterPipe } from './before-date-filter.pipe';
import { AfterDateFilterPipe } from './after-date-filter.pipe';


@NgModule({
    imports: [
        CommonModule,
        ReportsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        PageHeaderModule
    ],
    declarations: [
        ReportsComponent,
        InsuredByLoggedInInsurerPipe,
        InsuranceNumberFilterPipe,
        PostalCodeFilterPipe,
        BeforeDateFilterPipe,
        AfterDateFilterPipe
    ]
})
export class ReportsModule {}
