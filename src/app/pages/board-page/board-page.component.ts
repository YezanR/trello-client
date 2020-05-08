import { Component, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Board } from '@app/entities/board';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '@app/services/board/board.service';
import { TaskGroup } from '@app/entities/taskGroup';
import { TaskService } from '@app/services/task/task.service';
import { faPlus, faPen, faTrash, faTimes, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Task } from '@app/entities/task';
import { EditTaskModalComponent } from '@app/components/edit-task-modal/edit-task-modal.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskGroupService } from '@app/services/taskGroup/task-group.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BoardPageComponent implements OnInit, OnDestroy {

  board: Board;
  taskGroups: Array<TaskGroup> = [];
  id: Number;

  iconNew = faPlus;
  iconEdit = faPen;
  iconDelete = faTrash;
  iconCancel = faTimes;
  iconOptions = faEllipsisH;

  newGroup: TaskGroup;
  newTask: Task;

  @ViewChild('editTaskModal') 
  editTaskModal: EditTaskModalComponent;

  groupInEditMode: TaskGroup = new TaskGroup();

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private taskService: TaskService,
    private taskGroupService: TaskGroupService
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

  private findGroupOfTask(task: Task): TaskGroup {
    return this.taskGroups.find(group => group.id == task.groupId);
  }

  async drop(event: CdkDragDrop<TaskGroup>) {
    let previousGroup = event.previousContainer.data;
    let group = event.container.data;
    if (event.previousContainer == event.container) {
      moveItemInArray(group.tasks, event.previousIndex, event.currentIndex);
      let ids: Number[] = group.tasks.map(task => task.id);
      this.taskService.reorder(ids).toPromise();
    }
    else {
      transferArrayItem(previousGroup.tasks,
        group.tasks,
        event.previousIndex,
        event.currentIndex
      )

      let task: Task = event.item.data
      await this.taskService.moveToGroup(task.id, group.id).toPromise()
      let ids: Number[] = group.tasks.map(task => task.id);
      this.taskService.reorder(ids).toPromise()
    }
  }

  showNewGroup() {
    this.newGroup = new TaskGroup();
    this.newGroup.boardId = this.board.id;
  }

  cancelNewGroup() {
    this.newGroup = null;
  }

  createGroup(): void {
    if (!this.isGroupValid()) {
      return;
    }

    this.taskGroupService.create(this.newGroup)
      .subscribe(group => {
        this.taskGroups.push(group);
        this.newGroup = null;
      }, error => {
        // TODO: handle error
      })
  }

  isGroupValid(): boolean {
    return this.newGroup && this.newGroup.title.trim().length > 0;
  }

  async deleteGroup(group: TaskGroup) {
    await this.taskGroupService.delete(group.id).toPromise();
    this.taskGroups = this.taskGroups.filter(elt => elt.id != group.id);
  }

  toggleGroupEditMode(group: TaskGroup) {
    this.groupInEditMode = group;
  }

  async updateGroup(group: TaskGroup) {
    let updatedGroup: TaskGroup = await this.taskGroupService.update(group).toPromise();
    group = updatedGroup;
    this.groupInEditMode = new TaskGroup();
  }

  ngOnDestroy() {
    document.body.classList.remove("no-scroll");
  }
}
