import { Injectable } from '@angular/core';
import { AppAreas } from '../enums/app-areas';
import { Subject ,  Observable } from 'rxjs';

@Injectable()
export class ShareDataService {
    public data: any;
    public showSpinner: boolean;
    private subject: Subject<boolean> = new Subject<boolean>();
    public authenticationToken: string;

    public currentArea: AppAreas;
    private currentAreaSubject: Subject<AppAreas> = new Subject<AppAreas>();

    public setData(_data: boolean) {
        this.showSpinner = _data;
        this.subject.next(_data);
    }

    public getData(): Observable<boolean> {
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
