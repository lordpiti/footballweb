import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DropzoneConfigInterface, DropzoneDirective, DropzoneComponent } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-player-info-modal',
  templateUrl: './player-info-modal.component.html',
  styleUrls: ['./player-info-modal.component.scss']
})
export class PlayerInfoModalComponent {

  public published = false;
  public model: any = {};
  public displayErrors = false;
  public isEditing = false;
  public positions: Array<any> = [{ value: 'Defender', text: 'Defender'}, { value: 'Striker', text: 'Striker'}];

  public disabled = false;

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  @ViewChild(DropzoneComponent) componentRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective) directiveRef?: DropzoneDirective;

  constructor(
    public dialogRef: MatDialogRef<PlayerInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data) {
        Object.assign(this.model, data);
        this.model.image = ''; // data.url;
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
