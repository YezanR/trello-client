import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthRoutingModule } from './routing/auth-routing.module';
import { AuthLayoutComponent } from './components/layout/auth-layout.component';
import { FormsModule } from '@angular/forms';
import { HttpTokenInterceptor } from './interceptors/http-token.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { OnlyNoAuthGuard } from './guards/only-no-auth.guard';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthLayoutComponent,
    SignInPageComponent
  ]
})
export class AuthModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AuthGuard,
        OnlyNoAuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
      ]
    }
  }
}
