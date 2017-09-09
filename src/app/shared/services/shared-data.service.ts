import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

@Injectable()
export class ShareDataService {
    public data: any;
    private subject: Subject<any> = new Subject<any>();


    public setData(_data: any) {
        this.data = _data;
        this.subject.next(_data)
    };
    public getData(): Observable<any> {
        return this.subject.asObservable();
    };
}