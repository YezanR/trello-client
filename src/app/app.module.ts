import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AuthModule } from './modules/auth/auth.module';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { NotifierComponent } from './modules/core/notifier/notifier.component';
import { CreateBoardComponent } from './components/create-board/create-board.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { EditTaskModalComponent } from './components/edit-task-modal/edit-task-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    NotFoundPageComponent,
    BoardsPageComponent,
    MainLayoutComponent,
    NotifierComponent,
    CreateBoardComponent,
    BoardPageComponent,
    EditTaskModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AuthModule.forRoot(),
    FontAwesomeModule,
    NgbModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
