import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropzoneComponent, DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-team-info-modal',
  templateUrl: './team-info-modal.component.html',
  styleUrls: ['./team-info-modal.component.scss']
})
export class TeamInfoModalComponent {

  public published = false;
  public model: any = {};
  public displayErrors = false;
  public isEditing = false;

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
    public dialogRef: MatDialogRef<TeamInfoModalComponent>,
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
    this.model.pictureLogo.url = args[0].dataURL;
  }

}
