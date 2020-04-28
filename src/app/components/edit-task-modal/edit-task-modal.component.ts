import { Component, OnInit, ViewChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Task } from '@app/entities/task';
import { TaskService } from '@app/services/task/task.service';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class EditTaskModalComponent implements OnInit {

  @ViewChild('editTaskModal') 
  content: TemplateRef<any>;

  task: Task = new Task();

  modalRef: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private taskService: TaskService
    ) { 

  }

  ngOnInit(): void {

  }

  open(task: Task): Promise<any> {
    this.task = task;
    
    this.modalRef = this.modalService.open(this.content, {
      container: `#task-${task.id}`
    });
    return this.modalRef.result;
  }

  update(): void {
    this.taskService.update(this.task)
      .subscribe(result => {
        this.modalRef.close(result);
      }, error => {

      });
  }
}
