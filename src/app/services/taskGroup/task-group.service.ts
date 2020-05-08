import { Injectable } from '@angular/core';
import { Service } from '../service';
import { HttpClient } from '@angular/common/http';
import { TaskGroup } from '@app/entities/taskGroup';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskGroupService extends Service {

  constructor(private http: HttpClient) { 
    super();
  }

  public create(group: TaskGroup): Observable<TaskGroup> {
    group.title = group.title.trim();
    return this.http.post<TaskGroup>(this.BASE_API_URL + `taskGroups`, group);
  }
  
  public update(group: TaskGroup): Observable<TaskGroup> {
    group.title = group.title.trim();
    return this.http.put<TaskGroup>(this.BASE_API_URL + `taskGroups/${group.id}`, group);
  }

  public delete(id): Observable<void> {
    return this.http.delete<void>(this.BASE_API_URL + `taskGroups/${id}`);
  }
}
