import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { DropzoneConfigInterface, DropzoneDirective, DropzoneComponent } from 'ngx-dropzone-wrapper';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-player-info-modal',
  templateUrl: './player-info-modal.component.html',
  styleUrls: ['./player-info-modal.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class PlayerInfoModalComponent {

  public published = false;
  public model: any = {};
  public displayErrors = false;
  public isEditing = false;
  public positions: Array<any> = [
    { value: 'Goalkeeper', text: 'Goalkeeper'},
    { value: 'Defender', text: 'Defender'},
    { value: 'Midfielder', text: 'Midfielder'},
    { value: 'Striker', text: 'Striker'}];

  public disabled = false;

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  @ViewChild(DropzoneComponent, null) componentRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective, null) directiveRef?: DropzoneDirective;

  constructor(
    public dialogRef: MatDialogRef<PlayerInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data) {
        Object.assign(this.model, data);
        this.model.image = '';
        this.isEditing = true;
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveAndClose(form: any) {
    if (form.valid) {
      this.dialogRef.close(this.model);
    }
  }

  public resetDropzoneUploads(): void {
    if (this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.reset();
    }
  }

  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
    this.model.picture.url = args[0].dataURL;
  }

}
