import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Message, Share, Student} from '../models/Share';
import {isUndefined} from 'util';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(
      private http: HttpClient
  ) { }
  getMessageList(token: string): Observable<Message[]> {
    if (isUndefined(token)) {
      return of(undefined);
    }
    const url = Share.base + 'fetch/message/';
    return this.http.get<Message[]>(url + token, Share.httpOptions).pipe(
        catchError(Share.handleHttpError<Message[]>(`Cannot fetch message list.`))
    );
  }

  updateMessage(msgId: number, status: boolean, token: string): Observable<Student> {
    const url = Share.base + 'update/message/';
    return this.http.post<Student>(url + msgId + '/' + (status ? '1' : '0'), token, Share.httpOptions).pipe(
        catchError(Share.handleHttpError<Student>(`Cannot update message.`))
    );
  }
}
