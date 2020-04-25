import { Component, OnInit } from '@angular/core';
import { Board } from '@app/entities/board';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '@app/services/board/board.service';
import { TaskGroup } from '@app/entities/taskGroup';
import { TaskService } from '@app/services/task/task.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Task } from '@app/entities/task';

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

  newTask: Task;

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

  showNewTask(group: TaskGroup): void {
    this.newTask = this.newTask || new Task();
    this.newTask.groupId = group.id;
  }

  createTask(): void {
    if (!this.isTaskValid()) {
      return;
    }

    this.taskService.create(this.newTask)
      .subscribe(task => {
        let group: TaskGroup = this.taskGroups.find(group => group.id == this.newTask.groupId);
        group.tasks.push(task);
        this.newTask = null;
      }, error => {
        // TODO: handle error
      })
  }

  groupHasNewTask(group: TaskGroup): boolean {
    return this.newTask && this.newTask.groupId == group.id;
  }

  isTaskValid(): boolean {    
    return this.newTask && this.newTask.title.trim().length > 0;
  }
}
