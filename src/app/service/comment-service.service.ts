import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  constructor(private http: HttpClient) {}

  getComment(): Observable<User[]> {
    return this.http.get<User[]>('assets/data.json');
  }

  createComment(data: User[]): void {
    localStorage.setItem('users', JSON.stringify(data));
  }
}
