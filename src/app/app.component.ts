import {Component, OnInit} from '@angular/core';
import {CommentServiceService} from './service/comment-service.service';
import {User} from './models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private service: CommentServiceService) {
  }
  public comment: string;
  public userList: User[];
  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('users'))) {
      this.userList = JSON.parse(localStorage.getItem('users'));
    } else {
      this.service.getComment().subscribe(comment => this.userList = comment);
    }
  }
  public PostComment(id: number): void {
    const comment = this.comment;
    const data = {
      id: Date.now(),
      body: comment,
      author_name: 'TEST',
      active: false,
      date_time: Date.now(),
      parent_id: id,
      children: []
    };
    JSON.stringify(this.userList, (_, nestedValue) => {
      if (nestedValue && nestedValue.id === id) {
        nestedValue.children.unshift(data);
        nestedValue.active = false;
        return;
      }
      return nestedValue;
    });
    this.service.createComment(this.userList);
    this.comment = '';
  }
  public toggleComment(id: number): void {
    JSON.stringify(this.userList, (_, nestedValue) => {
      if (nestedValue && nestedValue.id === id) {
        nestedValue.active = !nestedValue.active;
      }
      return nestedValue;
    });
    this.comment = '';
  }

  public trackByFn(index: number, item: User): number{
    return item.id;
  }
}
