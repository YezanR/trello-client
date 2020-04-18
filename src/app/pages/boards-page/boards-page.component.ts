import { Component, OnInit, ViewChild } from '@angular/core';
import { Board } from '@app/entities/board';
import { BoardService } from '@app/services/board/board.service';
import { CreateBoardComponent } from '@app/components/create-board/create-board.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss']
})
export class BoardsPageComponent implements OnInit {

  boards: Array<Board> = [];

  @ViewChild('createBoardModal') newBoardModal: CreateBoardComponent;

  iconNew = faPlus;

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.boardService.findAllPersonal()
      .subscribe((boards: Board[]) => {
        this.boards = boards;
      });
  }

  showCreateModal() {
    this.newBoardModal.open();
  }
}
