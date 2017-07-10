import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { SortingService } from '../services/sorting.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user = {};
  sorting = {};
  sortings = [];

  isLoading = true;

  constructor(private auth: AuthService,
              private sortingService: SortingService,
              public toast: ToastComponent,
              private userService: UserService) { }

  ngOnInit() {
    this.getUser();
    this.getSortings();
  }

  getSortings() {
    this.sortingService.getSortings().subscribe(
      data => this.sortings = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  save(user) {
    this.userService.editUser(user).subscribe(
      res => this.toast.setMessage('情報を更新しました。!', 'success'),
      error => console.log(error)
    );
  }

}
