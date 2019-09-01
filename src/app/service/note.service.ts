import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Note, Share} from '../models/Share';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  fetchResult: Note[];

  constructor(
      private http: HttpClient
  ) { }

  createNote(para: {
    sno: string
    category: string
    level: string,
    note: string,
    comment: string,
    token: string
  }): Observable<string> {
    const url = Share.base + 'notes/create';
    return this.http.post<string>(url, para, Share.httpOptions).pipe(
        catchError(Share.handleHttpError<string>(`Cannot create note.`))
    );
  }

  fetchNote(sno: string, token: string): Observable<Note[]> {
    const url = Share.base + 'notes/fetch/';
    return this.http.get<Note[]>(url + token +  '/' + sno, Share.httpOptions).pipe(
        catchError(Share.handleHttpError<Note[]>(`Cannot fetch notes list.`))
    );
  }

    getHistory(token: string): Observable<Note[]> {
      const url = Share.base + 'notes/history/';
      return this.http.get<Note[]>(url + token, Share.httpOptions).pipe(
          catchError(Share.handleHttpError<Note[]>(`Cannot fetch notes list.`))
      );
    }
}
