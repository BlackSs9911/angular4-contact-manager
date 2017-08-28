import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Contact} from './../contact';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent {
  createForm: FormGroup;

  @Output() createNewContactEvent = new EventEmitter();
  @Output() changeViewEvent = new EventEmitter();

  newContact = new Contact();

  constructor(fb: FormBuilder) {
    this.createForm = fb.group({
      first_name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      last_name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      phone: [null, Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(13), Validators.pattern("[0-9]+")])],
    });
  }

  /**
   * Create contact
   *
   * @param contact:Contact
   */
  create(contact) {
    this.createNewContactEvent.emit(contact);
    this.newContact = new Contact();
    // Open contact list page
    this.changeView();
  }

  changeView() {
    this.changeViewEvent.emit(true);
  }
}
