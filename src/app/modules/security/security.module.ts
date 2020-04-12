import { NgModule } from '@angular/core';
import { AuthGuard } from './auth-guard';
import { Session } from './session';

@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [AuthGuard, Session]
})
export class SecurityModule {

}