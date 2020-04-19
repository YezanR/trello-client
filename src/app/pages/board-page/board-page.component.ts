import { Component, OnInit } from '@angular/core';
import { Board } from '@app/entities/board';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '@app/services/board/board.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {

  board: Board;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService
    ) {

  }

  ngOnInit(): void {
    this.show();
  }

  show(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.boardService.findById(id)
      .subscribe(board => {
        this.board = board
      }, error => {
        //TODO: handle error
      });
  }
}
