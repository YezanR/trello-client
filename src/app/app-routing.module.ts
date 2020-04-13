import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { TodolistsPageComponent } from './pages/todolists-page/todolists-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SecurityModule } from './modules/security/security.module';
import { AuthGuard } from './modules/security/auth-guard';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginPageComponent
  },
  { 
    path: '',
    component: MainLayoutComponent,
    children: [
      { 
        path: 'home', 
        component: HomePageComponent, 
        canActivate: [AuthGuard]
      },
      { 
        path: 'todolists', 
        component: TodolistsPageComponent, 
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      { path: '**', component: NotFoundPageComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), SecurityModule],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
