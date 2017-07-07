import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SortingService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getSortings(): Observable<any> {
    return this.http.get('/api/sortings').map(res => res.json());
  }

  countSortings(): Observable<any> {
    return this.http.get('/api/sortings/count').map(res => res.json());
  }

  addSorting(sorting): Observable<any> {
    return this.http.post('/api/sorting', JSON.stringify(sorting), this.options);
  }

  getSorting(sorting): Observable<any> {
    return this.http.get(`/api/sorting/${sorting._id}`).map(res => res.json());
  }

  editSorting(sorting): Observable<any> {
    return this.http.put(`/api/sorting/${sorting._id}`, JSON.stringify(sorting), this.options);
  }

  deleteSorting(sorting): Observable<any> {
    return this.http.delete(`/api/sorting/${sorting._id}`, this.options);
  }

}
