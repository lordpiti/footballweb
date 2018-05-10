import { Component, ViewChild } from '@angular/core';
import { DialogRef, ModalComponent, overlayConfigFactory, Modal } from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Player } from '../../shared/interfaces/player.interface';
import { Team } from '../../shared/interfaces/team.interface';
import { CropperSettings } from 'ngx-img-cropper';
import { TeamService} from '../team.service';
import { ShareDataService } from '../../shared/services/shared-data.service';


declare var toastr: any;

// for make the context of your modal strongly type, in this case I use a MediaItem
export class TeamDetailsEditModalWindowData extends BSModalContext {
    constructor(public teamDetails: Team) {
        super();
    }
}


@Component({
    selector: 'app-team-details-edit-modal',
    templateUrl: './team-edit-modal.component.html',
    styleUrls: ['./team-edit-modal.component.scss']
})
export class TeamDetailsEditModalComponent implements ModalComponent<TeamDetailsEditModalWindowData> {
    context: TeamDetailsEditModalWindowData;

    private cropperSettings: CropperSettings;

    public data: any;
    public published = false;
    public model: Team = { id: 0, pictureLogo: {}, name: '', playerList : [], stadium: {}, city: null };
    public displayErrors = false;
    public isEditing = false;

    constructor(public dialog: DialogRef<TeamDetailsEditModalWindowData>, public modal: Modal,
        private _teamService: TeamService, private shareDataService: ShareDataService) {
        this.context = dialog.context;
        if (dialog.context.teamDetails) {
            Object.assign(this.model, dialog.context.teamDetails);
            this.isEditing = true;
        }
        this.context.dialogClass = 'modal-dialog modal-lg';

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 100;
        this.cropperSettings.height = 100;
        this.cropperSettings.croppedWidth = 100;
        this.cropperSettings.croppedHeight = 100;
        this.cropperSettings.canvasWidth = 400;
        this.cropperSettings.canvasHeight = 300;

        this.data = { image: dialog.context.teamDetails.pictureLogo.url };
    }

    closeDialog(callBack: any) {

        this.dialog.close();
        this.dialog.onDestroy.subscribe((value: any) => {
            if (callBack) { callBack(); }
        });
    }

    // updateTeamLogo() {
    //     const cropperImageName = Math.floor(Math.random() * 2000).toString() + '.jpg';
    //     this._teamService.addBase64Image(this.data.image, cropperImageName).subscribe(
    //       (data: any) => {
    //         this.shareDataService.setData({ fileName: data.fileName, url: data.url });
    //         this.dialog.close();
    //         this.dialog.onDestroy.subscribe((value: any) => {
    //         });
    //       },
    //       (err: any) => {
    //       }
    //     );
    //   }
}
