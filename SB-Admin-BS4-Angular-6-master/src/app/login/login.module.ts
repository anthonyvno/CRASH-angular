import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AuthGuardService } from '../layout/auth-guard.service';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        LoginRoutingModule],
    declarations: [LoginComponent],
    providers: [AuthGuardService]
})
export class LoginModule {}
