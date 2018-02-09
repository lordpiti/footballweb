import { Injectable } from '@angular/core';
import { AppAreas } from '../enums/app-areas';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShareDataService {
    public data: any;
    private subject: Subject<any> = new Subject<any>();
    public authenticationToken: string;

    public currentArea: AppAreas;
    private currentAreaSubject: Subject<AppAreas> = new Subject<AppAreas>();

    public setData(_data: any) {
        this.data = _data;
        this.subject.next(_data);
    }

    public getData(): Observable<any> {
        return this.subject.asObservable();
    }

    public setCurrentArea(_data: AppAreas) {
        this.data = _data;
        this.currentAreaSubject.next(_data);
    }

    public getCurrentArea(): Observable<AppAreas> {
        return this.currentAreaSubject.asObservable();
    }

}
