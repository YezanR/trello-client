import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '@app/entities/board';
import { Service } from '../service';

@Injectable({
  providedIn: 'root'
})
export class BoardService extends Service {

  constructor(private http: HttpClient) { 
    super();
  }

  public findAllPersonal(): Observable<Board[]> {
    return this.http.get<Board[]>(this.BASE_API_URL + "boards/personal");
  }

  public create(board: Board): Observable<Board> {
    return this.http.post<Board>(this.BASE_API_URL + "boards", board);
  }

  public findById(id): Observable<Board> {
    return this.http.get<Board>(`${this.BASE_API_URL}boards/${id}`);
  }
}
