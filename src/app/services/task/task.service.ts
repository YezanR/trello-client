import { Injectable } from '@angular/core';
import { Service } from '../service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskGroup } from '@app/entities/taskGroup';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends Service {

  constructor(private http: HttpClient) { 
    super();
  }

  public findAll(boardId: Number): Observable<TaskGroup[]> {
    return this.http.get<TaskGroup[]>(this.BASE_API_URL + `boards/${boardId}/tasks`);
  }
}
