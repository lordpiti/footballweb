import { CropperSettings } from 'ngx-img-cropper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Inject, Component } from '@angular/core';

@Component({
    selector: 'app-player-picture-dialog',
    templateUrl: 'player-picture-dialog.component.html',
    styleUrls: ['./player-picture-dialog.component.scss']
  })
  export class PlayerPictureDialogComponent {

    private cropperSettings: CropperSettings;

    public published = false;
    public model: any = {};
    public displayErrors = false;
    public isEditing = false;

    constructor(
      public dialogRef: MatDialogRef<PlayerPictureDialogComponent>,
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
