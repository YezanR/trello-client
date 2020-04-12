import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { TodolistsPageComponent } from './pages/todolists-page/todolists-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';


const routes: Routes = [
  { path: 'login', component: LoginPageComponent},
  { path: 'home', component: HomePageComponent},
  { path: 'todolists',      component: TodolistsPageComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
