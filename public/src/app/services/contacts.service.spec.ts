import {TestBed, inject, getTestBed} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {Observable} from 'rxjs';

import {ContactsService} from './contacts.service';
import {Contact} from '../Components/contacts/contact';
import configs from '../config/contacts';
import {log} from "util";

let MockContactesArray: Array<Contact> = configs.contacts

let mockBackend: MockBackend;
let contactsService: ContactsService;
let setup = (httpMock) => {
  TestBed.configureTestingModule({
    providers: [
      ContactsService,
      MockBackend,
      BaseRequestOptions,
      {
        provide: Http,
        useFactory: (backend: MockBackend, options: BaseRequestOptions) => new httpMock(backend, options),
        deps: [MockBackend, BaseRequestOptions]
      }
    ]
  });
  inject([MockBackend, Http],
    (mb: MockBackend, http: Http) => {
      mockBackend = mb;
      contactsService = new ContactsService(http);
    })();
};

describe('ContactsService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ContactsService, ConnectionBackend, Http]
    });
  });

  it('should return the Contacs array', (done) => {
    setup(MockSuccessGetContacsHttp);
    contactsService.getContacts().then((contacts:any) => {
      expect(contacts).toEqual(MockContactesArray);
      done();
    });
  });

  it('should return the hero based on passed in id from the promise when it succeeds', (done) => {
    setup(MockSuccessGetContacsHttp);

    contactsService.getContact(MockContactesArray[0]).then((contact) => {
      expect(contact).toEqual(MockContactesArray[0]);
      done();
    });
  });

});

class MockSuccessGetContacsHttp extends Http {
  constructor(backend, options) {
    super(backend, options);
  }

  get() {
    return Observable.from([new Response(new ResponseOptions({body: MockContactesArray}))]);
  }
}
