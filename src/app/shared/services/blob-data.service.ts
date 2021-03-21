import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BlobDataService extends BaseService {

  constructor(public httpNew: HttpClient) {
    super(httpNew);
  }

  public addBase64Image(image: string, fileName: string) {
    const url = 'GlobalMedia/UploadBase64Image';

    return this.post<any>(url, { Base64String: image, FileName: fileName });
  }

  public saveDocument(document: File) {
    const formData = new FormData();
    formData.append("files", document);

    return this.post<any>('GlobalMedia/UploadDocument', formData);
  }

}
