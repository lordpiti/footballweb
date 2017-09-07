import { Component, ViewChild } from '@angular/core';
import { DialogRef, ModalComponent, overlayConfigFactory, Modal } from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Player } from '../../common/interfaces/player.interface';
import { Team } from '../../common/interfaces/team.interface';

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
    public data: any;
    public published: boolean = false;
    public model: Team = { Id: 0, PictureUrl:"", Name:"", PlayerList :[] };
    public teamSelected: Team = { Id: 0, PictureUrl:"", Name:"", PlayerList :[] };
    public displayErrors: boolean = false;
    public isEditing: boolean = false;

    constructor(public dialog: DialogRef<TeamDetailsEditModalWindowData>, public modal: Modal) {
        this.context = dialog.context;
        if (dialog.context.teamDetails) {
            this.teamSelected = dialog.context.teamDetails;
            Object.assign(this.model, this.teamSelected);
            this.isEditing = true;
        }
        this.context.dialogClass = "modal-dialog modal-lg";


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
