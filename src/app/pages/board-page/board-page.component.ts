import { Component, OnInit } from '@angular/core';
import { Board } from '@app/entities/board';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '@app/services/board/board.service';
import { TaskGroup } from '@app/entities/taskGroup';
import { TaskService } from '@app/services/task/task.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {

  board: Board;
  taskGroups: Array<TaskGroup> = [];
  id: Number;

  iconNew = faPlus;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private taskService: TaskService
    ) {
      
  }

  ngOnInit(): void {
    this.show();
  }

  show(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.boardService.findById(id)
      .subscribe(board => {
        this.board = board;
        this.listTasks();
      }, error => {
        // TODO: handle error
      });
  }

  listTasks(): void {
    this.taskService.findAll(this.board.id)
      .subscribe(taskGroups => {
        this.taskGroups = taskGroups;
      }, error => {
        // TODO: handle error
      });
  }
}
