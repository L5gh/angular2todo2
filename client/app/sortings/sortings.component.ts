import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { SortingService } from '../services/sorting.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-sortings',
  templateUrl: './sortings.component.html',
  styleUrls: ['./sortings.component.scss']
})
export class SortingsComponent implements OnInit {

  sorting = {};
  sortings = [];
  isLoading = true;
  isEditing = false;

  addSortingForm: FormGroup;
  className = new FormControl('', Validators.required);

  constructor(private sortingService: SortingService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getSortings();
    this.addSortingForm = this.formBuilder.group({
      className: this.className
    });
  }

  getSortings() {
    this.sortingService.getSortings().subscribe(
      data => this.sortings = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addSorting() {
    this.sortingService.addSorting(this.addSortingForm.value).subscribe(
      res => {
        const newSorting = res.json();
        this.sortings.push(newSorting);
        this.addSortingForm.reset();
        this.toast.setMessage('登録が完了しました。', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(sorting) {
    this.isEditing = true;
    this.sorting = sorting;
  }

  cancelEditing() {
    this.isEditing = false;
    this.sorting = {};
    this.toast.setMessage('編集をキャンセルしました。', 'warning');
    // reload the sortings to reset the editing
    this.getSortings();
  }

  editSorting(sorting) {
    this.sortingService.editSorting(sorting).subscribe(
      res => {
        this.isEditing = false;
        this.sorting = sorting;
        this.toast.setMessage('編集が完了しました。', 'success');
      },
      error => console.log(error)
    );
  }

  deleteSorting(sorting) {
    if (window.confirm('完全に削除してもよろしいですか？')) {
      this.sortingService.deleteSorting(sorting).subscribe(
        res => {
          const pos = this.sortings.map(elem => elem._id).indexOf(sorting._id);
          this.sortings.splice(pos, 1);
          this.toast.setMessage('クラスを削除しました。', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
