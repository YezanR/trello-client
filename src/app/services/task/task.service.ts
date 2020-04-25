import { Injectable } from '@angular/core';
import { Service } from '../service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskGroup } from '@app/entities/taskGroup';
import { Task } from '@app/entities/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends Service {

  constructor(private http: HttpClient) { 
    super();
  }

  public findAll(boardId): Observable<TaskGroup[]> {
    return this.http.get<TaskGroup[]>(this.BASE_API_URL + `boards/${boardId}/tasks`);
  }

  public create(task: Task): Observable<Task> {
    task.title = task.title.trim();
    return this.http.post<Task>(this.BASE_API_URL + `taskGroups/${task.groupId}/tasks`, task);
  }
}
