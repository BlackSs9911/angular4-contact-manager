import {Component, OnInit} from '@angular/core';
import {Contact} from './contact';
import {ContactsService} from '../../services/contacts.service';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Array<Contact> = [];
  isListView: Boolean;

  constructor(private contactService: ContactsService) {
  }

  /**
   * Initial runner
   */
  ngOnInit() {
    this.getContacts();
    this.isListView = true;
  }

  /**
   * Get all contact and assing contact array
   */
  getContacts() {
    this.contactService.getContacts()
      .then((contacts) => {
        this.contacts = contacts
      })
    // .catch((err)=>{
    //   console.log('mad_msg__ err', err)
    // });
  }

  /**
   * Contact creat
   * @param contact
   * @returns {boolean}
   */
  create(contact: Contact) {
    this.contactService.create(contact)
      .then((status) => {
        this.getContacts();
      })
    return true;
    // .catch((err)=>{
    //   console.log('mad_msg__ err', err)
    // });
  }

  /**
   * Contact delete selected contact
   * @param contact
   */
  destroy(contact: Contact) {
    this.contactService.destroy(contact)
      .then((status) => {
        this.getContacts();
      })
    // .catch((err)=>{
    //   console.log('mad_msg__ err', err)
    // });
  }

  /**
   * Toggle view (Contact list view to add)
   */
  toggleView() {
    this.isListView = !this.isListView;
  }

}
