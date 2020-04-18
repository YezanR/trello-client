import { Component, OnInit } from '@angular/core';
import { Board } from '@app/entities/board';
import { BoardService } from '@app/services/board/board.service';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss']
})
export class BoardsPageComponent implements OnInit {

  boards: Array<Board> = [];

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    
  }

  list() {
    this.boardService.findAllPersonal()
      .subscribe((boards: Board[]) => {
        this.boards = boards;
      });
  }
}
