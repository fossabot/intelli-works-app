import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Record, Share} from '../models/Share';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  constructor(
      private http: HttpClient
  ) { }

  getRecords(token: string): Observable<Record[]> {
    const url = Share.base + 'fetch/record/';
    return this.http.get<Record[]>(url + token, Share.httpOptions).pipe(
        catchError(Share.handleHttpError<Record[]>(`Cannot fetch record list.`))
    );
  }
}
