import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { OnlyNoAuthGuard } from './modules/auth/guards/only-no-auth.guard';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
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
        path: 'boards', 
        component: BoardsPageComponent, 
        canActivate: [AuthGuard]
      },
      {
        path: 'boards/:id',
        component: BoardPageComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'auth',
    canActivate: [OnlyNoAuthGuard],
    data: {redirectTo: 'stats'},
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  { path: '**', component: NotFoundPageComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
