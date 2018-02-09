import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-custom-form-input',
  templateUrl: './custom-form-input.component.html',
  styleUrls: ['./custom-form-input.component.scss']
})
export class CustomFormInputComponent implements OnInit {

  @Input() model: string;
  @Input() label: string;
  @Output() modelChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  updateData($event) {
    this.model = $event;
    this.modelChange.emit($event);
  }

}
