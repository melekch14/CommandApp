import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  private apiUrl = 'http://localhost:3000/commands';

  constructor(private http: HttpClient) {}

  addCommand(command: any): Observable<any> {
    return this.http.post(this.apiUrl, command);
  }
}
