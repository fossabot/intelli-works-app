import {Injectable} from '@angular/core';
import {Share, Student} from '../models/Share';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchResult: Student[];

  constructor(
      private http: HttpClient
  ) { }

  getGradeList(): Observable<string[]> {
    const url = Share.base + 'fetch/grade';
    return this.http.get<string[]>(url, Share.httpOptions).pipe(
        catchError(Share.handleHttpError<string[]>(`Cannot fetch grade list.`))
    );
  }

  getSexList(): Observable<string[]> {
    const url = Share.base + 'fetch/sex';
    return this.http.get<string[]>(url, Share.httpOptions).pipe(
        catchError(Share.handleHttpError<string[]>(`Cannot fetch grade list.`))
    );
  }

  getPoliticList(): Observable<string[]> {
    const url = Share.base + 'fetch/politic';
    return this.http.get<string[]>(url, Share.httpOptions).pipe(
        catchError(Share.handleHttpError<string[]>(`Cannot fetch grade list.`))
    );
  }

  getNationHelpList(): Observable<string[]> {
    const url = Share.base + 'fetch/nation';
    return this.http.get<string[]>(url, Share.httpOptions).pipe(
        catchError(Share.handleHttpError<string[]>(`Cannot fetch grade list.`))
    );
  }

  getClassList(): Observable<string[]> {
    const url = Share.base + 'fetch/class';
    return this.http.get<string[]>(url, Share.httpOptions).pipe(
        catchError(Share.handleHttpError<string[]>(`Cannot fetch class list.`))
    );
  }

  getBuildingList(): Observable<string[]> {
    const url = Share.base + 'fetch/building';
    return this.http.get<string[]>(url, Share.httpOptions).pipe(
        catchError(Share.handleHttpError<string[]>(`Cannot fetch building list.`))
    );
  }

  doSearch(parameter: {
    gender: string,
    politic: string,
    grade: string,
    cls: string,
    dorm: string,
    nationHelp: string,
    other: string,
    token: string
  }): Observable<Student[]> {
    const url = Share.base + 'fetch/search';
    return this.http.post<Student[]>(url, parameter, Share.httpOptions).pipe(
        catchError(Share.handleHttpError<Student[]>(`Cannot do search.`))
    );
  }

}
