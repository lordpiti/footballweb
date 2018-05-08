import { CropperSettings } from 'ngx-img-cropper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Inject, Component } from '@angular/core';

@Component({
    selector: 'app-cropper-picture-dialog',
    templateUrl: 'cropper-picture-dialog.component.html',
    styleUrls: ['./cropper-picture-dialog.component.scss']
  })
  export class CropperPictureDialogComponent {

    private cropperSettings: CropperSettings;

    public published = false;
    public model: any = {};
    public displayErrors = false;
    public isEditing = false;

    constructor(
      public dialogRef: MatDialogRef<CropperPictureDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
        if (data) {
          Object.assign(this.model, data);
          this.model.image = data.url;
          this.isEditing = true;
        }

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 100;
        this.cropperSettings.height = 100;
        this.cropperSettings.croppedWidth = 100;
        this.cropperSettings.croppedHeight = 100;
        this.cropperSettings.canvasWidth = 400;
        this.cropperSettings.canvasHeight = 300;
      }

    onNoClick(): void {
      this.dialogRef.close();
    }

  }
