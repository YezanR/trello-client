import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShareRequest } from '@app/entities/share-request';
import { Service } from '../service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShareRequestService extends Service {

  constructor(private http: HttpClient) { 
    super();
  }

  public findAll(): Observable<ShareRequest[]> {
    return this.http.get<ShareRequest[]>(this.BASE_API_URL + "shareRequests");
  }
}
