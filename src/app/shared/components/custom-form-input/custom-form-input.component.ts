import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-custom-form-input',
  templateUrl: './custom-form-input.component.html',
  styleUrls: ['./custom-form-input.component.scss']
})
export class CustomFormInputComponent implements OnInit {

  @Input() propertyName:string;
  @Output() changeValue = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  // ngOnChanges(){
  //   debugger;
  //   this.changeValue.emit(this.propertyName);
  // }

}
