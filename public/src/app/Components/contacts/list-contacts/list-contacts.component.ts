import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Contact} from '../contact';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css']
})
export class ListContactsComponent implements OnInit {

  constructor() {}

  @Input() contacts;
  @Output() destroyContactEvent = new EventEmitter();
  @Output() changeViewEvent = new EventEmitter();

  ngOnInit() {
  }

  /**
   * Delete single contact
   * @param contact
   */
  destroy(contact: Contact) {
    this.destroyContactEvent.emit(contact);
  }

  /**
   * Togllge the view (Contacts List view to Create Contact)
   */
  changeView() {
    this.changeViewEvent.emit(true);
  }
}
