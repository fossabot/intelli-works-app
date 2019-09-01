import {Injectable} from '@angular/core';
import {Message, Note, Share, Student} from '../models/Share';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import * as format from 'date-fns/format';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  currentStudent: Student;
  currentMessage: Message;
  currentNote: Note;
  fromHistory = false;
  unread = 0;

  constructor(
      private http: HttpClient,
      private toastController: ToastController
  ) { }

  fetchStudent(sno: string, token: string): Observable<Student> {
    const url = Share.base + 'fetch/student/';
    return this.http.post<Student>(url + sno, token, Share.httpOptions).pipe(
        catchError(Share.handleHttpError<Student>(`Cannot fetch student.`))
    );
  }

  timestampToTime(timestamp: number) {
    const unixTimestamp = new Date(timestamp * 1000);
    return format(unixTimestamp, 'YYYY年MM月DD日 HH:mm');
  }

  timestampToTimeWithOutYear(timestamp: number) {
    const unixTimestamp = new Date(timestamp * 1000);
    return format(unixTimestamp, 'MM月DD日 HH:mm');
  }

  getUrl(sno: string) {
    return Share.base + 'fetch/face/' + sno;
  }

  async showToast(msg: string, time = 2000) {
    const toast = await this.toastController.create({
      message: msg,
      duration: time,
      position: 'middle'
    });
    await toast.present();
  }
}
