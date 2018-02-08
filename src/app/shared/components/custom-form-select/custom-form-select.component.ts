import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-form-select',
  templateUrl: './custom-form-select.component.html',
  styleUrls: ['./custom-form-select.component.scss']
})
export class CustomFormSelectComponent implements OnInit {

  @Input() model:string;
  @Input() collection:Array<any>;
  @Input() label:string;
  @Output() modelChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  updateData($event){
    this.model = $event;
    this.modelChange.emit($event);
  }

}
