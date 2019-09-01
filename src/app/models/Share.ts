import {isUndefined} from 'util';
import {Observable, of} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';

export class Share {
    // TODO make nginx listen only on localhost
    static base = 'http://116.62.48.131:20301/api/';
    // static base = 'https://demo.skyblond.info/api/';
    // static base = 'http://localhost:7000/';

    static httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    static handleHttpError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // send the error to remote logging infrastructure
            console.error(error); // log to console instead
            if (error || isUndefined(result)) {
                return of(undefined);
            }
            // Let the app keep running by returning an empty result.
            return of(result);
        };
    }
}

export interface Student {
    grade: string;
    cls: string;
    sno: string;
    name: string;
    sex: string;
    area: string;
    nation: string;
    quality: string;
    nation_help: string;
    gpa: string;
    political: string;
    phone: string;
    parent_phone: string;
    dorm: string;
    dorm_num: string;
    uid: string;
    home: string;
}

export interface Message {
    msgId: number;
    id: number;
    name: string;
    message: string;
    level: string;
    status: boolean;
    timestamp: number;
}

export interface Record {
    sno: string;
    name: string;
    timestamp: number;
}

export interface Note {
    id: number;
    sno: string;
    studentName: string;
    teacherName: string;
    category: string;
    level: string;
    note: string;
    comment: string;
    timestamp: number;
}

export interface ValidateResponse {
    teacherName: string;
    unread: number;
}
