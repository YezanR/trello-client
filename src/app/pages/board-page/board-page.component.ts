import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Board } from '@app/entities/board';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '@app/services/board/board.service';
import { TaskGroup } from '@app/entities/taskGroup';
import { TaskService } from '@app/services/task/task.service';
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Task } from '@app/entities/task';
import { EditTaskModalComponent } from '@app/components/edit-task-modal/edit-task-modal.component';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit, OnDestroy {

  board: Board;
  taskGroups: Array<TaskGroup> = [];
  id: Number;

  iconNew = faPlus;
  iconEdit = faPen;
  iconDelete = faTrash;

  newTask: Task;

  @ViewChild('editTaskModal') 
  editTaskModal: EditTaskModalComponent;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private taskService: TaskService
  ) {
    document.body.classList.add("no-scroll");
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
      let group: TaskGroup = this.findGroupOfTask(this.newTask);
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

  showEditTask(task: Task) {
    this.editTaskModal.open(task)
      .then(result => {
        if (result.action == "edit") {
          task = result
        } 
        else if (result.action == "delete") {
          let group: TaskGroup = this.findGroupOfTask(task);
          group.tasks = group.tasks.filter(taskInGrooup => taskInGrooup.id != task.id);
        }
      }, error => {
        
      });
  }

  findGroupOfTask(task: Task): TaskGroup {
    return this.taskGroups.find(group => group.id == task.groupId);
  }

  ngOnDestroy() {
    document.body.classList.remove("no-scroll");
  }
}
