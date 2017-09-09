import { Component, ViewChild } from '@angular/core';
import { DialogRef, ModalComponent, overlayConfigFactory, Modal } from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Player } from '../../common/interfaces/player.interface';
import { Team } from '../../common/interfaces/team.interface';
import { CropperSettings } from 'ng2-img-cropper';
import { TeamService} from '../team.service';

//import { ShareDataService } from '../../../services/shareData.component.service';

declare var toastr: any;

/////for make the context of your modal strongly type, in this case I use a MediaItem
export class TeamDetailsEditModalWindowData extends BSModalContext {
    constructor(public teamDetails: Team) {
        super();
    }
}


@Component({
    selector: 'team-details-edit-modal',
    templateUrl: './team-edit-modal.component.html',
})
export class TeamDetailsEditModalComponent implements ModalComponent<TeamDetailsEditModalWindowData> {
    context: TeamDetailsEditModalWindowData;

    public teamDetails: Team;
    private cropperSettings: CropperSettings;

    public data: any;
    public published: boolean = false;
    public model: Team = { id: 0, pictureLogo:{}, name:"", playerList :[] };
    public teamSelected: Team = { id: 0, pictureLogo:{}, name:"", playerList :[] };
    public displayErrors: boolean = false;
    public isEditing: boolean = false;

    constructor(public dialog: DialogRef<TeamDetailsEditModalWindowData>, public modal: Modal, private _teamService: TeamService) {
        this.context = dialog.context;
        if (dialog.context.teamDetails) {
            this.teamSelected = dialog.context.teamDetails;
            Object.assign(this.model, this.teamSelected);
            this.isEditing = true;
        }
        this.context.dialogClass = "modal-dialog modal-lg";

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 100;
        this.cropperSettings.height = 100;
        this.cropperSettings.croppedWidth =100;
        this.cropperSettings.croppedHeight = 100;
        this.cropperSettings.canvasWidth = 400;
        this.cropperSettings.canvasHeight = 300;

        this.data = {};
    };

    ngOnInit() {

    }
    closeDialog(callBack: any) {

        this.dialog.close();
        this.dialog.onDestroy.subscribe((value: any) => {
            if (callBack) callBack();
        });
    };

    hahaha(){
        this._teamService.addBase64Image(this.data.image, 'testTeam.jpg').subscribe(
          (data: any) => {
            console.log(this.data);
          },
          (err: any) => {
          }
        );
      }
    
      updatePicture(){
        this._teamService.updateTeamImage(this.teamDetails.id, { FileName: 'testTeam.jpg' } ).subscribe(
          (data: any) => {
            console.log(this.data);
          },
          (err: any) => {
          }
        );
      }


    // notifyImageUploaded(mediaItem: any)
    // {
    //     this.model.Picture = mediaItem;
    //     this.model.EventMedia = mediaItem;
    // }


    // removeImage() {
    //     this.model.Picture = null;
    //     this.model.EventMedia = null;
    // }



    // createEvent(form: NgForm) {

    //     if (form.valid) {
    //         var _data = this.parseDates(this.model);
    //         if (_data.TweetThis) _data.PostUpdate = _data.TweetThis;
    //         this.hiveService.createEvent(_data).subscribe(
    //             data => {
    //                 if (!this.isEditing) {
    //                     _data.Id = data;
    //                     this.shareDataService.setData(_data);
    //                 } else {
    //                     for (var attr in _data) {
    //                         this.eventSelected[attr] = _data[attr];
    //                     } 
    //                 }
    //                 this.closeDialog(function () { });
    //                 toastr.options = { "timeOut": "3000" };
    //                 toastr['success']('Changes successfully saved');
    //             }, err => {
    //                 toastr['error']('A problem has occurred.Please try again or contact support@spacehive.com for support.', 'Error');
    //         });
    //     } else {



    //         this.displayErrors = true;
    //     }
        
    // }

}
