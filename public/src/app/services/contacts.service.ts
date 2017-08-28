import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Contact } from '../Components/contacts/contact';
import "rxjs";


@Injectable()
export class ContactsService {
  contact: Contact;
  host:string
  constructor(private http:Http) {
    this.host = 'http://localhost:1337'
  }

  /**
   * Create funtion
   * @param contact
   * @returns {Promise<T>}
   */
  create(contact:Contact){
    return this.http.post(`${this.host}/contacts`,contact)
    .map(data => data.json()).toPromise();
  }

  /**
   * Delete given contact
   * @param contact
   * @returns {Promise<T>}
   */
  destroy(contact: Contact) {
    return this.http.delete(`${this.host}/contacts/`+contact._id)
    .map(data => data.json()).toPromise();
  }
  //TODO:: remove
  update(contact:Contact) {
    return this.http.put(`${this.host}/contacts/`+contact._id,contact)
    .map(data => data.json()).toPromise();
  }

  /**
   * Update given contact id with new contact details
   * @param contact
   * @returns {Promise<T>}
   */
  getContact(contact:Contact) {
    return this.getContacts()
      .then(contacs => contacs.find(eContact => eContact._id === contact._id));
  }

  /**
   * Get all contact details
   * @returns {Promise<T>}
   */
  getContacts() {
    return this.http.get(`${this.host}/contacts`)
    .map(data => data.json()).toPromise();
  }
}
